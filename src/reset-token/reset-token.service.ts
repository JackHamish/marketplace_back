import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ResetPasswordToken } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ResetTokenService {
  constructor(
    private readonly prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  public async generateResetToken(email: string): Promise<ResetPasswordToken> {
    const token = await this.jwtService.signAsync(
      { email },
      { secret: process.env.JWT_RESET_PASSWORD_SECRET },
    );

    const resetPasswordObject = {
      email,
      token,
    };

    const duplicate = await this.prisma.resetPasswordToken.findUnique({
      where: { email },
    });

    if (duplicate) {
      throw new BadRequestException('Reset token already send to email');
    }

    return await this.prisma.resetPasswordToken.create({
      data: resetPasswordObject,
    });
  }

  public async getResetToken(token: string): Promise<ResetPasswordToken> {
    return await this.prisma.resetPasswordToken.findFirstOrThrow({
      where: { token },
    });
  }

  public async removeResetToken(token: string): Promise<void> {
    const { id } = await this.prisma.resetPasswordToken.findFirstOrThrow({
      where: { token },
    });

    await this.prisma.resetPasswordToken.delete({ where: { id } });
  }
}
