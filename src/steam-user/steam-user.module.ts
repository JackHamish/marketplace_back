import { Module } from '@nestjs/common';
import { SteamUserService } from './steam-user.service';
import { SteamUserController } from './steam-user.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [SteamUserController],
  providers: [SteamUserService, PrismaService],
})
export class SteamUserModule {}
