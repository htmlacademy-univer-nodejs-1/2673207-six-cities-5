import {
  defaultClasses,
  getModelForClass,
  modelOptions,
  prop,
} from '@typegoose/typegoose';

@modelOptions({
  schemaOptions: {
    collection: 'favorites',
  },
})
export class FavoriteEntity extends defaultClasses.TimeStamps {
  @prop({ required: true })
  public userId!: string;

  @prop({ required: true })
  public offerId!: string;
}

export const FavoriteModel = getModelForClass(FavoriteEntity);
