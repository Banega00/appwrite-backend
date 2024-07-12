import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SharedModule } from './shared/shared.module';
import { AppwriteModule } from './integrations/appwrite/appwrite.module';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [SharedModule, AppwriteModule, ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
