import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { SessionGuard } from '../shared/guards/session.guard';
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {

  }

  @Post('/login')
  async login(@Res({ passthrough: true }) response: Response) {
    const token = await this.authService.login();
    response.cookie('auth_token', token, {});
    return { status: 200, message: 'Successfully created anonymous session' };
  }

  @SessionGuard()
  @Post('/register')
  async register(@Req() request: Request, @Body() data: {email: string, password: string, name: string}) {
    const user = request.user;

    return this.authService.register(user.$id, data);
  }
}
