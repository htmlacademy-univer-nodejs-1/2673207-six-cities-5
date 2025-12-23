import { City } from "../../../../types/city-type.enum.js";
import { ConvenientType } from "../../../../types/convenient-type.enum.js";
import { HouseType } from "../../../../types/housing-type.enum.js";

export class CreateUpdateOfferDto {
  public title: string;
  public description: string;
  public publishData: Date;
  public city: City;
  public imageLink: string;
  public photoLinks: string[];
  public premium: boolean;
  public favourite: boolean;
  public rating: number;
  public houseType: HouseType;
  public roomCount: number;
  public guestCount: number;
  public rentalPrice: number;
  public conveniences: ConvenientType[];
  public authorId: string;
  public commentsCount: number;
  public coordinates: number[];
}
