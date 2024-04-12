import {
  Controller,
  Get,
  Body,
  Request,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { AuthGuard } from './auth.guard';
import { UsersService } from 'src/users/users.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('login')
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }

  @Post('register')
  register(@Body() payload: CreateUserDto) {
    return this.usersService.addUser(payload);
    // this.authService.register(payload.username, payload.password);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return this.usersService.getProfile(req.user);
  }

  @UseGuards(AuthGuard)
  @Post('profile')
  setProfile(@Request() req, @Body() payload: UpdateProfileDto) {
    return this.usersService.setProfile(req.user, payload);
  }
}
