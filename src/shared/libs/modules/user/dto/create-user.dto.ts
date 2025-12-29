import { IsEmail, IsEnum, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'name is required' })
  @Length(1, 15, { message: 'min length is 1, max is 15' })
  public name: string;

  @IsEmail({ message: 'email must be a valid address' })
  public email: string;

  @IsString({ message: 'password is required' })
  @Length(6, 12, { message: 'min length for password is 6, max is 12' })
  public password: string;

  @IsEnum(['обычный', 'pro'], { message: 'type must be обычный or pro' })
  public type: 'обычный' | 'pro';
}
