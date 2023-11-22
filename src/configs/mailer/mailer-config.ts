import { ConfigModule } from "@nestjs/config";
import { getMailConfig } from "./smtp-config";

export const mailerConfig = {
  imports: [ConfigModule],
  useFactory: async () => {
    return await getMailConfig();
  },
};
