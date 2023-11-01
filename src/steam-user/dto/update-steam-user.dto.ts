import { PartialType } from '@nestjs/mapped-types';
import { CreateSteamUserDto } from './create-steam-user.dto';

export class UpdateSteamUserDto extends PartialType(CreateSteamUserDto) {}
