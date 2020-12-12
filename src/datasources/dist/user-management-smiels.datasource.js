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
exports.__esModule = true;
exports.UserManagementSmielsDataSource = void 0;
var core_1 = require("@loopback/core");
var repository_1 = require("@loopback/repository");
var config = {
    name: 'UserManagement_SMIELS',
    connector: 'postgresql',
    url: 'postgres://smiels:F4d1a6e0@localhost/UserManagement_SMIELS',
    host: 'localhost',
    port: 5432,
    user: 'smiels',
    password: 'F4d1a6e0',
    database: 'UserManagement_SMIELS'
};
function updateConfig(dsConfig) {
    if (process.env.NODE_ENV) {
        dsConfig.name = process.env.POSTGRESQL_DB;
        dsConfig.connector = 'postgresql';
        dsConfig.url = process.env.POSTGRESQL_URI;
        dsConfig.host = process.env.POSTGRESQL_HOST;
        dsConfig.port = process.env.POSTGRESQL_PORT;
        dsConfig.user = process.env.POSTGRESQL_USER;
        dsConfig.password = process.env.POSTGRESQL_PASSWORD;
        dsConfig.database = process.env.POSTGRESQL_DB;
    }
    return dsConfig;
}
var UserManagementSmielsDataSource = /** @class */ (function (_super) {
    __extends(UserManagementSmielsDataSource, _super);
    function UserManagementSmielsDataSource(dsConfig) {
        if (dsConfig === void 0) { dsConfig = config; }
        return _super.call(this, updateConfig(dsConfig)) || this;
    }
    /**
     * Disconnect the datasource when application is stopped. This allows the
     * application to be shut down gracefully.
     */
    UserManagementSmielsDataSource.prototype.stop = function () {
        return _super.prototype.disconnect.call(this);
    };
    UserManagementSmielsDataSource.dataSourceName = 'UserManagement_SMIELS';
    UserManagementSmielsDataSource.defaultConfig = config;
    UserManagementSmielsDataSource = __decorate([
        core_1.lifeCycleObserver('datasource'),
        __param(0, core_1.inject('datasources.config.UserManagement_SMIELS', { optional: true }))
    ], UserManagementSmielsDataSource);
    return UserManagementSmielsDataSource;
}(repository_1.juggler.DataSource));
exports.UserManagementSmielsDataSource = UserManagementSmielsDataSource;
