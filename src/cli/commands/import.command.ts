import { createOffer, getErrorMessage, getMongoURI } from '../../shared/helpers/index.js';
import { DatabaseClient, MongoDatabaseClient } from '../../shared/libs/database-client/index.js';
import { TSVFileReader } from '../../shared/libs/file-reader/index.js';
import { ConsoleLogger, Logger } from '../../shared/libs/logger/index.js';
import { CommentModel } from '../../shared/libs/modules/comment/comment.entity.js';
import { FavoriteModel } from '../../shared/libs/modules/favorite/favorite.entity.js';
import { OfferService, DefaultOfferService, OfferModel } from '../../shared/libs/modules/offer/index.js';
import { UserService, DefaultUserService, UserModel } from '../../shared/libs/modules/user/index.js';
import { Offer } from '../../shared/types/index.js';
import { DEFAULT_DB_PORT, DEFAULT_USER_PASSWORD } from './command.constant.js';
import { Commander } from './command.interface.js';

export class ImportCommander implements Commander {
  private userService: UserService;
  private offerService: OfferService;
  private databaseClient: DatabaseClient;
  private logger: Logger;
  private salt: string;

  constructor() {
    this.onImportedLine = this.onImportedLine.bind(this);
    this.onCompleteImport = this.onCompleteImport.bind(this);

    this.logger = new ConsoleLogger();
    this.offerService = new DefaultOfferService(this.logger, OfferModel, FavoriteModel, CommentModel);
    this.userService = new DefaultUserService(this.logger, UserModel);
    this.databaseClient = new MongoDatabaseClient(this.logger);
  }

  public getName(): string {
    return '--import';
  }

  private async onImportedLine(line: string, resolve: () => void) {
    const offer = createOffer(line);
    await this.saveOffer(offer);
    resolve();
  }

  private async saveOffer(offer: Offer) {
    const user = await this.userService.findOrCreate({
      ...offer.author,
      password: DEFAULT_USER_PASSWORD
    }, this.salt);

    await this.offerService.create({
      title: offer.title,
      description: offer.description,
      publishData: offer.publishData,
      city: offer.city,
      imageLink: offer.imageLink,
      photoLinks: offer.photoLinks,
      premium: offer.premium,
      favourite: offer.favourite,
      rating: offer.rating,
      houseType: offer.houseType,
      roomCount: offer.roomCount,
      guestCount: offer.guestCount,
      rentalPrice: offer.rentalPrice,
      conveniences: offer.conveniences,
      authorId: user.id,
      commentsCount: offer.commentsCount,
      coordinates: offer.coordinates,
    });
  }

  private onCompleteImport(count: number) {
    console.info(`${count} rows imported.`);
    this.databaseClient.disconnect();
  }

  public async execute(filename: string, login: string, password: string,
    host: string, dbname: string, salt: string): Promise<void> {

    const uri = getMongoURI(login, password, host, DEFAULT_DB_PORT, dbname);
    this.salt = salt;
    await this.databaseClient.connect(uri);

    const fileReader = new TSVFileReader(filename.trim());

    fileReader.on('line', this.onImportedLine);
    fileReader.on('end', this.onCompleteImport);

    try {
      await fileReader.read();
    } catch (error) {
      console.error(`Can't import data from file: ${filename}`);
      console.error(getErrorMessage(error));
    }
  }
}
