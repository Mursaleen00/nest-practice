import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  UseGuards,
  Get,
  Request,
} from '@nestjs/common';
import { LoginService } from './login.service';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class LoginController {
  constructor(private authService: LoginService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @UseGuards(AuthGuard)
  @Get('users')
  getProfile(@Request() req) {
    return req.user;
  }
}
