import { inject, injectable } from 'inversify';
import { BaseController, HttpError, HttpMethod } from '../../rest/index.js';
import { Component } from '../../../types/component.enum.js';
import { Logger } from '../../logger/index.js';
import { Request, Response } from 'express';
import { CreateOfferRequest } from './create-update-offer-request.type.js';
import { OfferService } from './offer-service.interface.js';
import { fillDTO } from '../../../helpers/common.js';
import { OfferFullRdo } from './rdo/offer-full.rdo.js';
import { UserService } from '../user/user-service.interface.js';
import { StatusCodes } from 'http-status-codes';

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
    this.addRoute({ path: '/:offerId', method: HttpMethod.Get, handler: this.getById });
    this.addRoute({ path: '/:offerId', method: HttpMethod.Put, handler: this.updateById });
    this.addRoute({ path: '/:offerId', method: HttpMethod.Delete, handler: this.deleteById });
    this.addRoute({ path: '/premium/:city', method: HttpMethod.Get, handler: this.getPremiumByCity});
    this.addRoute({ path: '/:offerId/comments', method: HttpMethod.Get, handler: this.getComments});
    this.addRoute({ path: '/:offerId/comments', method: HttpMethod.Post, handler: this.createComment});
    this.addRoute({ path: '/favorites', method: HttpMethod.Get, handler: this.getFavorites });
    this.addRoute({ path: '/favorites/:offerId', method: HttpMethod.Post, handler: this.addToFavorites });
    this.addRoute({ path: '/favorites/:offerId', method: HttpMethod.Delete, handler: this.deleteFavorites });
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

  public async getById(_req: Request, _res: Response): Promise<void> {
    throw new Error('[OfferController:getById] Oops');
  }

  public async updateById(_req: Request, _res: Response): Promise<void> {
    throw new Error('[OfferController:updateById] Oops');
  }

  public async deleteById(_req: Request, _res: Response): Promise<void> {
    throw new Error('[OfferController:deleteById] Oops');
  }

  public async getPremiumByCity(_req: Request, _res: Response): Promise<void> {
    throw new Error('[OfferController:getPremiumByCity] Oops');
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
