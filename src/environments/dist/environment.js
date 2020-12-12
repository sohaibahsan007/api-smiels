"use strict";
var _a, _b, _c, _d, _e;
exports.__esModule = true;
exports.environment = void 0;
exports.environment = {
    noreplyEmail: 'noreply@smiels.com',
    supportEmail: 'support@smiels.com',
    isDevelopment: (_a = process.env.PRODUCTION) !== null && _a !== void 0 ? _a : true,
    webUrl: (_b = process.env.WEBURL) !== null && _b !== void 0 ? _b : 'localhost:4200/#/',
    sendGridKey: (_c = process.env.SENDGRIDKEY) !== null && _c !== void 0 ? _c : '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',
    jwt: {
        jwtExpiresIn: (_d = process.env.JWTEXPIRESIN) !== null && _d !== void 0 ? _d : '14400',
        secret: (_e = process.env.JWTSECRET) !== null && _e !== void 0 ? _e : 'MIIBIzANBgkqhkiG9w0BAQEFAAOCARAAMIIBCwKCAQIAi6oIpBoHT9M0XD5Xc6XN'
    }
};
