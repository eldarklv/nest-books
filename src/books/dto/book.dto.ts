import { IsNotEmpty, IsBoolean, IsString } from 'class-validator';

export class BookDto {
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  authors: string;

  @IsBoolean()
  @IsString()
  favorite: boolean | null | undefined;
}
