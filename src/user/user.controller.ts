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
import { CurrentUser } from 'src/auth/decorators/current.user.decorator';

@UseGuards(AuthGuard)
@Controller('')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  findOne(@CurrentUser() loggedUser: User) {
    return this.userService.findUnique({ id: loggedUser.id });
  }
}
