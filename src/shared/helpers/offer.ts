import { City, ConvenientType, HouseType, Offer } from "../types/index.js";

function parseConveniences(conveniencesString: string): ConvenientType[] {
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
          roomCount: parseInt(roomCount),
          guestCount: parseInt(guestCount),
          rentalPrice: parseInt(rentalPrice),
          conveniences: parseConveniences(conveniences),
          user: {name: userName, email: userEmail, avatar: userAvatar, password: userPassword, type: userType as 'обычный' | 'pro'},
          commentsCount: parseInt(commentsCount),
          coordinates: coordinates.split(';').map(c => parseInt(c)) }
}
