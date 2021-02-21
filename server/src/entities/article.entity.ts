import {
  Entity,
  Column,
  BeforeInsert,
  ManyToOne,
  ManyToMany,
  RelationCount,
  JoinTable,
  OneToMany,
  AfterUpdate,
} from 'typeorm';
import { classToPlain, Expose } from 'class-transformer';
import * as slugify from 'slug';

import { AbstractEntity } from './abstract-entity';
import { UserEntity } from './user.entity';
import { CommentEntity } from './comment.entity';
import { ArticleResponse } from 'src/models/article.models';

@Entity('articles')
export class ArticleEntity extends AbstractEntity {
  @Column()
  slug: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  body: string;

  @Column()
  category: string;

  @Column({default:0})
  viewCount: number;

  @ManyToMany(
    type => UserEntity,
    user => user.favorites,
    { eager: true },
  )
  @JoinTable()
  favoritedBy: UserEntity[];

  @Column({default:0})
  favoritesCount: number;

  @OneToMany(
    type => CommentEntity,
    comment => comment.article,
  )
  comments: CommentEntity[];

  @ManyToOne(
    type => UserEntity,
    user => user.articles,
    { cascade: true ,eager: true,},
  )
  author: UserEntity;

  @Column('simple-array')
  tagList: string[];


  @AfterUpdate()
  getCount() {
    this.favoritesCount = this.favoritedBy ? this.favoritedBy.length : 0
  }

  @BeforeInsert()
  generateSlug() {
    this.slug =
      slugify(this.title, { lower: true }) +
      '-' +
      ((Math.random() * Math.pow(36, 6)) | 0).toString(36);
  }

  toJSON():ArticleResponse {
    return <ArticleResponse>classToPlain(this);
  }

  toArticle(user?: UserEntity): ArticleResponse {
    let favorited = null;
    if (user && this.favoritedBy) {
      favorited = this.favoritedBy.map(user => user.id).includes(user.id);
    }
    const article: any = this.toJSON();
    delete article.favoritedBy;
    return { ...article, favorited };
  }
}
