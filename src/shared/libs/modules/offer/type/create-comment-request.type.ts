import { Request } from 'express';
import { RequestBody, RequestParams } from '../../../rest/index.js';
import { CreateCommentDto } from '../../comment/index.js';

export type CreateCommentRequest = Request<RequestParams, RequestBody, CreateCommentDto>;
