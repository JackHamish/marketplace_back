import { Injectable } from '@nestjs/common';
import { CreateNftDto } from './dto/create-nft.dto';

@Injectable()
export class NftService {
  create(createNftDto: CreateNftDto) {
    return 'This action adds a new nft';
  }

  findAll() {
    return `This action returns all nft`;
  }

  findOne(id: number) {
    return `This action returns a #${id} nft`;
  }

  remove(id: number) {
    return `This action removes a #${id} nft`;
  }
}
