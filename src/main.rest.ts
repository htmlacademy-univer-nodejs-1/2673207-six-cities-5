import 'reflect-metadata';
import { Container } from 'inversify';
import { RestApplication } from './rest/index.js';
import { Component } from './shared/types/index.js';
import { restApplicationContainer } from './rest/rest.container.js';
import { userContainer } from './shared/modules/user/user.container.js';
import { offerContainer } from './shared/modules/offer/offer.container.js';
import { commentContainer } from './shared/modules/comment/comment.container.js';


async function bootstrap() {
  const container = new Container();
  await container.load(
    restApplicationContainer,
    userContainer,
    offerContainer,
    commentContainer,
  )

  const application = container.get<RestApplication>(Component.RestApplication);
  await application.init();
}


bootstrap();
