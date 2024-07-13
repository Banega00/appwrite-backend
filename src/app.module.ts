import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SharedModule } from './shared/shared.module';
import { AppwriteModule } from './integrations/appwrite/appwrite.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { ClsModule } from 'nestjs-cls';
@Module({
  imports: [SharedModule, AuthModule, ConfigModule.forRoot(), AuthModule,
    ClsModule.forRoot({
      global: true,
      middleware: { mount: true },
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
