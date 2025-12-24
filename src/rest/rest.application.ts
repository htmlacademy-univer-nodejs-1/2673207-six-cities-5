import { inject, injectable } from 'inversify';
import { Logger } from '../shared/libs/logger/index.js';
import { Config, RestSchema } from '../shared/libs/config/index.js';
import { Component } from '../shared/types/index.js';
import { DatabaseClient } from '../shared/libs/database-client/index.js';
import { getMongoURI } from '../shared/helpers/index.js';
import express, { Express } from 'express';
import { OfferController } from '../shared/modules/offer/index.js';

@injectable()
export class RestApplication {
  private server: Express;

  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.Config) private readonly config: Config<RestSchema>,
    @inject(Component.DatabaseClient) private readonly databaseClient: DatabaseClient,
    @inject(Component.OfferController) private readonly offerController: OfferController,
  ) {
    this.server = express();
  }

  public async init() {
    this.logger.info('Application initialization');

    this.logger.info('Init database…');
    await this._initDb();
    this.logger.info('Init database completed');

    this.logger.info('try to init server...');
    await this._initServer();
    this.logger.info('Init server completed');

    this.logger.info('try to init middleware...');
    await this._initMiddleware();
    this.logger.info('Init middleware completed');

    this.logger.info('try to init controllers...');
    await this._initControllers();
    this.logger.info('Init controllers completed');
  }

  private async _initControllers() {
    this.server.use('/offers', this.offerController.router);
  }
  private async _initDb() {
    const mongoUri = getMongoURI(
      this.config.get('DB_USER'),
      this.config.get('DB_PASSWORD'),
      this.config.get('DB_HOST'),
      this.config.get('DB_PORT'),
      this.config.get('DB_NAME'),
    );

    return this.databaseClient.connect(mongoUri);
  }

  private async _initMiddleware() {
    this.server.use(express.json());
  }

  private async _initServer() {
    const port = this.config.get('PORT');
    this.server.listen(port);
  }
}
