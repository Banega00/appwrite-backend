import { Controller, Get, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { SessionGuard } from 'src/shared/guards/session.guard';
import { ApiCookieAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Get user', description: 'Get user data from its session cookie' })
  @ApiResponse({ status: 200, description: 'User email and name' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @ApiCookieAuth('auth_token')
  @SessionGuard()
  @Get()
  getUser(@Req() request) {
    const { email, name } = request.user;
    return { email, name };
  }
}
