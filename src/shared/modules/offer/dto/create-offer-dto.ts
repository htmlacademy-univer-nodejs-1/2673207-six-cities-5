import {ConvenientType, City, HouseType} from '../../../types/index.js';

export class CreateOfferDto {
  title: string;
  description: string;
  city: City;
  previewImage: string;
  images: string[];
  isPremium?: boolean;
  isFavorite?: boolean;
  rating?: number;
  type: HouseType;
  roomCount: number;
  maxGuests: number;
  price: number;
  conveniences: Array<ConvenientType>;
  author: string;
  coordinates: Array<number>;
}
