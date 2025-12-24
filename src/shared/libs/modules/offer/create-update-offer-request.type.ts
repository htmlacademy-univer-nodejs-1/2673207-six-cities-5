import { Request } from 'express';
import { RequestBody, RequestParams } from '../../rest/index.js';
import { CreateUpdateOfferDto } from './dto/create-update-offer.dto.js';

export type CreateOfferRequest = Request<RequestParams, RequestBody, CreateUpdateOfferDto>;
export type UpdateOfferRequest = Request<RequestParams, RequestBody, CreateUpdateOfferDto>;
