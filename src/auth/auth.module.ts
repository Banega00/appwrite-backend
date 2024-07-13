import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AppwriteModule } from 'src/integrations/appwrite/appwrite.module';

@Module({
  imports: [AppwriteModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
