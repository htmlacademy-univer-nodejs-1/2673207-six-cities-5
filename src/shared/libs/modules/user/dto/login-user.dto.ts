import { IsEmail, IsString, Length } from 'class-validator';

export class LoginUserDto {
  @IsEmail({ message: 'email must be a valid address' })
  public email: string;

  @IsString({ message: 'password is required' })
  @Length(6, 12, { message: 'min length for password is 6, max is 12' })
  public password: string;
}
