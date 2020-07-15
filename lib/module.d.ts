import { DynamicModule } from '@nestjs/common';
import { JwksModuleOptions, JwksModuleAsyncOptions } from './interfaces';
export declare class JwksModule {
    static register(options: JwksModuleOptions): DynamicModule;
    static registerAsync(options: JwksModuleAsyncOptions): DynamicModule;
}
