import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

export class CredentialsDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
