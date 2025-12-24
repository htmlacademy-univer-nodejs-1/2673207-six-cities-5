import {IOfferService} from './offer-service.interface.js';
import {Component} from '../../types/index.js';
import {OfferEntity, OfferModel} from './offer.entity.js';
import {types} from '@typegoose/typegoose';
import {DefaultOfferService} from './default-offer-service.js';
import {ContainerModule, ContainerModuleLoadOptions} from 'inversify';
import { Controller } from '../../../rest/index.js';
import { OfferController } from './offer.controller.js';
import { FavoriteEntity, FavoriteModel } from '../favorite/favorite.entity.js';

export const offerContainer: ContainerModule = new ContainerModule(
  (options: ContainerModuleLoadOptions) => {
    options.bind<IOfferService>(Component.OfferService).to(DefaultOfferService);
    options.bind<types.ModelType<OfferEntity>>(Component.OfferModel).toConstantValue(OfferModel);
    options.bind<types.ModelType<FavoriteEntity>>(Component.FavoriteModel).toConstantValue(FavoriteModel);
    options.bind<Controller>(Component.OfferController).to(OfferController).inSingletonScope();
  });
