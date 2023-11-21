import { User } from '@prisma/client';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateNftDto {
  file: Express.Multer.File;

  title: string;

  description: string;

  path: string;

  user: User;
}
