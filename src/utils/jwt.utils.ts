import { Secret, sign, SignOptions, decode, verify, VerifyOptions, DecodeOptions } from 'jsonwebtoken';

export class JwtUtils {
    static async sign(payload: any, secretOrPrivateKey: Secret, options?: SignOptions): Promise<string> {
        return new Promise((resolve, reject) => {
            sign(payload, secretOrPrivateKey, options, (error: Error, encoded: string) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(encoded);
                }
            });
        });
    }

    static decode(token: string, options?: DecodeOptions): any {
        return decode(token, options);
    }

    static async verify(
        token: string,
        secretOrPublicKey: string | Buffer,
        options?: VerifyOptions
    ): Promise<object | string> {
        return new Promise((resolve, reject) => {
            verify(token, secretOrPublicKey, options, (error: Error, decoded: any) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(decoded);
                }
            });
        });
    }
}
