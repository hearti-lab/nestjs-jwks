import { DynamicModule } from '@nestjs/common';
import { JwksModuleOptions } from './interfaces';
export declare class JwksModule {
    static register(options: JwksModuleOptions): DynamicModule;
}
