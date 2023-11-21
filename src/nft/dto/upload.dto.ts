import { IsNotEmpty, IsString } from 'class-validator';

export class UploadDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}
