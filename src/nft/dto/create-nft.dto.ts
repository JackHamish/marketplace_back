import { User } from "@prisma/client";

export class CreateNftDto {
  file: Express.Multer.File;

  title: string;

  description: string;

  path: string;

  user: User;
}
