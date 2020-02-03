import { Jwks } from './jwks';
import { Secret } from 'jsonwebtoken';
import { JwksModuleOptions } from './interfaces';
export declare class JwksService {
    private readonly keys;
    constructor(options: JwksModuleOptions);
    jwtSecret(token: string): Secret;
    getSigningKeys(): Jwks[];
    getSigningKey(kid: string): Jwks;
}
