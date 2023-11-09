import { Injectable, Logger } from '@nestjs/common';
import { ResetTokenInterface } from './interfaces/reset-token.interface';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ResetTokenService {
  constructor(
    private readonly prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  public async generateResetToken(email: string): Promise<ResetTokenInterface> {
    const token = await this.jwtService.signAsync({ email });

    const resetPasswordObject = {
      email,
      token,
    };

    return await this.prisma.resetToken.create({ data: resetPasswordObject });
  }

  public async getResetToken(token: string): Promise<ResetTokenInterface> {
    return await this.prisma.resetToken.findFirstOrThrow({ where: { token } });
  }

  public async removeResetToken(token: string): Promise<void> {
    const { id } = await this.prisma.resetToken.findFirstOrThrow({
      where: { token },
    });

    await this.prisma.resetToken.delete({ where: { id } });
  }
}
