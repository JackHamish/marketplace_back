import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Module } from '@nestjs/common';
import { join } from 'path';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { mailerAsyncConfig } from 'src/configs/mailer/mailer-config';
import { MailService } from './mail.service';

@Module({
  imports: [MailerModule.forRootAsync(mailerAsyncConfig)],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
