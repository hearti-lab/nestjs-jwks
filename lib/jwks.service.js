"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const utils_1 = require("./utils");
const constants_1 = require("./constants");
let JwksService = class JwksService {
    constructor(options) {
        const { jwksSecretData } = options || { jwksSecretData: { keys: [] } };
        this.keys = jwksSecretData && jwksSecretData.keys;
    }
    jwtSecret(token) {
        const decoded = utils_1.JwtUtils.decode(token, { complete: true });
        if (!decoded || !decoded.header || decoded.header.alg !== 'RS256') {
            throw new common_1.UnauthorizedException('TOKEN_ERROR');
        }
        return this.getSigningKey(decoded.header.kid).publicKey;
    }
    getSigningKeys() {
        return this.keys
            .filter((key) => {
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
            .map((key) => {
            return {
                kid: key.kid,
                publicKey: utils_1.JwksUtils.rsaPublicKeyToPEM(key.n, key.e)
            };
        });
    }
    getSigningKey(kid) {
        const keys = this.getSigningKeys();
        const key = keys.find((k) => k.kid === kid);
        if (!key) {
            throw new common_1.UnauthorizedException('TOKEN_ERROR');
        }
        return key;
    }
};
JwksService = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject(constants_1.JWKS_MODULE_OPTIONS)),
    __metadata("design:paramtypes", [Object])
], JwksService);
exports.JwksService = JwksService;
//# sourceMappingURL=jwks.service.js.map