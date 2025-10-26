import { CreateUpdateOfferDto } from './dto/create-or-update-offer-dto.js';
import { DocumentType } from '@typegoose/typegoose';
import { OfferEntity } from './offer.entity.js';
import { City } from '../../types/city-type.enum.js';

export interface IOfferService {
  create(dto: CreateUpdateOfferDto): Promise<DocumentType<OfferEntity>>;
  findById(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  find(count?: number, userId?: string): Promise<DocumentType<OfferEntity>[]>;
  deleteById(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  updateById(offerId: string, dto: CreateUpdateOfferDto): Promise<DocumentType<OfferEntity> | null>;
  addComment(offerId: string): Promise<DocumentType<OfferEntity> | null>
  findPremiumOffersByCity(city: City, userId?: string): Promise<DocumentType<OfferEntity>[]>;
  getUserFavorites(userId: string): Promise<DocumentType<OfferEntity>[]>
  addFavorite(userId: string, offerId: string): Promise<DocumentType<OfferEntity>>
  deleteFavorite(userId: string, offerId: string): Promise<void>;
  updateRating(offerId: string): Promise<DocumentType<OfferEntity> | null>;
}
