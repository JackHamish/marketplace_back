import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

export class RegisterDto extends CreateUserDto {}
