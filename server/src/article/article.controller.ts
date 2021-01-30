import { Body, Controller, Get, Param, Post, Put, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { CreateArticleDTO, UpdateArticleDTO } from 'src/models/article.models';
import { ArticleService } from './article.service';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) { }


  @ApiCreatedResponse({ description: '获取帖子列表' })
  @Get()
  async getArticleList() {
    return await this.articleService.getArticleList()
  }


  @ApiCreatedResponse({ description: '创建帖子' })
  @ApiBody({ type: CreateArticleDTO })
  @Post()
  async Create(@Body(ValidationPipe) data:CreateArticleDTO) {
    return await this.articleService.createArticle(data)
  }


  @ApiCreatedResponse({ description: '更新帖子' })
  @ApiBody({ type: UpdateArticleDTO })
  @Put()
  async UpdateArticle(
    @Body(ValidationPipe) data: UpdateArticleDTO) {
    return await this.articleService.updateArticle(data)
  }
}
