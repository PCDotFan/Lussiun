import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, ManyToOne, CreateDateColumn, UpdateDateColumn, JoinTable, RelationId } from 'typeorm'
import { Category } from './Category'
import { User } from './User'

@Entity()
export class Article {
  @PrimaryGeneratedColumn() id: number

  @Column() title: string

  @Column()
  slug: string

  @Column('text') content: string

  // 0: 草稿; 1: 待审核 2: 已发布 -1：已删除
  @Column({ type: 'tinyint' }) status: number

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date

  @ManyToOne(type => Category, category => category.articles)
  category: Category

  @RelationId((article: Article) => article.category)
  categoryId: number

  @ManyToOne(type => User, user => user.articles)
  user: User
}
