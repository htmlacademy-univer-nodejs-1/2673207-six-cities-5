import { Container } from 'inversify';
import { FavoriteEntity, FavoriteModel } from './favorite.entity.js';
import { types } from '@typegoose/typegoose';
import { Component } from '../../types/index.js';

export function createFavoritesContainer() {
  const favoritesContainer = new Container();

  favoritesContainer.bind<types.ModelType<FavoriteEntity>>(Component.FavoriteModel)
    .toConstantValue(FavoriteModel);

  return favoritesContainer;
}
