import { IsNotEmpty, IsString } from 'class-validator';

export class ResetPasswordWithTokenRequestDto {
  @IsNotEmpty()
  @IsString()
  token: string;

  @IsNotEmpty()
  @IsString()
  newPassword: string;
}
