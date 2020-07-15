import { DynamicModule, Module } from '@nestjs/common';
import { JWKS_MODULE_OPTIONS } from './constants';
import { JwksService } from './jwks.service';
import { JwksModuleOptions, JwksModuleAsyncOptions } from './interfaces';

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

    static registerAsync(options: JwksModuleAsyncOptions): DynamicModule {
        return {
            imports: options.imports,
            module: JwksModule,
            providers: [
                {
                    provide: JWKS_MODULE_OPTIONS,
                    useFactory: options.useFactory,
                    inject: options.inject
                },
                JwksService
            ],
            exports: [JwksService]
        };
    }
}
