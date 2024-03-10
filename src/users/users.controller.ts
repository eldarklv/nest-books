import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/signup')
  @UsePipes(ValidationPipe)
  signup(@Body() body: UserDto) {
    return this.usersService.create(body);
  }

  @Get()
  getAllUsers() {
    return this.usersService.findAll();
  }
}
