import {
  Controller,
  Post,
  Body,
  HttpCode,
  Get,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RefreshDto } from './dto/refresh.dto';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { CreateSteamUserDto } from 'src/steam-user/dto/create-steam-user.dto';
import { CurrentUser } from './decorators/current.user.decorator';
import { SteamUser, User } from '@prisma/client';
import { AuthGuard } from './guards/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async create(@Body() registerDto: RegisterDto) {
    return await this.authService.register(registerDto);
  }

  @Post('login/steam')
  async createSteam(@Body() loginDto: CreateSteamUserDto) {
    return await this.authService.loginSteam(loginDto);
  }

  @HttpCode(200)
  @Post('login')
  async logIn(@Body() loginDto: LoginDto) {
    return await this.authService.login(loginDto);
  }

  @Post('refresh')
  async refresh(@Body() refreshDto: RefreshDto) {
    return await this.authService.refresh(refreshDto);
  }

  @UseGuards(AuthGuard)
  @Get('me')
  findOne(@CurrentUser() loggedUser: User) {
    return this.authService.findOne(loggedUser.id);
  }
}
