import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AppwriteModule } from 'src/integrations/appwrite/appwrite.module';
import { AppwriteSessionGuard } from '../shared/guards/session.guard';

@Module({
  imports: [AppwriteModule],
  controllers: [AuthController],
  providers: [AuthService, AppwriteSessionGuard],
})
export class AuthModule {}
