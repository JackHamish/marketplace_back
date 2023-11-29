import { Injectable } from "@nestjs/common";
import { CreateSteamUserDto } from "./dto/create-steam-user.dto";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class SteamUserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(id: string, createSteamUserDto: CreateSteamUserDto) {
    return await this.prisma.steamUser.create({
      data: {
        ...createSteamUserDto,
        userId: id,
      },
    });
  }
}
