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
exports.CompanyUserController = void 0;
var authentication_1 = require("@loopback/authentication");
var core_1 = require("@loopback/core");
var repository_1 = require("@loopback/repository");
var rest_1 = require("@loopback/rest");
var security_1 = require("@loopback/security");
var keys_1 = require("../../keys");
var models_1 = require("../../models");
var repositories_1 = require("../../repositories");
// parent authenticate.
var CompanyUserController = /** @class */ (function () {
    function CompanyUserController(companyRepository, currentUserProfile, userManagementService, emailService) {
        this.companyRepository = companyRepository;
        this.currentUserProfile = currentUserProfile;
        this.userManagementService = userManagementService;
        this.emailService = emailService;
    }
    CompanyUserController.prototype.find = function (filter) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.companyRepository.users(this.currentUserProfile.companyId).find(filter)];
            });
        });
    };
    CompanyUserController.prototype.create = function (user) {
        return __awaiter(this, void 0, Promise, function () {
            var password, newuser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        user.companyId = this.currentUserProfile.companyId;
                        password = user.password;
                        return [4 /*yield*/, this.userManagementService.createUser(user)];
                    case 1:
                        newuser = _a.sent();
                        // re-assign password.
                        user.password = password;
                        return [4 /*yield*/, this.emailService.sendNewMemberEmail(user)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, newuser];
                }
            });
        });
    };
    CompanyUserController.prototype.patch = function (user, id) {
        return __awaiter(this, void 0, Promise, function () {
            var password, count;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        password = user === null || user === void 0 ? void 0 : user.password;
                        delete user.password;
                        return [4 /*yield*/, this.companyRepository.users(this.currentUserProfile.companyId).patch(user, { id: id })];
                    case 1:
                        count = _a.sent();
                        if (!password) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.userManagementService.resetPassword(id, password)];
                    case 2:
                        count = _a.sent();
                        _a.label = 3;
                    case 3: return [2 /*return*/, count];
                }
            });
        });
    };
    CompanyUserController.prototype["delete"] = function (id) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.companyRepository.deleteSoft(this.currentUserProfile.companyId, id)];
            });
        });
    };
    __decorate([
        authentication_1.authenticate({ strategy: 'jwt', options: { "required": ["UserRA" /* UserReadAll */] } }),
        rest_1.get('/company/users', {
            responses: {
                '200': {
                    description: 'Array of Company has many User',
                    content: {
                        'application/json': {
                            schema: { type: 'array', items: rest_1.getModelSchemaRef(models_1.User) }
                        }
                    }
                }
            }
        }),
        __param(0, rest_1.param.query.object('filter'))
    ], CompanyUserController.prototype, "find");
    __decorate([
        authentication_1.authenticate({ strategy: 'jwt', options: { "required": ["UserC" /* UserCreate */] } }),
        rest_1.post('/company/users', {
            responses: {
                '200': {
                    description: 'Company model instance',
                    content: { 'application/json': { schema: rest_1.getModelSchemaRef(models_1.User) } }
                }
            }
        }),
        __param(0, rest_1.requestBody({
            content: {
                'application/json': {
                    schema: rest_1.getModelSchemaRef(models_1.UserWithPassword, {
                        title: 'NewUserInCompany',
                        exclude: ['id', 'companyId', 'isAdmin', 'emailVerified', 'joinDate', 'username', 'isDeleted']
                    })
                }
            }
        }))
    ], CompanyUserController.prototype, "create");
    __decorate([
        authentication_1.authenticate({ strategy: 'jwt', options: { "required": ["UserUA" /* UserUpdateAll */] } }),
        rest_1.patch('/company/users/{id}', {
            responses: {
                '200': {
                    description: 'Company.User PATCH success count',
                    content: { 'application/json': { schema: repository_1.CountSchema } }
                }
            }
        }),
        __param(0, rest_1.requestBody({
            content: {
                'application/json': {
                    schema: rest_1.getModelSchemaRef(models_1.UserWithPassword, {
                        exclude: ['companyId', 'isAdmin', 'email', 'emailVerified', 'joinDate', 'username', 'isDeleted', 'userRoles', 'userCredentials'],
                        partial: true
                    })
                }
            }
        })),
        __param(1, rest_1.param.path.string('id'))
    ], CompanyUserController.prototype, "patch");
    __decorate([
        authentication_1.authenticate({ strategy: 'jwt', options: { "required": ["UserD" /* UserDelete */] } }),
        rest_1.del('/company/users/{id}', {
            responses: {
                '200': {
                    description: 'Company.User DELETE success count',
                    content: { 'application/json': { schema: repository_1.CountSchema } }
                }
            }
        }),
        __param(0, rest_1.param.path.string('id'))
    ], CompanyUserController.prototype, "delete");
    CompanyUserController = __decorate([
        authentication_1.authenticate('jwt'),
        __param(0, repository_1.repository(repositories_1.CompanyRepository)),
        __param(1, core_1.inject(security_1.SecurityBindings.USER)),
        __param(2, core_1.inject(keys_1.UserServiceBindings.USER_MANAGEMENT)),
        __param(3, core_1.inject(keys_1.EmailManagerBindings.SEND_MAIL))
    ], CompanyUserController);
    return CompanyUserController;
}());
exports.CompanyUserController = CompanyUserController;
