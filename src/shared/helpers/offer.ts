import { City, ConvenientType, HouseType, Offer, UserType } from '../types/index.js';

function parseConveniences(conveniencesString: string): ConvenientType[] {
  try {
    const stringArray = conveniencesString.split(';');

    return stringArray
      .map((str) => {
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

export function createOffer(offerData: string): Offer {
  const [
    title, description, publishData, city,
    image, photo, premium, favourite, rating,
    houseType, roomCount, guestCount, rentalPrice, conveniences,
    userName, userEmail, userAvatar, userPassword, userType,
    commentsCount, coordinates] = offerData.split('\t');
  return { title,
    description,
    publishData: new Date(publishData),
    city: city as City,
    image,
    photo: photo.split(';'),
    premium: premium === 'true',
    favourite: favourite === 'true',
    rating: parseFloat(rating),
    houseType: houseType as HouseType,
    roomCount: parseInt(roomCount, 10),
    guestCount: parseInt(guestCount, 10),
    rentalPrice: parseInt(rentalPrice, 10),
    conveniences: parseConveniences(conveniences),
    user: {name: userName, email: userEmail, avatar: userAvatar, password: userPassword, type: userType as UserType},
    commentsCount: parseInt(commentsCount, 10),
    coordinates: coordinates.split(';').map((c) => parseInt(c, 10)) };
}

export function parseOffer(data: string): Offer {
  const [
    title,
    description,
    publicationDate,
    city,
    image,
    images,
    isPremium,
    isFavorite,
    rating,
    type,
    bedrooms,
    maxGuests,
    price,
    conveniences,
    name,
    email,
    avatar,
    password,
    userType,
    latitude,
    longitude] = data.replace('\n', '')
    .split('\t');

  return {
    title,
    description,
    publishData: new Date(publicationDate),
    city: City[city as keyof typeof City],
    image,
    photo: images.split(';'),
    premium: isPremium === 'true',
    favourite: isFavorite === 'true',
    rating: parseFloat(rating),
    houseType: HouseType[type as keyof typeof HouseType],
    roomCount: parseInt(bedrooms, 10),
    guestCount: parseInt(maxGuests, 10),
    rentalPrice: parseInt(price, 10),
    conveniences: conveniences.trim().split(';').map(
      (x) => Object.values(ConvenientType).includes(x as ConvenientType) ? x : undefined).filter((x) => !!x) as ConvenientType[],
    user: {name, avatar, type: UserType[userType as keyof typeof UserType], password: password, email},
    commentsCount: 0,
    coordinates: [parseFloat(latitude), parseFloat(longitude)],
  };
}
