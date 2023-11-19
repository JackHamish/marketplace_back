import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserModule } from 'src/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { NftModule } from 'src/nft/nft.module';
import { envSchema } from './schemas/env.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: envSchema,
    }),
    AuthModule,
    UserModule,
    NftModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
