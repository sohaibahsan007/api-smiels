"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.User = void 0;
var repository_1 = require("@loopback/repository");
var models_1 = require("../../models");
var User = /** @class */ (function (_super) {
    __extends(User, _super);
    function User(data) {
        return _super.call(this, data) || this;
    }
    __decorate([
        repository_1.property({
            type: 'string',
            id: true,
            defaultFn: 'uuid'
        })
    ], User.prototype, "id");
    __decorate([
        repository_1.property({
            type: 'string',
            required: true,
            length: 254,
            index: { unique: true },
            jsonSchema: {
                format: 'email',
                minLength: 4,
                maxLength: 254,
                transform: ['toLowerCase'],
                errorMessage: {
                    minLength: 'Email should be at least 4 characters.',
                    maxLength: 'Email should not exceed 254 characters.'
                }
            },
            postgresql: {
                dataType: 'character varying',
                dataLength: 254,
                dataPrecision: null,
                dataScale: null,
                nullable: 'NO'
            }
        })
    ], User.prototype, "email");
    __decorate([
        repository_1.property({
            type: 'boolean'
        })
    ], User.prototype, "emailVerified");
    __decorate([
        repository_1.property({
            type: 'string',
            index: { unique: true },
            length: 70,
            jsonSchema: {
                minLength: 4,
                maxLength: 70,
                transform: ['toLowerCase'],
                errorMessage: 'username should be between 04 and 70 characters.'
            },
            postgresql: {
                dataType: 'character varying',
                dataLength: 70,
                dataPrecision: null,
                dataScale: null,
                nullable: 'NO'
            }
        })
    ], User.prototype, "username");
    __decorate([
        repository_1.property({
            type: 'string',
            length: 20,
            jsonSchema: {
                minLength: 2,
                maxLength: 20,
                errorMessage: 'firstname should be between 02 and 20 characters.'
            },
            postgresql: {
                dataType: 'character varying',
                dataLength: 20,
                dataPrecision: null,
                dataScale: null,
                nullable: 'YES'
            }
        })
    ], User.prototype, "firstName");
    __decorate([
        repository_1.property({
            type: 'string',
            length: 20,
            jsonSchema: {
                minLength: 2,
                maxLength: 20,
                errorMessage: 'lastname should be between 02 and 20 characters.'
            },
            postgresql: {
                dataType: 'character varying',
                dataLength: 20,
                dataPrecision: null,
                dataScale: null,
                nullable: 'YES'
            }
        })
    ], User.prototype, "lastName");
    __decorate([
        repository_1.property({
            type: 'date',
            required: true,
            defaultFn: 'now'
        })
    ], User.prototype, "joinDate");
    __decorate([
        repository_1.property({
            type: 'boolean',
            "default": true
        })
    ], User.prototype, "isActive");
    __decorate([
        repository_1.property({
            type: 'boolean',
            "default": false
        })
    ], User.prototype, "isAdmin");
    __decorate([
        repository_1.property({
            type: 'boolean',
            "default": false
        })
    ], User.prototype, "isDeleted");
    __decorate([
        repository_1.property({
            type: 'date'
        })
    ], User.prototype, "lastLogin");
    __decorate([
        repository_1.property({
            type: 'date'
        })
    ], User.prototype, "failedAttemptTime");
    __decorate([
        repository_1.property({
            type: 'number'
        })
    ], User.prototype, "failedAttemptTry");
    __decorate([
        repository_1.hasOne(function () { return models_1.ContactDetail; })
    ], User.prototype, "contactDetail");
    __decorate([
        repository_1.hasOne(function () { return models_1.AddressDetail; })
    ], User.prototype, "addressDetail");
    __decorate([
        repository_1.property({
            type: 'string'
        })
    ], User.prototype, "companyId");
    __decorate([
        repository_1.hasMany(function () { return models_1.UserRoles; })
    ], User.prototype, "userRoles");
    __decorate([
        repository_1.hasOne(function () { return models_1.UserCredentials; })
    ], User.prototype, "userCredentials");
    __decorate([
        repository_1.property({
            type: 'number',
            required: true
        })
    ], User.prototype, "roleId");
    User = __decorate([
        repository_1.model({
            settings: {
                postgresql: { schema: 'public', table: 'Users' },
                indexes: {
                    uniqueEmail: {
                        keys: {
                            email: 1
                        },
                        options: {
                            unique: true
                        }
                    }
                }
            }
        })
    ], User);
    return User;
}(repository_1.Entity));
exports.User = User;
