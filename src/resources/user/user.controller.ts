import { Controller, Get, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { SessionGuard } from 'src/shared/guards/session.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @SessionGuard()
  @Get()
  getUser(@Req() request){
    const {email, name} = request.user;
    return {email, name};
  }
}
