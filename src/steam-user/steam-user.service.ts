import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateSteamUserDto } from './dto/create-steam-user.dto';
import { UpdateSteamUserDto } from './dto/update-steam-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SteamUserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createSteamUserDto: CreateSteamUserDto) {
    const oldUser = await this.prisma.steamUser.findUnique({
      where: { steamid: createSteamUserDto.steamid },
    });

    return await this.prisma.steamUser.create({
      data: {
        ...createSteamUserDto,
      },
    });
  }

  async findOneBySteamId(steamId: string) {
    const user = await this.prisma.steamUser.findUnique({
      where: { steamid: steamId },
    });

    return user;
  }

  async findOne(id: string) {
    const user = await this.prisma.steamUser.findUnique({ where: { id } });

   

    return user;
  }
}
