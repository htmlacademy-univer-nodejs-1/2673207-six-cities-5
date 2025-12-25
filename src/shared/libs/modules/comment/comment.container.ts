import { Container } from 'inversify';
import { Component } from '../../../types/index.js';
import { CommentEntity, CommentModel, CommentService, DefaultCommentService } from './index.js';
import { types } from '@typegoose/typegoose';

export function createCommentContainer() {
  const commentContainer = new Container();

  commentContainer.bind<CommentService>(Component.CommentService).to(DefaultCommentService).inSingletonScope();
  commentContainer.bind<types.ModelType<CommentEntity>>(Component.CommentModel).toConstantValue(CommentModel);

  return commentContainer;
}
