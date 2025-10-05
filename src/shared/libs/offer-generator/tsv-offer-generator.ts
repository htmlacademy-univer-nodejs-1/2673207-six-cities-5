import dayjs from "dayjs";
import { getRandomItem, generateRandomValue, getRandomItems } from "../../helpers";
import { MockServerData } from "../../types";
import { OfferGenerator } from "./offer-generator.interface";

const FIRST_WEEK_DAY = 1;
const LAST_WEEK_DAY = 7;

const MIN_RATE = 1;
const MAX_RATE = 5;

const MIN_ROOM_COUNT = 1;
const MAX_ROOM_COUNT = 8;

const MIN_GUEST_COUNT = 1;
const MAX_GUEST_COUNT = 10;

const MIN_RENTAL_PRICE = 100;
const MAX_RENTAL_PRICE = 999999;

const MIN_COMMENT_COUNT = 0;
const MAC_COMMENT_COUNT = 25;


const MIN_LATITUDE = -90;
const MAX_LATITUDE = 90;


const MIN_LONGITUDE = -180;
const MAX_LONGITUDE = 180;

export class TSVOfferGenerator implements OfferGenerator {
  constructor(private readonly mockData: MockServerData) {}

  public generate(): string {
    const title = getRandomItem(this.mockData.titles);
    const description = getRandomItem(this.mockData.descriptions);
    const publishDate = dayjs()
      .subtract(generateRandomValue(FIRST_WEEK_DAY, LAST_WEEK_DAY), 'day')
      .toISOString();
    const city = getRandomItem(this.mockData.cities)
    const photoLinks = getRandomItems(this.mockData.photoLinks);
    const previewImage = getRandomItem(this.mockData.previewImages);
    const premium = generateRandomValue(0, 1) === 0;
    const favorite = generateRandomValue(0, 1) === 0;
    const rate = generateRandomValue(MIN_RATE, MAX_RATE);
    const houseType = getRandomItem(this.mockData.housingType);
    const convenientTypes = getRandomItems(this.mockData.convenientType);
    const roomCount = generateRandomValue(MIN_ROOM_COUNT, MAX_ROOM_COUNT);
    const guestCount = generateRandomValue(MIN_GUEST_COUNT, MAX_GUEST_COUNT);
    const rentalPrice = generateRandomValue(MIN_RENTAL_PRICE, MAX_RENTAL_PRICE);

    const userName = getRandomItem(this.mockData.userNames);
    const userEmail = getRandomItem(this.mockData.userEmails);
    const userAvatar = getRandomItem(this.mockData.userAvatars);
    const userPassword = getRandomItem(this.mockData.userPasswords);
    const userType = getRandomItem(this.mockData.userTypes);

    const commentsCount = generateRandomValue(MIN_COMMENT_COUNT, MAC_COMMENT_COUNT);
    const latitude = generateRandomValue(MIN_LATITUDE, MAX_LATITUDE, 6);
    const longitude = generateRandomValue(MIN_LONGITUDE, MAX_LONGITUDE, 6);
    const location = [latitude, longitude];
    return [
      title,
      description,
      publishDate,
      city,
      photoLinks,
      previewImage,
      premium,
      favorite,
      rate,
      houseType,
      convenientTypes,
      roomCount,
      guestCount,
      rentalPrice,
      userName,
      userEmail,
      userAvatar,
      userPassword,
      userType,
      commentsCount,
      location,
    ].join('\t');
  }
}
