"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var JwksModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const constants_1 = require("./constants");
const jwks_service_1 = require("./jwks.service");
let JwksModule = JwksModule_1 = class JwksModule {
    static register(options) {
        return {
            module: JwksModule_1,
            providers: [
                {
                    provide: constants_1.JWKS_MODULE_OPTIONS,
                    useValue: options
                },
                jwks_service_1.JwksService
            ],
            exports: [jwks_service_1.JwksService]
        };
    }
    static registerAsync(options) {
        return {
            imports: options.imports,
            module: JwksModule_1,
            providers: [
                {
                    provide: constants_1.JWKS_MODULE_OPTIONS,
                    useFactory: options.useFactory,
                    inject: options.inject
                },
                jwks_service_1.JwksService
            ],
            exports: [jwks_service_1.JwksService]
        };
    }
};
JwksModule = JwksModule_1 = __decorate([
    common_1.Module({})
], JwksModule);
exports.JwksModule = JwksModule;
//# sourceMappingURL=module.js.map