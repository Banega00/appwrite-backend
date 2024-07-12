//generate shared module in nestjs

import { Global, Module } from '@nestjs/common';
import { ConfigService } from './config/config.service';
import { HeleprsService } from './helpers/helpers.service';

@Global()
@Module({
    imports: [],
    controllers: [],
    providers: [ConfigService, HeleprsService],
})
export class SharedModule { }