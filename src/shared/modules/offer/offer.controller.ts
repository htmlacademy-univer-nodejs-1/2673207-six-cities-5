import { inject, injectable } from 'inversify';
import { BaseController } from '../../../rest/index.js';
import { Component } from '../../types/component.enum.js';
import { Logger } from '../../libs/logger/index.js';
import { HttpMethod } from '../../types/http-method.enum.js';
import { Response, Request } from 'express';
import { DefaultOfferService } from './default-offer-service.js';
import { CreateUpdateOfferDto } from './dto/create-or-update-offer-dto.js';
import { City } from '../../types/city-type.enum.js';
import { HouseType } from '../../types/housing-type.enum.js';
import { ConvenientType } from '../../types/convenient-type.enum.js';
import { fillDTO } from '../../helpers/common.js';
import { OfferRdo } from './rdo/get-offer-list-rdo.js';


@injectable()
export class OfferController extends BaseController
{
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.OfferService) protected readonly offerService: DefaultOfferService,
  ) {
    super(logger);
    this.logger.info('Register routes for OfferController...');
    this.addRoute({ path: '/', method: HttpMethod.Post, handler: this.create })
    this.addRoute({ path: '/', method: HttpMethod.Get, handler: this.getList })
    this.addRoute({ path: '/:offerId', method: HttpMethod.Get, handler: this.getOffer })
    this.addRoute({ path: '/:offerId', method: HttpMethod.Put, handler: this.updateOffer })
    this.addRoute({ path: '/:offerId', method: HttpMethod.Delete, handler: this.deleteOffer })
    this.addRoute({ path: '/premium', method: HttpMethod.Get, handler: this.getPremiumOffers })
  }

  public async create(req: Request, res: Response): Promise<void> {
    console.info(req.body);
    const offerDTO = this.convertToCreateUpdateOfferDto(req);
    const offer = await this.offerService.create(offerDTO);
    this.created(res, offer);
  }

  public async getList(_req: Request, res: Response): Promise<void> {
    const offers = await this.offerService.find();
    console.info(offers);
    this.ok(res, fillDTO(OfferRdo, offers));
  }

  public async getOffer(req: Request, res: Response): Promise<void> {
    const { offerId } = req.params;
    const offer = await this.offerService.findById(offerId);
    if (offer === null) {
      this.noContent(res, null);
    }
    this.ok(res, offer);
  }

  public async updateOffer(req: Request, res: Response): Promise<void> {
    const { offerId } = req.params;
    const offerDTO = this.convertToCreateUpdateOfferDto( req );
    const updateOffer = await this.offerService.updateById(offerId, offerDTO);
    if (updateOffer === null) {
      this.noContent(res, null);
    }
    this.ok(res, updateOffer);
  }

  public async deleteOffer(req: Request, res: Response): Promise<void> {
    const { offerId } = req.params;
    const deletedOffer = await this.offerService.deleteById(offerId);
    if ( deletedOffer === null) {
      this.noContent(res, null);
    }
    this.ok(res, deletedOffer);
  }

  public async getPremiumOffers(req: Request, res: Response): Promise<void> {
    const { city } = req.body.city
    const premiumOffers = await this.offerService.findPremiumOffersByCity(city);
    this.ok(res, premiumOffers);
  }

  private convertToCreateUpdateOfferDto(req: Request): CreateUpdateOfferDto {
    const offerDTO: CreateUpdateOfferDto = {
      title: req.body.title || '',
      description: req.body.description || '',
      city: req.body.city || City.Paris,
      previewImage: req.body.previewImage || '',
      images: Array.isArray(req.body.images)
        ? req.body.images
        : [
            'https://via.placeholder.com/600x400/1',
            'https://via.placeholder.com/600x400/2',
            'https://via.placeholder.com/600x400/3',
        ],
      isPremium: Boolean(req.body.isPremium),
      isFavorite: Boolean(req.body.isFavorite),
      rating: req.body.rating ? Number(req.body.rating) : 4.0,
      type: req.body.type ?? HouseType.Hotel,
      roomCount: req.body.roomCount ? Number(req.body.roomCount) : 2,
      maxGuests: req.body.maxGuests ? Number(req.body.maxGuests) : 3,
      price: req.body.price ? Number(req.body.price) : 120,
      conveniences: Array.isArray(req.body.conveniences) ? req.body.conveniences : [ConvenientType.Fridge],
      author: req.body.author || '64d5f8a9e4b0c9a1b8f7c6d5',
      coordinates: Array.isArray(req.body.coordinates) && req.body.coordinates.length === 2
        ? [Number(req.body.coordinates[0]), Number(req.body.coordinates[1])]
        : [52.3676, 4.9041],
    }
    return offerDTO;
  }
}
