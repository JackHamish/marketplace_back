import {
  Controller,
  Param,
  UseGuards,
  Patch,
  Body,
  HttpCode,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { ResetPasswordRequestDto } from 'src/reset-token/dto/reset-password.request.dto';
import { ResetPasswordWithTokenRequestDto } from 'src/reset-token/dto/reset-password-with-token.request.dto';
import { NotificationDto } from 'src/notifications/dto/notification.dto';

@UseGuards(AuthGuard)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.userService.update(id, updateUserDto);
  }

  @Post(':id/enable-notifications')
  async enablePush(
    @Body() createNotificationDto: NotificationDto,
    @Param('id') id: string,
  ) {
    return await this.userService.enableNotifications(
      id,
      createNotificationDto,
    );
  }

  @HttpCode(200)
  @Post('reset-password-request')
  public async resetPasswordRequest(
    @Body() resetPasswordDto: ResetPasswordRequestDto,
  ) {
    await this.userService.resetPasswordRequest(resetPasswordDto.email);
  }

  @HttpCode(204)
  @Post('reset-password')
  public async resetPassword(
    @Body() resetPasswordDto: ResetPasswordWithTokenRequestDto,
  ) {
    await this.userService.resetPassword(resetPasswordDto);
  }
}
