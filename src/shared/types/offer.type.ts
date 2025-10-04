import { City } from "./city-type.enum";
import { ConvenientType } from "./convenient-type.enum";
import { HouseType } from "./housing-type.enum";
import { User } from "./user.type";

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
