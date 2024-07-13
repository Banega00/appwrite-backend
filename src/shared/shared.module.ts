//generate shared module in nestjs

import { Global, Module } from '@nestjs/common';
import { ConfigService } from './config/config.service';
import { HeleprsService } from './helpers/helpers.service';
import { ContextService } from './context/context.service';
import { ClsModule } from 'nestjs-cls';

@Global()
@Module({
    imports: [ClsModule],
    controllers: [],
    providers: [ConfigService, HeleprsService, ContextService],
    exports: [ConfigService, HeleprsService, ContextService],
})
export class SharedModule { }