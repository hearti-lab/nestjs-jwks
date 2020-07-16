import { DynamicModule, Module } from '@nestjs/common';
import { JwksServiceToken, JWKS_MODULE_OPTIONS } from './constants';
import { JwksModuleAsyncOptions, JwksModuleOptions } from './interfaces';
import { JwksService } from './services';

const providers = [
    {
        provide: JwksServiceToken,
        useClass: JwksService
    }
];

@Module({})
export class JwksModule {
    public static register(options: JwksModuleOptions): DynamicModule {
        return {
            module: JwksModule,
            providers: [
                {
                    provide: JWKS_MODULE_OPTIONS,
                    useValue: options
                },
                ...providers
            ],
            exports: [...providers]
        };
    }

    public static registerAsync(options: JwksModuleAsyncOptions): DynamicModule {
        return {
            imports: options.imports,
            module: JwksModule,
            providers: [
                {
                    provide: JWKS_MODULE_OPTIONS,
                    useFactory: options.useFactory,
                    inject: options.inject
                },
                ...providers
            ],
            exports: [...providers]
        };
    }
}
