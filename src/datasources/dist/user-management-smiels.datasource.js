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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e, _f, _g;
exports.__esModule = true;
exports.UserManagementSmielsDataSource = void 0;
var core_1 = require("@loopback/core");
var repository_1 = require("@loopback/repository");
var dbConfig = {
    name: (_a = process.env.POSTGRESQL_DB) !== null && _a !== void 0 ? _a : 'UserManagement_SMIELS',
    connector: 'postgresql',
    url: (_b = process.env.POSTGRESQL_URI) !== null && _b !== void 0 ? _b : 'postgres://smiels:F4d1a6e0@localhost/UserManagement_SMIELS',
    host: (_c = process.env.POSTGRESQL_HOST) !== null && _c !== void 0 ? _c : 'localhost',
    port: (_d = process.env.POSTGRESQL_PORT) !== null && _d !== void 0 ? _d : 5432,
    user: (_e = process.env.POSTGRESQL_USER) !== null && _e !== void 0 ? _e : 'smiels',
    password: (_f = process.env.POSTGRESQL_PASSWORD) !== null && _f !== void 0 ? _f : 'F4d1a6e0',
    database: (_g = process.env.POSTGRESQL_DB) !== null && _g !== void 0 ? _g : 'UserManagement_SMIELS'
};
var UserManagementSmielsDataSource = /** @class */ (function (_super) {
    __extends(UserManagementSmielsDataSource, _super);
    function UserManagementSmielsDataSource(dsConfig) {
        if (dsConfig === void 0) { dsConfig = dbConfig; }
        return _super.call(this, dsConfig) || this;
    }
    /**
     * Disconnect the datasource when application is stopped. This allows the
     * application to be shut down gracefully.
     */
    UserManagementSmielsDataSource.prototype.stop = function () {
        return _super.prototype.disconnect.call(this);
    };
    UserManagementSmielsDataSource.dataSourceName = 'UserManagement_SMIELS';
    UserManagementSmielsDataSource.defaultConfig = dbConfig;
    UserManagementSmielsDataSource = __decorate([
        core_1.lifeCycleObserver('datasource'),
        __param(0, core_1.inject('datasources.config.UserManagement_SMIELS', { optional: true }))
    ], UserManagementSmielsDataSource);
    return UserManagementSmielsDataSource;
}(repository_1.juggler.DataSource));
exports.UserManagementSmielsDataSource = UserManagementSmielsDataSource;
