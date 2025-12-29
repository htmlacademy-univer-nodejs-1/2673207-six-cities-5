import { IsMongoId, IsNumber, IsString, Length, Max, Min } from 'class-validator';

export class CreateCommentDto {
  @IsString({ message: 'text is required' })
  @Length(5, 1024, { message: 'text length must be between 5 and 1024 characters' })
  public text: string;

  @IsNumber({}, { message: 'Rate must be a number' })
  @Min(1, { message: 'Rate must be at least 1' })
  @Max(5, { message: 'Rate must be at most 5' })
  public rating: number;

  @IsMongoId({ message: 'userId must be a valid Mongo ID' })
  public userId: string;
}
