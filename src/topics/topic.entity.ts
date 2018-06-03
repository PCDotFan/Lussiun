import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToMany,
    CreateDateColumn,
    UpdateDateColumn,
    JoinTable,
    BaseEntity,
} from 'typeorm';
import { Article } from '../articles/article.entity';

@Entity()
export class Topic extends BaseEntity {
    @PrimaryGeneratedColumn() id: number;

    @Column()
    name: string;

    @Column({
        unique: true,
    })
    slug: string;

    @Column({
        default: 0,
    })
    count: number;

    @Column({
        nullable: true,
    })
    description: string;

    @ManyToMany(type => Article, article => article.topics)
    @JoinTable({
        name: 'taggable',
    })
    articles: Article[];

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;
}
