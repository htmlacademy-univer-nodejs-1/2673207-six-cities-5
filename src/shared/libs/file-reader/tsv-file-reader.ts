import { Offer, HouseType, City, ConvenientType} from '../../types/index.js'
import { FileReader } from './file-reader.interface.js';
import { readFileSync } from 'node:fs';

export class TSVFileReader implements FileReader {
  private rawData = '';

  constructor(
    private readonly filename: string
  ) {}

  public read(): void {
    this.rawData = readFileSync(this.filename, { encoding: 'utf-8' });
  }

  private parseConveniences(conveniencesString: string): ConvenientType[] {
    try {
      const stringArray = conveniencesString.split(';');

      return stringArray
        .map(str => {
          if (Object.values(ConvenientType).includes(str as ConvenientType)) {
            return str as ConvenientType;
          }
          console.warn(`Unknown convenience type: ${str}`);
          return null;
        })
        .filter((item): item is ConvenientType => item !== null);

      } catch (error) {
        console.error('Error parsing conveniences:', error);
        return [];
      }
  }

  public toArray(): Offer[] {
    if (!this.rawData) {
      throw new Error('File was not read');
    }

    return this.rawData
      .split('\n')
      .filter((row) => row.trim().length > 0)
      .map((line) => line.split('\t'))
      .map(([
        title, description, publishData, city,
        image, photo, premium, favourite, rating,
        houseType, roomCount, guestCount, rentalPrice, conveniences,
        userName, userEmail, userAvatar, userPassword, userType,
        commentsCount, coordinates]) => ({
          title,
          description,
          publishData: new Date(publishData),
          city: city as City,
          image,
          photo: photo.split(';'),
          premium: premium === 'true',
          favourite: favourite === 'true',
          rating: parseFloat(rating),
          houseType: houseType as HouseType,
          roomCount: parseInt(roomCount),
          guestCount: parseInt(guestCount),
          rentalPrice: parseInt(rentalPrice),
          conveniences: this.parseConveniences(conveniences),
          user: {name: userName, email: userEmail, avatar: userAvatar, password: userPassword, type: userType as 'обычный' | 'pro'},
          commentsCount: parseInt(commentsCount),
          coordinates: coordinates.split(';').map(c => parseInt(c))
      }
    ));
  }
}
