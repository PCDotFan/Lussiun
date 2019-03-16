import { Injectable, Inject, Post, Body, Controller, UsePipes, HttpException, UseGuards, HttpStatus, Patch, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ValidationPipe } from '../validation.pipe';
import { User } from './user.entity';
import { JwtAuthGuard } from '../jwt.guard';

@Injectable()
@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
    ) { }

    @Post()
    @UseGuards(new JwtAuthGuard())
    @UsePipes(ValidationPipe)
    async create(@Body() createUserDto: CreateUserDto): Promise<User> {
        const userExisted =
                await this.usersService.where({ username: createUserDto.username }) ||
                await this.usersService.where({ email: createUserDto.email });

        if (userExisted !== []) {
            return await this.usersService.create(createUserDto);
        }

        throw new HttpException('存在相同用户', HttpStatus.FORBIDDEN);
    }

    @Patch(':id')
    @UseGuards(new JwtAuthGuard())
    async update(@Param() id: number, @Body() updateUserDto: UpdateUserDto): Promise<any> {
        await this.usersService.update(id, updateUserDto);
        return;
    }

}