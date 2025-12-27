import { inject, injectable } from 'inversify';
import { BaseController, DocumentExistsMiddleware, HttpError, HttpMethod, ValidateObjectIdMiddleware } from '../../rest/index.js';
import { Component } from '../../../types/component.enum.js';
import { Logger } from '../../logger/index.js';
import { Request, Response } from 'express';
import { CreateOfferRequest } from './create-update-offer-request.type.js';
import { OfferService } from './offer-service.interface.js';
import { fillDTO } from '../../../helpers/common.js';
import { OfferFullRdo } from './rdo/offer-full.rdo.js';
import { UserService } from '../user/user-service.interface.js';
import { StatusCodes } from 'http-status-codes';
import { City } from '../../../types/city-type.enum.js';
import { PrivateRouteMiddleware } from '../../rest/middleware/private-route.middleware.js';

@injectable()
export class OfferController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.UserService) protected readonly userService: UserService,
    @inject(Component.OfferService) protected readonly offerService: OfferService,
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
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
      ]
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Put,
      handler: this.updateById,
      middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
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
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
      ]
    });
    this.addRoute({ path: '/favorites', method: HttpMethod.Get, handler: this.getFavorites });
    this.addRoute({
      path: '/favorites/:offerId',
      method: HttpMethod.Post,
      handler: this.addToFavorites,
      middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
      ]
    });
    this.addRoute({
      path: '/favorites/:offerId',
      method: HttpMethod.Delete,
      handler: this.deleteFavorites,
      middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
      ]
    });
  }

  public async get(req: Request, res: Response): Promise<void> {
    const limitParam = req.query.limit;
    const DEFAULT_LIMIT = 50;

    let limit: number;

    if (limitParam && typeof limitParam === 'string') {
      const parsed = parseInt(limitParam, 10);
      limit = isNaN(parsed) || parsed <= 0 ? DEFAULT_LIMIT : parsed;
    } else {
      limit = DEFAULT_LIMIT;
    }

    const result = await this.offerService.find(limit);
    this.ok(res, fillDTO(OfferFullRdo, result));
  }

  public async create(req: CreateOfferRequest, res: Response): Promise<void> {
    const userEmail = req.query.email;
    if (!userEmail || Array.isArray(userEmail) || typeof userEmail !== 'string') {
      throw new Error('Valid email is required');
    }
    const userExists = (await this.userService.findByEmail(userEmail)) !== null;
    if (!userExists) {
      throw new HttpError(
        StatusCodes.UNAUTHORIZED,
        `User with email=${userEmail} unauthorized`,
        'OfferController'
      );
    }
    const result = await this.offerService.create(req.body);
    this.created(res, fillDTO(OfferFullRdo, result));
  }

  public async getById(req: Request, res: Response): Promise<void> {
    const offerId = req.params.offerId;
    const offer = await this.offerService.findById(offerId);
    this.ok(res, offer);
  }

  public async updateById(_req: Request, _res: Response): Promise<void> {
    throw new Error('[OfferController:updateById] Oops');
  }

  public async deleteById(req: Request, res: Response): Promise<void> {
    const offerId = req.params.offerId;
    await this.offerService.deleteById(offerId);
    this.noContent(res, {});
  }

  public async getPremiumByCity(req: Request, res: Response): Promise<void> {
    const city = req.params.city as City;
    const offers = await this.offerService.findFavoriteOffers(city);
    this.ok(res, offers);
  }

  public async getComments(_req: Request, _res: Response): Promise<void> {
    throw new Error('[OfferController:getComments] Oops');
  }

  public async createComment(_req: Request, _res: Response): Promise<void> {
    throw new Error('[OfferController:createComment] Oops');
  }

  public async getFavorites(_req: Request, _res: Response): Promise<void> {
    throw new Error('[OfferController:getFavorites] Oops');
  }

  public async addToFavorites(_req: Request, _res: Response): Promise<void> {
    throw new Error('[OfferController:addToFavorites] Oops');
  }

  public async deleteFavorites(_req: Request, _res: Response): Promise<void> {
    throw new Error('[OfferController:deleteFavorites] Oops');
  }
}
