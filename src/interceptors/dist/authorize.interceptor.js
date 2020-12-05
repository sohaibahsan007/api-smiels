"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.AuthorizationInterceptor = void 0;
var authentication_1 = require("@loopback/authentication");
var context_1 = require("@loopback/context");
var rest_1 = require("@loopback/rest");
var keys_1 = require("../keys");
/**
 * This class will be bound to the application as an `Interceptor` during
 * `boot`
 */
var AuthorizationInterceptor = /** @class */ (function () {
    function AuthorizationInterceptor(metadata, checkPermissons, getCurrentUser) {
        this.metadata = metadata;
        this.checkPermissons = checkPermissons;
        this.getCurrentUser = getCurrentUser;
    }
    /**
     * This method is used by LoopBack context to produce an interceptor function
     * for the binding.
     *
     * @returns An interceptor function
     */
    AuthorizationInterceptor.prototype.value = function () {
        return this.intercept.bind(this);
    };
    /**
     * The logic to intercept an invocation
     * @param invocationCtx - Invocation context
     * @param next - A function to invoke next interceptor or the target method
     */
    AuthorizationInterceptor.prototype.intercept = function (invocationCtx, next) {
        return __awaiter(this, void 0, void 0, function () {
            var result, requiredPermissions, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log(this.metadata);
                        if (!this.metadata)
                            return [2 /*return*/, next()];
                        return [4 /*yield*/, next()];
                    case 1:
                        result = _a.sent();
                        requiredPermissions = this.metadata.options;
                        console.log(requiredPermissions);
                        return [4 /*yield*/, this.getCurrentUser()];
                    case 2:
                        user = _a.sent();
                        if (!this.checkPermissons(user.permissions, requiredPermissions)) {
                            throw new rest_1.HttpErrors.Forbidden('INVALID_ACCESS_PERMISSION');
                        }
                        return [2 /*return*/, result];
                }
            });
        });
    };
    AuthorizationInterceptor = __decorate([
        context_1.globalInterceptor('', { tags: { name: 'authorize' } }),
        __param(0, context_1.inject(authentication_1.AuthenticationBindings.METADATA)),
        __param(1, context_1.inject(keys_1.AuthServiceBindings.USER_PERMISSIONS)),
        __param(2, context_1.inject.getter(authentication_1.AuthenticationBindings.CURRENT_USER))
    ], AuthorizationInterceptor);
    return AuthorizationInterceptor;
}());
exports.AuthorizationInterceptor = AuthorizationInterceptor;
