import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { RegisterDto } from "./dto/register.dto";
import { UserService } from "src/user/user.service";
import { RefreshDto } from "./dto/refresh.dto";
import { addSeconds, getTime } from "date-fns";
import {
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common/exceptions";
import { verify } from "argon2";
import { LoginDto } from "./dto/login.dto";
import { JWT_EXPIRES_IN_SECONDS } from "./auth.constants";
import { CreateSteamUserDto } from "src/steam-user/dto/create-steam-user.dto";
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
    const result = await this.jwtService.verifyAsync(refreshDto.refreshToken, {
      secret: process.env.JWT_REFRESH_SECRET,
    });

    if (!result) {
      throw new UnauthorizedException("Invalid refresh token");
    }

    const tokens = await this.issueTokens(result.id);

    return tokens;
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
      jwtExpiresIn: getTime(addSeconds(new Date(), JWT_EXPIRES_IN_SECONDS)),
    };
  }

  async loginSteam(loginDto: CreateSteamUserDto) {
    const user = await this.userService.findUnique({
      steamUser: { steamid: loginDto.steamid },
    });

    const tokens = await this.issueTokens(user.id);

    return {
      user,
      ...tokens,
      jwtExpiresIn: getTime(addSeconds(new Date(), JWT_EXPIRES_IN_SECONDS)),
    };
  }

  async findOne(id: string) {
    const user = await this.userService.findUnique({ id });

    return user;
  }

  private async issueTokens(userId: string) {
    const data = { id: userId };

    const accessToken = await this.jwtService.signAsync(data, {
      secret: process.env.JWT_ACCESS_SECRET,
    });

    const refreshToken = await this.jwtService.signAsync(data, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: "7d",
    });

    return { accessToken, refreshToken };
  }

  private async validateUser(loginDto: LoginDto) {
    const user = await this.userService.findUnique({ email: loginDto.email });

    if (!user) {
      throw new NotFoundException("User not found");
    }

    const isValid = await verify(user.password, loginDto.password);

    if (!isValid) {
      throw new UnauthorizedException("Invalid password");
    }

    return user;
  }
}
