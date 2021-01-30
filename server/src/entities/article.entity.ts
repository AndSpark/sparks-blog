import { BeforeInsert, BeforeUpdate, Column, Entity } from "typeorm";
import { AbstractEntity } from "./abstract-entity";
import * as slug from 'slug'
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

  @BeforeInsert()
  @BeforeUpdate()
  generateSlug() {
    this.slug = slug(this.title,'_')
  }

 
}

