import { IsNotEmpty, IsBoolean, IsString } from 'class-validator';

export class BookDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  authors: string;

  @IsBoolean()
  favorite: boolean | null | undefined;
}
