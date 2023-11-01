import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SteamUserService } from './steam-user.service';
import { CreateSteamUserDto } from './dto/create-steam-user.dto';
import { UpdateSteamUserDto } from './dto/update-steam-user.dto';

@Controller('steam')
export class SteamUserController {
  constructor(private readonly steamUserService: SteamUserService) {}

  @Post()
  create(@Body() createSteamUserDto: CreateSteamUserDto) {
    return this.steamUserService.create(createSteamUserDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.steamUserService.findOne(id);
  }
}
