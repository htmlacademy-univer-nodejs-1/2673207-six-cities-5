import { CreateUpdateOfferDto } from './dto/create-update-offer.dto.js';
import { DocumentType } from '@typegoose/typegoose';
import { OfferEntity } from './offer.entity.js';
import { City } from '../../../types/city-type.enum.js';
import { DocumentExists } from '../../../types/index.js';

export interface OfferService extends DocumentExists {
  create(dto: CreateUpdateOfferDto): Promise<DocumentType<OfferEntity>>;
  findById(offerId: string, userId?: string): Promise<DocumentType<OfferEntity> | null>;
  deleteById(userId: string, offerId: string): Promise<DocumentType<OfferEntity> | null>;
  updateById(userId: string, offerId: string, dto: CreateUpdateOfferDto): Promise<DocumentType<OfferEntity> | null>;
  find(userId?: string, count?: number): Promise<DocumentType<OfferEntity>[]>;

  updateRatingByComments(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  incComment(offerId: string): Promise<DocumentType<OfferEntity> | null>;

  findPremiumOffers(city: City, userId?: string): Promise<DocumentType<OfferEntity>[]>;
  findFavoriteOffers(userId: string): Promise<DocumentType<OfferEntity>[]>;
  addToFavouriteOffers(userId: string, offerId: string): Promise<DocumentType<OfferEntity> | null>;
  deleteFavouriteOffer(userId: string, offerId: string): Promise<void>;
}
