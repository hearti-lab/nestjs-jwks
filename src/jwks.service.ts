import { UnauthorizedException, Injectable, Inject } from '@nestjs/common';
import { JwtUtils, JwksUtils } from './utils';
import { Jwks } from './jwks';
import { Secret } from 'jsonwebtoken';
import { JWKS_MODULE_OPTIONS } from './constants';
import { JwksModuleOptions } from './interfaces';

@Injectable()
export class JwksService {
    private readonly keys: { [key: string]: any }[];

    constructor(@Inject(JWKS_MODULE_OPTIONS) options: JwksModuleOptions) {
        const { jwksSecretData } = options || { jwksSecretData: { keys: [] } };
        this.keys = jwksSecretData && jwksSecretData.keys;
    }

    jwtSecret(token: string): Secret {
        const decoded = JwtUtils.decode(token, { complete: true });
        // Only RS256 is supported.
        if (!decoded || !decoded.header || decoded.header.alg !== 'RS256') {
            throw new UnauthorizedException('TOKEN_ERROR');
        }
        return this.getSigningKey(decoded.header.kid).publicKey;
    }

    getSigningKeys(): Jwks[] {
        return this.keys
            .filter((key: any) => {
                if (key.kty !== 'RSA') {
                    return false;
                }
                if (!key.kid) {
                    return false;
                }
                if (key.hasOwnProperty('use') && key.use !== 'sig') {
                    return false;
                }
                return key.n && key.e;
            })
            .map((key: any) => {
                return {
                    kid: key.kid,
                    publicKey: JwksUtils.rsaPublicKeyToPEM(key.n, key.e)
                };
            });
    }

    getSigningKey(kid: string): Jwks {
        const keys = this.getSigningKeys();
        const key = keys.find((k: any) => k.kid === kid);
        if (!key) {
            throw new UnauthorizedException('TOKEN_ERROR');
        }
        return key;
    }
}
