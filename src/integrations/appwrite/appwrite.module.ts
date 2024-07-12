import { Module } from '@nestjs/common';
import { AppwriteService } from './appwrite.service';

@Module({
  controllers: [],
  providers: [AppwriteService],
  exports: [AppwriteService],
})
export class AppwriteModule {}
