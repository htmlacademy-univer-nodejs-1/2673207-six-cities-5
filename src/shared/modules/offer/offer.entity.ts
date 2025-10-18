import { defaultClasses, getModelForClass, modelOptions, prop, Ref } from '@typegoose/typegoose';
import {ConvenientType, City, HouseType} from '../../types/index.js';
import {UserEntity} from '../user/index.js';

export interface OfferEntity extends defaultClasses.Base {
}

@modelOptions({
  schemaOptions: {
    collection: 'offers'
  },
  options: {
    allowMixed: 0 // Отключаем предупреждения для Mixed
  }
})

export class OfferEntity extends defaultClasses.TimeStamps {
  @prop({
    required: true,
    type: () => String,
    enum: City
  })
  public city: City;

  @prop({required: true})
  public previewImage: string;

  @prop({required: true})
  public images: string[];

  @prop({default: false})
  public isPremium: boolean;

  @prop({default: false})
  public isFavorite: boolean;

  @prop({default: 0})
  public rating: number;

  @prop({required: true})
  public roomCount: number;

  @prop({required: true})
  public maxGuests: number;

  @prop({default: []})
  public convenienties: ConvenientType[];

  @prop({required: true})
  public coordinates: number[];

  @prop({trim: true, required: true})
  public title!: string;

  @prop({trim: true})
  public description!: string;

  @prop()
  public price!: number;

  @prop({
    type: () => String,
    enum: HouseType
  })
  public type!: HouseType;

  @prop({default: 0})
  public commentCount!: number;

  @prop({
    ref: UserEntity,
    required: true
  })
  public author!: Ref<UserEntity>;
}

export const OfferModel = getModelForClass(OfferEntity);
