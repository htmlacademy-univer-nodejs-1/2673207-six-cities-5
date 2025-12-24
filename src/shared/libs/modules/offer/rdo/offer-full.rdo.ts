import { Expose } from "class-transformer";
import { City } from "../../../../types/city-type.enum.js";
import { HouseType } from "../../../../types/housing-type.enum.js";
import { ConvenientType } from "../../../../types/convenient-type.enum.js";

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
}
