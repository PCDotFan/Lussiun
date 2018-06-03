import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinTable,
  RelationId,
  BaseEntity } from 'typeorm';
import { Category } from './category.entity';
import { Topic } from './topic.entity';
import { User } from './user.entity';

@Entity()
export class Article extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;

  @Column() title: string;

  @Column()
  slug: string;

  @Column('text') content: string;

  // -1：已删除 0: 草稿; 1: 待审核 2: 已发布
  @Column({ type: 'tinyint' }) status: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @ManyToOne(type => Category, category => category.articles)
  category: Category;

  @RelationId((article: Article) => article.category)
  categoryId: number;

  @ManyToOne(type => User, user => user.articles)
  user: User;

  @RelationId((article: Article) => article.user)
  userId: number;

  @ManyToMany(type => Topic, topics => topics.articles)
  topics: Topic[];

}
