import { Controller, Post, Body, UseGuards } from "@nestjs/common";
import { SteamUserService } from "./steam-user.service";
import { CreateSteamUserDto } from "./dto/create-steam-user.dto";
import { CurrentUser } from "src/auth/decorators/current.user.decorator";
import { User } from "@prisma/client";
import { AuthGuard } from "src/auth/guards/auth.guard";

@UseGuards(AuthGuard)
@Controller("users/:id/steam")
export class SteamUserController {
  constructor(private readonly steamUserService: SteamUserService) {}

  @Post()
  create(
    @CurrentUser() user: User,
    @Body() createSteamUserDto: CreateSteamUserDto,
  ) {
    return this.steamUserService.create(user.id, createSteamUserDto);
  }
}
