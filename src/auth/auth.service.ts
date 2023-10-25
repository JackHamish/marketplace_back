import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { UserService } from 'src/user/user.service';
import { RefreshDto } from './dto/refresh.dto';
import {
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common/exceptions';
import { verify } from 'argon2';
import { LoginDto } from './dto/login.dto';
@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}
  async register(registerDto: RegisterDto) {
    const user = await this.userService.create(registerDto);

    const tokens = await this.issueTokens(user.id);

    return {
      user,
      ...tokens,
    };
  }

  async refresh(refreshDto: RefreshDto) {
    const result = await this.jwtService.verifyAsync(refreshDto.refreshToken);

    if (!result) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const user = await this.userService.findUnique(result.id);

    const tokens = await this.issueTokens(user.id);

    return { ...tokens };
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto);
    const tokens = await this.issueTokens(user.id);

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      ...tokens,
      jwtExpiresIn: new Date().setTime(new Date().getTime() + 20 * 1000),
    };
  }

  private async issueTokens(userId: string) {
    const data = { id: userId };

    const accessToken = await this.jwtService.signAsync(data);

    const refreshToken = await this.jwtService.signAsync(data, {
      expiresIn: '7d',
    });

    return { accessToken, refreshToken };
  }

  private async validateUser(loginDto: LoginDto) {
    const user = await this.userService.findUnique(loginDto.email);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isValid = await verify(user.password, loginDto.password);

    if (!isValid) {
      throw new UnauthorizedException('Invalid password');
    }

    return user;
  }
}
