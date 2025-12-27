import { ArrayMaxSize, ArrayMinSize, IsArray, IsBoolean, IsDateString, IsEnum, IsMongoId, IsNotEmpty, IsNumber, IsString, Length, Max, Min } from 'class-validator';
import { City } from '../../../../types/city-type.enum.js';
import { ConvenientType } from '../../../../types/convenient-type.enum.js';
import { HouseType } from '../../../../types/housing-type.enum.js';

export class CreateUpdateOfferDto {
  @Length(10, 100, { message: 'title length must be between 10 and 100' })
  public title: string;

  @Length(20, 1024, {
    message: 'description length must be between 20 and 1024',
  })
  public description: string;

  @IsDateString()
  public publishData: Date;

  @IsEnum(City, { message: 'City is required and should be from 6 sities' })
  public city: City;

  @IsString({ message: 'previewLink is required' })
  public imageLink: string;

  @IsArray({ message: 'photoLinks must be an array' })
  @ArrayMinSize(6, { message: 'photoLinks must have exactly 6 elements' })
  @ArrayMaxSize(6, { message: 'photoLinks must have exactly 6 elements' })
  @IsString({ each: true, message: 'photoLinks is required' })
  public photoLinks: string[];

  @IsBoolean()
  public premium: boolean;

  @IsBoolean()
  public favourite: boolean;

  @IsNotEmpty({ message: 'Rate is required' })
  @IsNumber({ maxDecimalPlaces: 1 }, { message: 'Rate must be a number' })
  @Min(1, { message: 'Rate must be at least 1' })
  @Max(5, { message: 'Rate must be at most 5' })
  public rating: number;

  @IsEnum(HouseType)
  public houseType: HouseType;

  @IsNotEmpty({ message: 'Rooms count is required' })
  @IsNumber({}, { message: 'Rooms count must be a number' })
  @Min(1, { message: 'Rooms count must be at least 1' })
  @Max(8, { message: 'Rooms count must be at most 8' })
  public roomCount: number;

  @IsNotEmpty({ message: 'Guest count is required' })
  @IsNumber({}, { message: 'Guest count must be a number' })
  @Min(1, { message: 'Guest count must be at least 1' })
  @Max(10, { message: 'Guest count must be at most 10' })
  public guestCount: number;

  @IsNotEmpty({ message: 'Rental price is required' })
  @IsNumber({}, { message: 'Rental price must be a number' })
  @Min(100, { message: 'Rental price must be at least 100' })
  @Max(100000, { message: 'Rental price must be at most 100000' })
  public rentalPrice: number;

  @IsNotEmpty({ message: 'convenients are required' })
  @IsArray({ message: 'convenients must be an array' })
  @ArrayMinSize(1, { message: 'At least one convenient is required' })
  @IsEnum(ConvenientType, {
    each: true,
    message: 'Each convenient must be one of the allowed values',
  })
  public conveniences: ConvenientType[];

  public authorId: string;

  public commentsCount: number;

  @IsArray({ message: 'coordinates must be an array'})
  @ArrayMinSize(2)
  @ArrayMaxSize(2)
  public coordinates: number[];
}
