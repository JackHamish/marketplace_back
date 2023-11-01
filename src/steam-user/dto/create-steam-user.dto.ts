import { IsNumber, IsString } from 'class-validator';

export class CreateSteamUserDto {
  @IsString()
  steamid: string;

  @IsNumber()
  communityvisibilitystate: number;

  @IsNumber()
  profilestate: number;

  @IsString()
  personaname: string;

  @IsString()
  profileurl: string;

  @IsString()
  avatar: string;
  @IsString()
  avatarmedium: string;

  @IsString()
  avatarfull: string;

  @IsString()
  avatarhash: string;

  @IsNumber()
  lastlogoff: number;

  @IsNumber()
  personastate: number;

  @IsString()
  realname: string;

  @IsString()
  primaryclanid: string;

  @IsNumber()
  timecreated: number;

  @IsNumber()
  personastateflags: number;
}
