import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {

  }

  @Post('/login')
  async login(@Res({ passthrough: true }) response: Response) {
    const anonymousSession = await this.authService.login();
    response.cookie('auth_token', anonymousSession['userId'], {});
    return anonymousSession;
  }

  @Post('/register')
  async register(@Req() request: Request, @Body() data: {email: string, password: string, name: string}) {
    const token = request.cookies['auth_token']; // Access the token from the cookie

    return this.authService.register(token, data);
  }
}
