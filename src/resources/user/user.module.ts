import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AppwriteModule } from '../../../src/integrations/appwrite/appwrite.module';

@Module({
  imports: [AppwriteModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
