import { IsNotEmpty, IsString, IsStrongPassword } from "class-validator";

export class ResetPasswordWithTokenRequestDto {
  @IsNotEmpty()
  @IsString()
  token: string;

  @IsNotEmpty()
  @IsString()
  @IsStrongPassword()
  newPassword: string;
}
