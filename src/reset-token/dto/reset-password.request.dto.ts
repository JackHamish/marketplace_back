import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class ResetPasswordRequestDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
