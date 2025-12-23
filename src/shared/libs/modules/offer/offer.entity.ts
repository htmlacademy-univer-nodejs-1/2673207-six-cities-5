import { defaultClasses, getModelForClass, modelOptions, prop, Ref } from "@typegoose/typegoose";
import { City, ConvenientType, HouseType, } from "../../../types/index.js";
import { UserEntity } from "../user/user.entity.js";

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface OfferEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'offers'
  }
})
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class OfferEntity extends defaultClasses.TimeStamps{
  @prop({
    required: true,
    validate: {
      validator: (v: string) => v.length >= 10 && v.length <= 100
    },
  })
  public title: string;

  @prop({
    required: true,
    validate: {
      validator: (v: string) => v.length >= 20 && v.length <= 1024
    }
  })
  public description: string;

  @prop({ required: true })
  public publishData: Date;

  @prop({
    required: true,
    type: () => String, enum: City
  })
  public city: City;

  @prop({ required: true })
  public imageLink: string;

  @prop({
    required: true,
    validate: {
      validator: (v: string[]) => v.length === 6
    },
  })
  public photoLinks: string[];

  @prop({ required: true })
  public premium: boolean;

  @prop({ required: true })
  public favourite: boolean;

  @prop({
    required: true,
    validate: {
      validator: (v: number) => v >= 1 && v <= 5
    },
  })
  public rating: number;

  @prop({
    required: true,
    type: () => String, enum: HouseType,
  })
  public houseType: HouseType;

  @prop({
    required: true,
    validate: {
      validator: (v: number) => v >= 1 && v <= 8
    },
  })
  public roomCount: number;

  @prop({
    required: true,
    validate: {
      validator: (v: number) => v >= 1 && v <= 10
    },
  })
  public guestCount: number;

  @prop({
    required: true,
    validate: {
      validator: (v: number) => v >= 100 && v <= 100_000
    },
  })
  public rentalPrice: number;

  @prop({
    required: true,
    type: () => Array<string>,
  })
  public conveniences: ConvenientType[];

  @prop({
    required: true,
    ref: UserEntity,
  })
  public authorId: Ref<UserEntity>;

  @prop({default: 0})
  public commentsCount: number;

  @prop({
    required: true,
    validate: {
      validator: (v: number[]) => v.length === 2
    },
  })
  public coordinates: number[];
}

export const OferModel = getModelForClass(OfferEntity);
