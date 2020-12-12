"use strict";
// Copyright IBM Corp. 2020. All Rights Reserved.
// Node module: loopback4-example-shopping
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
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
exports.UserManagementService = void 0;
var context_1 = require("@loopback/context");
var repository_1 = require("@loopback/repository");
var rest_1 = require("@loopback/rest");
var security_1 = require("@loopback/security");
var lodash_1 = require("lodash");
var keys_1 = require("../../keys");
var repositories_1 = require("../../repositories");
var UserManagementService = /** @class */ (function () {
    function UserManagementService(userRepository, rolePermissionsRepository, userRolesRepository, passwordHasher) {
        this.userRepository = userRepository;
        this.rolePermissionsRepository = rolePermissionsRepository;
        this.userRolesRepository = userRolesRepository;
        this.passwordHasher = passwordHasher;
    }
    UserManagementService.prototype.verifyCredentials = function (credentials) {
        return __awaiter(this, void 0, Promise, function () {
            var email, password, invalidCredentialsError, foundUser, credentialsFound, passwordMatched;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        email = credentials.email, password = credentials.password;
                        invalidCredentialsError = 'Invalid email or password.';
                        if (!email) {
                            throw new rest_1.HttpErrors.Unauthorized(invalidCredentialsError);
                        }
                        return [4 /*yield*/, this.userRepository.findOne({
                                where: { email: credentials.email.toLowerCase() }
                            })];
                    case 1:
                        foundUser = _a.sent();
                        if (!foundUser) {
                            throw new rest_1.HttpErrors.Unauthorized(invalidCredentialsError);
                        }
                        if (!foundUser.isActive) {
                            throw new rest_1.HttpErrors.Unauthorized('user is not active');
                        }
                        if (foundUser.isDeleted) {
                            throw new rest_1.HttpErrors.Unauthorized('user not found.');
                        }
                        return [4 /*yield*/, this.userRepository.findCredentials(foundUser.id)];
                    case 2:
                        credentialsFound = _a.sent();
                        if (!credentialsFound) {
                            throw new rest_1.HttpErrors.Unauthorized(invalidCredentialsError);
                        }
                        return [4 /*yield*/, this.passwordHasher.comparePassword(password, credentialsFound.password)];
                    case 3:
                        passwordMatched = _a.sent();
                        if (!passwordMatched) {
                            throw new rest_1.HttpErrors.Unauthorized(invalidCredentialsError);
                        }
                        // add entry to login time.
                        return [4 /*yield*/, this.userRepository.updateById(foundUser.id, { lastLogin: new Date() })];
                    case 4:
                        // add entry to login time.
                        _a.sent();
                        // pass the valid user.
                        return [2 /*return*/, foundUser];
                }
            });
        });
    };
    UserManagementService.prototype.verifyNewUserRequest = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var foundUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userRepository.findOne({
                            where: { email: user.email.toLowerCase() }
                        })];
                    case 1:
                        foundUser = _a.sent();
                        if (foundUser) {
                            throw new rest_1.HttpErrors.Conflict('User with this Email already exist!.');
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    UserManagementService.prototype.convertToUserProfile = function (tenantId, companyName, user, roles) {
        return __awaiter(this, void 0, Promise, function () {
            var userName;
            var _a;
            return __generator(this, function (_b) {
                userName = '';
                if (user.firstName)
                    userName = "" + user.firstName;
                if (user.lastName)
                    userName = user.firstName
                        ? userName + " " + user.lastName
                        : "" + user.lastName;
                return [2 /*return*/, (_a = {},
                        _a[security_1.securityId] = user.id,
                        _a.name = userName,
                        _a.id = user.id,
                        _a.companyId = user.companyId,
                        _a.companyName = companyName,
                        _a.tenantId = tenantId,
                        _a.permissions = roles,
                        _a)];
            });
        });
    };
    UserManagementService.prototype.createUser = function (userWithPassword) {
        return __awaiter(this, void 0, Promise, function () {
            var password, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.verifyNewUserRequest(userWithPassword)];
                    case 1:
                        _a.sent();
                        // make admin field false.
                        if (!userWithPassword.isAdmin)
                            userWithPassword.isAdmin = false;
                        userWithPassword.joinDate = new Date();
                        userWithPassword.username = userWithPassword.email.toLowerCase();
                        userWithPassword.email = userWithPassword.email.toLowerCase();
                        userWithPassword.isActive = true;
                        return [4 /*yield*/, this.passwordHasher.hashPassword(userWithPassword.password)];
                    case 2:
                        password = _a.sent();
                        userWithPassword.password = password;
                        return [4 /*yield*/, this.userRepository.create(lodash_1["default"].omit(userWithPassword, 'password'))];
                    case 3:
                        user = _a.sent();
                        user.id = user.id.toString();
                        return [4 /*yield*/, this.userRepository.userCredentials(user.id).create({ password: password })];
                    case 4:
                        _a.sent();
                        // add roles to newly created user
                        return [4 /*yield*/, this.createUserRolesByRoleId(user.id, user.roleId)];
                    case 5:
                        // add roles to newly created user
                        _a.sent();
                        return [2 /*return*/, user];
                }
            });
        });
    };
    // assign roles to users using Roles table which is linked to RolePermission
    // you need to pass roleId and userId.
    UserManagementService.prototype.createUserRolesByRoleId = function (userId, roleId) {
        return __awaiter(this, void 0, Promise, function () {
            var count, rolepersmission, _i, rolepersmission_1, r, found, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        count = 0;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 9, , 10]);
                        return [4 /*yield*/, this.userRolesRepository.deleteAll({ userId: userId })
                            // get all role permissions with sub app feature id
                        ];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.rolePermissionsRepository.find({
                                where: { rolesId: roleId }
                            })];
                    case 3:
                        rolepersmission = _a.sent();
                        _i = 0, rolepersmission_1 = rolepersmission;
                        _a.label = 4;
                    case 4:
                        if (!(_i < rolepersmission_1.length)) return [3 /*break*/, 8];
                        r = rolepersmission_1[_i];
                        return [4 /*yield*/, this.userRolesRepository.findOne({
                                where: { userId: userId, rolePermissionsId: r.id, appFeaturesOneSId: r.appFeaturesOneSId }
                            })];
                    case 5:
                        found = _a.sent();
                        if (!!found) return [3 /*break*/, 7];
                        count += 1;
                        return [4 /*yield*/, this.userRepository.userRoles(userId).create({
                                rolePermissionsId: r.id,
                                appFeaturesOneSId: r.appFeaturesOneSId
                            })];
                    case 6:
                        _a.sent();
                        _a.label = 7;
                    case 7:
                        _i++;
                        return [3 /*break*/, 4];
                    case 8: return [3 /*break*/, 10];
                    case 9:
                        e_1 = _a.sent();
                        throw new rest_1.HttpErrors.UnprocessableEntity("Error Happened while assigning roles");
                    case 10: return [2 /*return*/, { count: count }];
                }
            });
        });
    };
    // update password
    UserManagementService.prototype.resetPassword = function (userId, password) {
        return __awaiter(this, void 0, Promise, function () {
            var passwordHash;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.passwordHasher.hashPassword(password)];
                    case 1:
                        passwordHash = _a.sent();
                        return [2 /*return*/, this.userRepository
                                .userCredentials(userId)
                                .patch({ password: passwordHash })];
                }
            });
        });
    };
    UserManagementService = __decorate([
        __param(0, repository_1.repository(repositories_1.UserRepository)),
        __param(1, repository_1.repository(repositories_1.RolePermissionsRepository)),
        __param(2, repository_1.repository(repositories_1.UserRolesRepository)),
        __param(3, context_1.inject(keys_1.PasswordHasherBindings.PASSWORD_HASHER))
    ], UserManagementService);
    return UserManagementService;
}());
exports.UserManagementService = UserManagementService;
