import { defaultClasses, getModelForClass, modelOptions, prop } from "@typegoose/typegoose";

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface FavoriteEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'favorites'
  }
})
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class FavoriteEntity extends defaultClasses.TimeStamps {
  @prop({ required: true })
  public userId: string;

  @prop({ required: true })
  public offerId: string;
}

export const FavoriteModel = getModelForClass(FavoriteEntity);
