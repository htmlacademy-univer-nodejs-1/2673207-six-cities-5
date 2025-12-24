import { Expose, Transform } from 'class-transformer';

export class OfferRdo {
  @Expose()
  @Transform(({ obj }) => obj._id ? obj._id.toString() : obj.id)
  public id: string;

  @Expose()
  public title: string;

  @Expose()
  public description: string;

  @Expose()
  public city: string;

  @Expose()
  public previewImage: string;

  @Expose()
  public images: string[];

  @Expose()
  public isPremium: boolean;

  @Expose()
  public isFavorite: boolean;

  @Expose()
  public rating: number;

  @Expose()
  public type: string;

  @Expose()
  public roomCount: number;

  @Expose()
  public maxGuests: number;

  @Expose()
  public price: number;

  @Expose()
  @Transform(({ obj }) => obj.convenienties) // преобразуем convenienties → conveniences
  public conveniences: string[];

  @Expose()
  public author: any;

  @Expose()
  public coordinates: number[];

  @Expose()
  public commentCount: number;

  @Expose()
  public createdAt: Date;

  @Expose()
  public updatedAt: Date;
}
