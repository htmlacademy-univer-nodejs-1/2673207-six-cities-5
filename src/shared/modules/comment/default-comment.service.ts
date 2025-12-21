import {DocumentType, types} from '@typegoose/typegoose';
import { injectable, inject } from 'inversify';
import { CommentEntity } from './comment.entity.js';
import CreateCommentDto from './dto/create-comment.dto.js';
import { Component } from '../../types/component.enum.js';
import { CommentService } from './comment-service.interface.js';

const DEFAULT_COMMENTS_COUNT = 50;
const DEFAULT_SORT_TYPE = -1;

@injectable()
export class DefaultCommentService implements CommentService {
  constructor(
        @inject(Component.CommentModel) private readonly commentModel: types.ModelType<CommentEntity>
  ) {
  }

  public async create(dto: CreateCommentDto): Promise<DocumentType<CommentEntity>> {
    const comment = await this.commentModel.create(dto);
    return comment.populate('userId');
  }

  public async findByOfferId(
    offerId: string,
    count?: number
  ): Promise<DocumentType<CommentEntity>[]> {
    const limit = count ?? DEFAULT_COMMENTS_COUNT;

    return this.commentModel
      .find({ offerId })
      .limit(limit)
      .sort({ createdAt: DEFAULT_SORT_TYPE })
      .populate('userId');
  }

  public async deleteByOfferId(offerId: string): Promise<number> {
    const result = await this.commentModel
      .deleteMany({offerId})
      .exec();
    return result.deletedCount;
  }
}
