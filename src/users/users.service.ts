import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as argon2 from 'argon2';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) { }

    async create(user: CreateUserDto): Promise<User> {
        user.password = await argon2.hash(user.password);
        const newUser = await this.userRepository.create(user);
        return this.userRepository.save(newUser);
    }

    async findOneById(id: number): Promise<User> {
        return await this.userRepository.findOne({ id });
    }

    async match(condition: { username: string, password: string }): Promise<User> {
        const user = await this.userRepository.findOne({ username: condition.username });
        if (user && await argon2.verify(user.password, condition.password)) {
            return user;
        }
    }

    async where(condition: object): Promise<User[]> {
        return await this.userRepository.find(condition);
    }

    async findAll(): Promise<User[]> {
        return await this.userRepository.find();
    }

    async update(id: number, object: object): Promise<any> {
        return await this.userRepository.update(id, object);
    }

    async changePassword(id: number, password: string): Promise<any> {
        const userExisted = await this.findOneById(id);
        if (userExisted) {
            userExisted.password = await argon2.hash(userExisted.password);
            return await this.userRepository.save(userExisted);
        }
    }
}