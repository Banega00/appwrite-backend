import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { SessionGuard } from '../shared/guards/session.guard';
import { ApiCookieAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { RegisterUserDto } from './dto/register-user.dto';
import { CustomLoggingService } from 'src/shared/logger/logger.service';
@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly logger: CustomLoggingService,
  ) {}

  @ApiOperation({ summary: 'Login user and creates an anonymous session', description: 'Login user and creates an anonymous session' })
  @ApiResponse({ status: 201, description: 'Successfully created anonymous session' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @Post('/login')
  async login(@Res({ passthrough: true }) response: Response) {
    const session = await this.authService.login();
    response.cookie('auth_token', session.secret, {
      httpOnly: true,
      sameSite: 'none',
      expires: new Date(session.expire),
    });
    this.logger.log('Successfully created anonymous session ✅');
    return { status: 201, message: 'Successfully created anonymous session' };
  }

  @ApiOperation({ summary: 'Register user', description: 'Upgrades anonymous session with real user data' })
  @ApiResponse({ status: 201, description: 'Successfully created anonymous session' })
  @ApiResponse({ status: 400, description: 'Invalid payload' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @ApiCookieAuth('auth_token')
  @SessionGuard()
  @Post('/register')
  async register(@Req() request: Request, @Body() body: RegisterUserDto) {
    const user = request.user;
    const registeredUser = await this.authService.register(user.$id, body);
    this.logger.log('Successfully registered user ✅');
    return { status: 201, message: 'Successfully registered user', user: { name: registeredUser.name, email: registeredUser.email } };
  }
}
