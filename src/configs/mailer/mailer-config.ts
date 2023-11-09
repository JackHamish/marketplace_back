import { ConfigModule, ConfigService } from '@nestjs/config';
import { getMailConfig } from './smtp-config';

export const mailerAsyncConfig = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async () => {
    return await getMailConfig();
  },
};
