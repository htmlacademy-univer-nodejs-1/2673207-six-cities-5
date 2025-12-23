import { CreateUpdateOfferDto } from './dto/create-update-offer.dto.js';
import { DocumentType } from '@typegoose/typegoose';
import { OfferEntity } from './offer.entity.js';

export interface OfferService {
  create(dto: CreateUpdateOfferDto): Promise<DocumentType<OfferEntity>>;
  findById(offerId: string): Promise<DocumentType<OfferEntity> | null>;
}
