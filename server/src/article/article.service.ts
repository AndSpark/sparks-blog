import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';


import { ArticleEntity } from 'src/entities/article.entity';
import { CreateArticleDTO, UpdateArticleDTO } from 'src/models/article.models';
import {  Repository } from 'typeorm';
@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(ArticleEntity) private articleRepo: Repository<ArticleEntity>
  ) {}
  
  
  async getArticleList():Promise<any> {
    let articles = await this.articleRepo.find();
    return articles
  }

  async createArticle(data: CreateArticleDTO):Promise<ArticleEntity> {
    const article = this.articleRepo.create(data)
    return await this.articleRepo.save(article)
  }

  async updateArticle(data:UpdateArticleDTO):Promise<ArticleEntity> {
    let article = await this.articleRepo.findOne(data.id)
    if (!article) {
      throw new NotFoundException('帖子不存在')
    }
    delete data.id  // 不删除id会变成创建一个帖子，而不是更新
    Object.assign(article, data)
    return await this.articleRepo.save(article)
  }

}
