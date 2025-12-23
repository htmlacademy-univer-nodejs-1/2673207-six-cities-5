import { inject, injectable } from "inversify";
import { CommentService } from "./comment-service.interface.js";
import { Component } from "../../../types/component.enum.js";
import { DocumentType, types } from "@typegoose/typegoose";
import { CommentEntity } from "./comment.entity.js";
import { CreateCommentDto } from "./dto/create-comment.dto.js";

@injectable()
export class DefaultCommentService implements CommentService {
  constructor(
    @inject(Component.CommentService) private readonly commentModel: types.ModelType<CommentEntity>
  ){}

  public async create(dto: CreateCommentDto): Promise<DocumentType<CommentEntity>> {
    const comment = await this.commentModel.create(dto);
    return comment.populate('userId');
  }

  public async findByOfferId(offerId: string, count: number | null): Promise<DocumentType<CommentEntity>[]> {
    const limit = count ?? 60;
    return this.commentModel
      .find({ offerId })
      .limit( limit )
      .sort({ createdAt: 'desc' })
      .populate('userId');
  }

  public async deleteByOfferId(offerId: string): Promise<number | null> {
    const result = await this.commentModel
      .deleteMany({offerId})
      .exec();

    return result.deletedCount;
  }
}
