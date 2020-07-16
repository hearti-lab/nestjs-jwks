import { JwksModuleOptions } from './jwks-module-options.interface';
import { ModuleMetadata } from '@nestjs/common/interfaces';

export interface JwksModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
    useFactory?: (...args: any[]) => Promise<JwksModuleOptions> | JwksModuleOptions;

    inject?: any[];
}
