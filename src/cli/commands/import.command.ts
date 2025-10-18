import { Commander} from './command.interface.js';
import { TSVFileReader } from '../../shared/libs/file-reader/index.js';
import { getErrorMessage, getMongoURI, createOffer } from '../../shared/helpers/index.js';
import { UserService } from '../../shared/modules/user/user-service.interface.js';
import { DefaultOfferService, OfferModel, IOfferService } from '../../shared/modules/offer/index.js';
import { DatabaseClient, MongoDatabaseClient } from '../../shared/libs/database-client/index.js';
import { ConsoleLogger, Logger } from '../../shared/libs/logger/index.js';
import { DefaultUserService, UserModel } from '../../shared/modules/user/index.js';
import { Offer } from '../../shared/types/index.js';
import { DEFAULT_DB_PORT, DEFAULT_USER_PASSWORD } from './command.constant.js';

export class ImportCommander implements Commander {
  private userService: UserService;
  private offerService: IOfferService;
  private databaseClient: DatabaseClient;
  private logger: Logger;
  private salt: string;

  constructor() {
    this.onImportedLine = this.onImportedLine.bind(this);
    this.onCompleteImport = this.onCompleteImport.bind(this);

    this.logger = new ConsoleLogger();
    this.offerService = new DefaultOfferService(this.logger, OfferModel);
    this.userService = new DefaultUserService(this.logger, UserModel);
    this.databaseClient = new MongoDatabaseClient(this.logger);
  }

  private async onImportedLine(line: string, resolve: () => void) {
    const offer = createOffer(line);
    console.log(offer)
    await this.saveOffer(offer);
    resolve();
  }

  private onCompleteImport(count: number) {
    console.info(`${count} rows imported.`);
    this.databaseClient.disconnect();
  }

  private async saveOffer(offer: Offer) {
    const user = await this.userService.findOrCreate({
      ...offer.user,
      password: DEFAULT_USER_PASSWORD
    }, this.salt);

    await this.offerService.create({
      title: offer.title,
      description: offer.description,
      city: offer.city,
      previewImage: offer.image,
      images: offer.photo,
      isPremium: offer.premium,
      isFavorite: offer.favourite,
      rating: offer.rating,
      type: offer.houseType,
      roomCount: offer.roomCount,
      maxGuests: offer.guestCount,
      price: offer.rentalPrice,
      conveniences: offer.conveniences,
      author: user.id,
      coordinates: offer.coordinates,
    });
  }

  public getName(): string {
    return '--import';
  }

  public async execute(filename: string, login: string, password: string, host: string, dbname: string, salt: string): Promise<void> {
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
