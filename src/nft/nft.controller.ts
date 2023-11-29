import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { User } from "@prisma/client";
import { CurrentUser } from "src/auth/decorators/current.user.decorator";
import { AuthGuard } from "src/auth/guards/auth.guard";
import { StorageService } from "src/storage/storage.service";
import { NftService } from "./nft.service";
import { UploadDto } from "./dto/upload.dto";

@UseGuards(AuthGuard)
@Controller("nfts")
export class NftController {
  constructor(
    private storageService: StorageService,
    private nftService: NftService,
  ) {}

  @Get("/user")
  async getByUserId(@CurrentUser() user: User) {
    return await this.nftService.getByUserId(user.id);
  }

  @Get(":id")
  async getById(@Param("id") id: string) {
    return await this.nftService.getById(id);
  }

  @Get()
  async getAll() {
    return await this.nftService.getAll();
  }

  @Post()
  @UseInterceptors(
    FileInterceptor("file", {
      limits: {
        files: 1,
        fileSize: 1024 * 1024,
      },
    }),
  )
  async upload(
    @Body() uploadDto: UploadDto,
    @UploadedFile() file: Express.Multer.File,
    @CurrentUser() user: User,
  ) {
    return await this.nftService.upload({
      file,
      title: uploadDto.title,
      description: uploadDto.description,
      user,
    });
  }

  @Delete(":id")
  async delete(@Param("id") id: string) {
    return await this.nftService.delete(id);
  }
}
