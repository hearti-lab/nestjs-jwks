import { DynamicModule, Module } from '@nestjs/common';
import { JWKS_MODULE_OPTIONS } from './constants';
import { JwksService } from './jwks.service';
import { JwksModuleOptions } from './interfaces';

@Module({})
export class JwksModule {
    static register(options: JwksModuleOptions): DynamicModule {
        return {
            module: JwksModule,
            providers: [
                {
                    provide: JWKS_MODULE_OPTIONS,
                    useValue: options
                },
                JwksService
            ],
            exports: [JwksService]
        };
    }
}
