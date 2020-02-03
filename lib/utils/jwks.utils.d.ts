export declare class JwksUtils {
    static prepadSigned(hexStr: string): string;
    static toHex(number: number): string;
    static encodeLengthHex(n: number): string;
    static rsaPublicKeyToPEM(modulusB64: any, exponentB64: any): string;
}
