import { IsNotEmpty, IsString } from 'class-validator';

export class ResetPasswordRequestDto {
  @IsNotEmpty()
  @IsString()
  email: string;
}
