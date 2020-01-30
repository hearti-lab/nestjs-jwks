/// <reference types="node" />
import { Secret, SignOptions, VerifyOptions, DecodeOptions } from 'jsonwebtoken';
export declare class JwtUtils {
    static sign(payload: any, secretOrPrivateKey: Secret, options?: SignOptions): Promise<string>;
    static decode(token: string, options?: DecodeOptions): any;
    static verify(token: string, secretOrPublicKey: string | Buffer, options?: VerifyOptions): Promise<object | string>;
}
