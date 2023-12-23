import { Controller, Post, Request, UseGuards, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';


@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req: any): Promise<any> {
    return this.authService.login(req.user);
  }

  @UseGuards(AuthGuard('local'))
  @Post('refresh-token')
  async refreshToken(@Request() req: any): Promise<any> {
    return this.authService.refreshToken(req.headers.authorization);
  } 
}