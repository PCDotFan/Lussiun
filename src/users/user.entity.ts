import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    CreateDateColumn,
    UpdateDateColumn,
    BaseEntity,
} from 'typeorm';
import { Article } from '../articles/article.entity';

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn() id: number;

    @Column({
        nullable: true,
    })
    nickname: string;

    @Column()
    username: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column('text', {
        nullable: true,
    })
    introduction: string;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;

    @OneToMany(type => Article, article => article.user)
    articles: Promise<Article[]>;
}
