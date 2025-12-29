import { Expose } from 'class-transformer';
import { City } from '../../../../types/city-type.enum.js';
import { HouseType } from '../../../../types/housing-type.enum.js';

export class OfferShortRdo {
  @Expose()
  public id: string;

  @Expose()
  public title: string;

  @Expose()
  public imageLink: string;

  @Expose()
  public city: City;

  @Expose()
  public premium: boolean;

  @Expose()
  public favourite: boolean;

  @Expose()
  public houseType: HouseType;

  @Expose()
  public rentalPrice: number;

  @Expose()
  public rating: number;

  @Expose()
  public createdAt: Date;

  @Expose()
  public commentsCount: number;
}
