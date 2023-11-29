import { NFT_INCLUDE } from "./constants";
import { Injectable } from "@nestjs/common";
import { CreateNftDto } from "./dto/create-nft.dto";
import { StorageService } from "src/storage/storage.service";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class NftService {
  constructor(
    private storageService: StorageService,
    private prismaService: PrismaService,
  ) {}

  async getById(id: string) {
    return await this.prismaService.nft.findUnique({
      where: { id },
      include: { user: { select: { name: true } } },
    });
  }

  async getAll() {
    return await this.prismaService.nft.findMany(NFT_INCLUDE);
  }

  async getByUserId(id: string) {
    return await this.prismaService.nft.findMany({
      where: { userId: id },
      ...NFT_INCLUDE,
    });
  }

  async upload(createNftDto: CreateNftDto) {
    const { file, user, title, description } = createNftDto;

    const path = "nfts";

    const { url, dbRef } = await this.storageService.save(file, path);

    const nft = await this.prismaService.nft.create({
      data: {
        title,
        url,
        description,
        dbRef,
        userId: user.id,
      },
    });

    return nft;
  }

  async delete(id: string) {
    const nft = await this.prismaService.nft.findUniqueOrThrow({
      where: { id },
    });

    await this.prismaService.nft.delete({ where: { id } });

    await this.storageService.delete(nft.dbRef);
  }
}
