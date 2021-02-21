import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CommentEntity } from 'src/entities/comment.entity';
import { UserEntity } from 'src/entities/user.entity';
import { CreateCommentDTO, CommentResponse } from 'src/models/comment.models';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(CommentEntity)
    private commentRepo: Repository<CommentEntity>,
  ) {}

  async findByArticleSlug(slug: string): Promise<CommentResponse[]> {
    return (await this.commentRepo.find({
      where: { 'article.slug': slug },
      relations: ['article'],
    })).map(v => v.toJSON());
  }

  async findById(id: number): Promise<CommentResponse> {
    return await (await this.commentRepo.findOne({ where: { id } })).toJSON();
  }

  async createComment(
    user: UserEntity,
    data: CreateCommentDTO,
  ): Promise<CommentResponse> {
    const comment = this.commentRepo.create(data);
    comment.author = user;
    await comment.save();
    return (await this.commentRepo.findOne({ where: { body: data.body } })).toJSON();
  }

  async deleteComment(user: UserEntity, id: string): Promise<CommentResponse> {
    const comment = await this.commentRepo.findOne({
      where: { id, 'author.id': user.id },
    });
    await comment.remove();
    return comment.toJSON();
  }
}
