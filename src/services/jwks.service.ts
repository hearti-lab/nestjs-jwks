import { Inject, Injectable } from '@nestjs/common';
import { Secret } from 'jsonwebtoken';
import { JWKS_MODULE_OPTIONS } from '../constants';
import { IJwksService, Jwk, Jwks, JwksModuleOptions } from '../interfaces';
import { JwksUtils, JwtUtils } from '../utils';

@Injectable()
export class JwksService implements IJwksService {
    private readonly keys: Jwks[];

    constructor(@Inject(JWKS_MODULE_OPTIONS) options: JwksModuleOptions) {
        this.keys = this.getSigningKeys(options.keys || []);
    }

    public getJwtSecret(token: string): Secret {
        const decoded = JwtUtils.decode(token, { complete: true });
        // Only RS256 is supported.
        if (!decoded || !decoded.header || decoded.header.alg !== 'RS256') {
            throw new Error('The token is invalid format');
        }

        return this.getSigningKey(decoded.header.kid).publicKey;
    }

    private getSigningKeys(jwk: Jwk[]): Jwks[] {
        return jwk
            .filter((item) => {
                if (item.kty !== 'RSA') {
                    return false;
                }
                if (!item.kid) {
                    return false;
                }
                if (item.hasOwnProperty('use') && item.use !== 'sig') {
                    return false;
                }
                return item.n && item.e;
            })
            .map((item) => {
                return {
                    kid: item.kid,
                    publicKey: JwksUtils.rsaPublicKeyToPEM(item.n, item.e)
                };
            });
    }

    private getSigningKey(kid: string): Jwks {
        const key = this.keys.find((item) => item.kid === kid);
        if (!key) {
            throw new Error('The Jwks did not contain any keys');
        }
        return key;
    }
}
