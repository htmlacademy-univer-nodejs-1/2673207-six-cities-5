import { inject, injectable } from 'inversify';
import { BaseController, DocumentExistsMiddleware, HttpMethod, ValidateDtoMiddleware, ValidateObjectIdMiddleware } from '../../rest/index.js';
import { Component } from '../../../types/component.enum.js';
import { Logger } from '../../logger/index.js';
import { Request, Response } from 'express';
import { CreateOfferRequest } from './type/create-update-offer-request.type.js';
import { OfferService } from './offer-service.interface.js';
import { fillDTO } from '../../../helpers/common.js';
import { OfferFullRdo } from './rdo/offer-full.rdo.js';
import { UserService } from '../user/user-service.interface.js';
import { City } from '../../../types/city-type.enum.js';
import { PrivateRouteMiddleware } from '../../rest/middleware/private-route.middleware.js';
import { CreateUpdateOfferDto } from './dto/create-update-offer.dto.js';
import { CommentService, CreateCommentDto } from '../comment/index.js';
import { OfferShortRdo } from './rdo/offer-short.rdo.js';
import { CreateCommentRequest } from './type/create-comment-request.type.js';
import { CommentRdo } from '../comment/rdo/comment.rdo.js';

@injectable()
export class OfferController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.UserService) protected readonly userService: UserService,
    @inject(Component.OfferService) protected readonly offerService: OfferService,
    @inject(Component.CommentService) protected readonly commentService: CommentService,
  ) {
    super(logger);
    this.logger.info('Register routes for OfferController…');

    this.addRoute({ path: '/', method: HttpMethod.Get, handler: this.get });
    this.addRoute({ path: '/', method: HttpMethod.Post, handler: this.create });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Get,
      handler: this.getById,
      middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
        new ValidateDtoMiddleware(CreateUpdateOfferDto),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
      ]
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Put,
      handler: this.updateById,
      middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
        new ValidateDtoMiddleware(CreateUpdateOfferDto),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
      ]
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Delete,
      handler: this.deleteById,
      middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
      ]
    });
    this.addRoute({ path: '/premium/:city', method: HttpMethod.Get, handler: this.getPremiumByCity});
    this.addRoute({
      path: '/:offerId/comments',
      method: HttpMethod.Get,
      handler: this.getComments,
      middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
      ]
    });
    this.addRoute({
      path: '/:offerId/comments',
      method: HttpMethod.Post,
      handler: this.createComment,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new ValidateDtoMiddleware(CreateCommentDto),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
      ]
    });
    this.addRoute({
      path: '/favorites',
      method: HttpMethod.Get,
      handler: this.getFavorites,
      middlewares: [
        new PrivateRouteMiddleware()
      ]
    });
    this.addRoute({
      path: '/favorites/:offerId',
      method: HttpMethod.Post,
      handler: this.addToFavorites,
      middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
        new PrivateRouteMiddleware(),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
      ]
    });
    this.addRoute({
      path: '/favorites/:offerId',
      method: HttpMethod.Delete,
      handler: this.deleteFavorites,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
      ]
    });
  }

  public async get({ query: {limit}}: Request, res: Response): Promise<void> {
    const limitValue = limit ? parseInt(limit as string, 10) : 50;

    const result = await this.offerService.find(limitValue);
    this.ok(res, fillDTO(OfferFullRdo, result));
  }

  public async create({body}: CreateOfferRequest, res: Response): Promise<void> {
    const result = await this.offerService.create(body);
    this.created(res, fillDTO(OfferFullRdo, result));
  }

  public async getById({params: { offerId }}: Request, res: Response): Promise<void> {
    const offer = await this.offerService.findById(offerId);
    this.ok(res, fillDTO(OfferShortRdo, offer));
  }

  public async updateById({ body, params }: Request, res: Response): Promise<void> {
    const result = await this.offerService.updateById(params.offerId, body);
    this.ok(res, fillDTO(OfferShortRdo, result));
  }

  public async deleteById({params: { offerId }}: Request, res: Response): Promise<void> {
    await this.offerService.deleteById(offerId);
    this.noContent(res, {});
  }

  public async getPremiumByCity({params: { city }}: Request, res: Response): Promise<void> {
    const offers = await this.offerService.findPremiumOffers(city as City);
    this.ok(res, offers);
  }

  public async getComments({params: { offerId }}: Request, res: Response): Promise<void> {
    const comments = await this.commentService.findByOfferId(offerId, 50);
    this.ok(res, fillDTO(CommentRdo, comments));
  }

  public async createComment({ body }: CreateCommentRequest, res: Response): Promise<void> {
    const comment = await this.commentService.create(body);
    await this.offerService.incComment(body.offerId);
    this.created(res, fillDTO(CommentRdo, comment));
  }

  public async getFavorites({ tokenPayload }: Request, res: Response): Promise<void> {
    const favorites = await this.offerService.findFavoriteOffers(tokenPayload.userId);
    this.ok(res, fillDTO(OfferShortRdo, favorites));
  }

  public async addToFavorites({ tokenPayload, params }: Request, res: Response): Promise<void> {
    await this.offerService.addToFavouriteOffers(tokenPayload.userId, params.offerId);
    this.noContent(res, {});
  }

  public async deleteFavorites({ tokenPayload, params }: Request, res: Response): Promise<void> {
    await this.offerService.deleteFavouriteOffer(tokenPayload.userId, params.offerId);
    this.noContent(res, {});
  }
}
