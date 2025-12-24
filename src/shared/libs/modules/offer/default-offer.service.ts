import { inject, injectable } from 'inversify';
import { OfferService } from './offer-service.interface.js';
import { City, Component } from '../../../types/index.js';
import { Logger } from '../../../libs/logger/index.js';
import { DocumentType, types } from '@typegoose/typegoose';
import { OfferEntity } from './offer.entity.js';
import { CreateUpdateOfferDto } from './dto/create-update-offer.dto.js';
import { FavoriteEntity } from '../favorite/favorite.entity.js';
import { CommentEntity } from '../comment/comment.entity.js';

@injectable()
export class DefaultOfferService implements OfferService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.OfferModel) private readonly offerModel: types.ModelType<OfferEntity>,
    @inject(Component.FavoriteModel) private readonly favoriteModel: types.ModelType<FavoriteEntity>,
    @inject(Component.CommentModel) private readonly commentModel: types.ModelType<CommentEntity>
  ) {}

  public async updateRatingByComments(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    const comments = await this.commentModel
      .find({offerId})
      .exec();

    const totalRatings = comments
      .map((com) => com.rating)
      .reduce((acc, cur) => (acc += cur), 0);
    const averageRating = comments.length > 0 ?
      totalRatings / comments.length : 0;

    return this.offerModel
      .findByIdAndUpdate(offerId,
        {rating: averageRating}, {new: true}
      ).exec();

  }
  public async incComment(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(
        offerId, {'$inc': {
        commentsCount: 1,
      }})
      .exec();
  }

  public async deleteById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndDelete(offerId)
      .exec();
  }

  public async updateById(offerId: string, dto: CreateUpdateOfferDto): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(offerId, dto, {new: true})
      .populate('authorId')
      .exec();
  }

  public async find(count?: number): Promise<DocumentType<OfferEntity>[]> {
    const limit = count ?? 60;
    const offers = await this.offerModel
      .find()
      .limit(limit)
      .sort({createdAt: 'desc'})
      .populate(['authorId'])
      .exec();
    return offers;
  }

  public async findPremiumOffers( city: City): Promise<DocumentType<OfferEntity>[]> {
    return await this.offerModel
      .find({city: city, premium: true})
      .sort({createdAt: 'desc'})
      .limit(60)
      .populate('authorId')
      .exec();
  }

  public async findFavoriteOffers(userId: string): Promise<DocumentType<OfferEntity>[]> {
    const favorites = await this.favoriteModel.find({ userId}).exec();
    const offerIds = favorites.map((f) => f.offerId);
    return this.offerModel
      .find({
        _id: {
          $in: offerIds
        }
      }).exec();
  }

  public async addToFavouriteOffers(userId: string, offerId: string): Promise<DocumentType<OfferEntity> | null> {
    const exists = await this.favoriteModel
      .findOne({userId, offerId})
      .exec();

    if (!exists) {
      await this.favoriteModel
        .create({
          userId, offerId
        });
    }

    const offer = await this.offerModel
      .findById(offerId)
      .exec();

    if (!offer) {
      return null;
    }

    offer.favourite = true;
    return offer
  }

  public async deleteFavouriteOffer(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(
        offerId,
        { isFavorite: false },
        { new: true }
      )
      .populate('authorId')
      .exec();
  }

  public async create(dto: CreateUpdateOfferDto): Promise<DocumentType<OfferEntity>> {
    const result = await this.offerModel.create(dto);
    this.logger.info(`New offer created: ${dto.title}`);

    return result;
  }

  public async findById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findById(offerId)
      .populate('authorId')
      .exec();
  }
}
