

export const environment = {
  noreplyEmail: 'noreply@smiels.com',
  supportEmail: 'support@smiels.com',
  isDevelopment: process.env.PRODUCTION ?? true,
  webUrl: process.env.WEBURL ?? 'localhost:4200/#/',
  sendGridKey: process.env.SENDGRIDKEY ?? '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',
  jwt: {
    jwtExpiresIn: process.env.JWTEXPIRESIN ?? '14400',
    secret: process.env.JWTSECRET ?? 'MIIBIzANBgkqhkiG9w0BAQEFAAOCARAAMIIBCwKCAQIAi6oIpBoHT9M0XD5Xc6XN'
  }
};


