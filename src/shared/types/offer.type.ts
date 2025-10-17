import { City } from './city-type.enum.js';
import { ConvenientType } from './convenient-type.enum.js';
import { HouseType } from './housing-type.enum.js';
import { User } from './user.type.js';

export type Offer = {
  title: string,
  description: string,
  publishData: Date,
  city: City,
  image: string,
  photo: Array<string>,
  premium: boolean,
  favourite: boolean,
  rating: number,
  houseType: HouseType,
  roomCount: number,
  guestCount: number,
  rentalPrice: number,
  conveniences: Array<ConvenientType>,
  user: User,
  commentsCount: number,
  coordinates: Array<number>
}
