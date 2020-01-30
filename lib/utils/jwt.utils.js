"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
class JwtUtils {
    static async sign(payload, secretOrPrivateKey, options) {
        return new Promise((resolve, reject) => {
            jsonwebtoken_1.sign(payload, secretOrPrivateKey, options, (error, encoded) => {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(encoded);
                }
            });
        });
    }
    static decode(token, options) {
        return jsonwebtoken_1.decode(token, options);
    }
    static async verify(token, secretOrPublicKey, options) {
        return new Promise((resolve, reject) => {
            jsonwebtoken_1.verify(token, secretOrPublicKey, options, (error, decoded) => {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(decoded);
                }
            });
        });
    }
}
exports.JwtUtils = JwtUtils;
//# sourceMappingURL=jwt.utils.js.map