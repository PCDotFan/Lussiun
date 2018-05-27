import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToMany,
    CreateDateColumn,
    UpdateDateColumn,
    BaseEntity
} from 'typeorm'
import { Article } from './Article'

@Entity()
export class Topic extends BaseEntity {
  @PrimaryGeneratedColumn() id: number

  @Column()
  name: string

  @Column({
    unique: true
  })
  slug: string

  @Column({
    nullable: true
  })
  description: string

  @ManyToMany(type => Article, article => article.topics)
  articles: Article[]

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date
}
