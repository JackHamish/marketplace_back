import { Module } from "@nestjs/common";
import { NftService } from "./nft.service";
import { NftController } from "./nft.controller";
import { StorageModule } from "src/storage/storage.module";
import { PrismaService } from "src/prisma/prisma.service";

@Module({
  imports: [StorageModule],
  controllers: [NftController],
  providers: [NftService, PrismaService],
})
export class NftModule {}
