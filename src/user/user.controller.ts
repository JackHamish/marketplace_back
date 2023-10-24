import {
  Controller,
  Get,
  Param,
  UseGuards,
  ParseUUIDPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { User } from '@prisma/client';
import { CurrentUser } from './decorators/current.user.decorator';

@Controller('')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard)
  @Get('me')
  findOne(@CurrentUser() loggedUser: User) {
    return this.userService.findUnique(loggedUser.id);
  }
}
