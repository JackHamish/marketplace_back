import {
  Controller,
  Get,
  Param,
  UseGuards,
  ParseUUIDPipe,
  Patch,
  Body,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { User } from '@prisma/client';
import { CurrentUser } from 'src/auth/decorators/current.user.decorator';
import { UpdateUserDto } from './dto/update-user.dto';

@UseGuards(AuthGuard)
@Controller('')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  findOne(@CurrentUser() loggedUser: User) {
    return this.userService.findUnique({ id: loggedUser.id });
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.userService.update(id, updateUserDto);
  }
}
