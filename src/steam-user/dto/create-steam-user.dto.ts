import { IsNumber, IsString } from 'class-validator';

export class CreateSteamUserDto {
  @IsString()
  steamid: string;

  @IsString()
  personaname: string;

  @IsString()
  profileurl: string;

  @IsString()
  avatar: string;
}
