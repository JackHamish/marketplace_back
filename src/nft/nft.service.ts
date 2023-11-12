import { Injectable } from '@nestjs/common';
import { CreateNftDto } from './dto/create-nft.dto';
import { StorageService } from 'src/storage/storage.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class NftService {
  constructor(
    private storageService: StorageService,
    private prismaService: PrismaService,
  ) {}

  async getAll() {
    return await this.prismaService.nft.findMany();
  }

  async upload(createNftDto: CreateNftDto) {
    const { file, path, user, title } = createNftDto;

    const { url, ref } = await this.storageService.save(file, path);

    const nft = await this.prismaService.nft.create({
      data: {
        title,
        url,
        ref,
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

    await this.storageService.delete(nft.ref);
  }
}
