import { Expose, Transform, Type } from 'class-transformer';
import { City } from '../../../../types/city-type.enum.js';
import { HouseType } from '../../../../types/housing-type.enum.js';
import { ConvenientType } from '../../../../types/convenient-type.enum.js';
import { UserRdo } from '../../user/rdo/user.rdo.js';

export class OfferFullRdo {
  @Expose()
  public id: string;

  @Expose()
  public title: string;

  @Expose()
  public description: string;

  @Expose()
  public city: City;

  @Expose()
  public imageLink: string;

  @Expose()
  public photoLinks: string[];

  @Expose()
  public premium: boolean;

  @Expose()
  public favourite: boolean;

  @Expose()
  public houseType: HouseType;

  @Expose()
  public roomCount: number;

  @Expose()
  public guestCount: number;

  @Expose()
  public rentalPrice: number;

  @Expose()
  public conveniences: ConvenientType[];

  @Expose()
  public coordinates: number[];

  @Expose()
  public commentsCount: number;

  @Expose()
  public rating: number;

  @Expose()
  public publishDate: Date;

  @Expose({ name: 'authorId' })
  @Transform(({ value }) => {
    if (value && typeof value === 'object' && value.id) {
      return value;
    }
    return { id: value };
  })
  @Type(() => UserRdo)
  public author: UserRdo;
}
