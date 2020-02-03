"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class JwksUtils {
    static prepadSigned(hexStr) {
        const msb = hexStr[0];
        if (msb < '0' || msb > '7') {
            return `00${hexStr}`;
        }
        return hexStr;
    }
    static toHex(number) {
        const nstr = number.toString(16);
        if (nstr.length % 2) {
            return `0${nstr}`;
        }
        return nstr;
    }
    static encodeLengthHex(n) {
        if (n <= 127) {
            return JwksUtils.toHex(n);
        }
        const nHex = JwksUtils.toHex(n);
        const lengthOfLengthByte = 128 + nHex.length / 2;
        return JwksUtils.toHex(lengthOfLengthByte) + nHex;
    }
    static rsaPublicKeyToPEM(modulusB64, exponentB64) {
        const modulus = Buffer.from(modulusB64, 'base64');
        const exponent = Buffer.from(exponentB64, 'base64');
        const modulusHex = JwksUtils.prepadSigned(modulus.toString('hex'));
        const exponentHex = JwksUtils.prepadSigned(exponent.toString('hex'));
        const modlen = modulusHex.length / 2;
        const explen = exponentHex.length / 2;
        const encodedModlen = JwksUtils.encodeLengthHex(modlen);
        const encodedExplen = JwksUtils.encodeLengthHex(explen);
        const encodedPubkey = '30' +
            JwksUtils.encodeLengthHex(modlen + explen + encodedModlen.length / 2 + encodedExplen.length / 2 + 2) +
            '02' +
            encodedModlen +
            modulusHex +
            '02' +
            encodedExplen +
            exponentHex;
        const der = Buffer.from(encodedPubkey, 'hex').toString('base64');
        let pem = `-----BEGIN RSA PUBLIC KEY-----\n`;
        pem += `${der.match(/.{1,64}/g).join('\n')}`;
        pem += `\n-----END RSA PUBLIC KEY-----\n`;
        return pem;
    }
}
exports.JwksUtils = JwksUtils;
//# sourceMappingURL=jwks.utils.js.map