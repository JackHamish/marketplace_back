import { Module } from '@nestjs/common';
import { ResetTokenService } from './reset-token.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [],
  providers: [ResetTokenService, PrismaService],
  exports: [ResetTokenService],
})
export class ResetTokenModule {}
