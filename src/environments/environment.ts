

export const environment = {
  noreplyEmail: 'noreply@smiels.com',
  supportEmail: 'support@smiels.com',
  webUrl: process.env.WEBURL ?? 'http://localhost:4200',
  sendGridKey: process.env.SENDGRIDKEY ?? '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',
  rest: {
    port: +(process.env.PORT ?? 3000),
    host: process.env.HOST ?? 'localhost',
    gracePeriodForClose: 5000, // 5 seconds
    openApiSpec: {
      // useful when used with OpenAPI-to-GraphQL to locate your application
      setServersFromRequest: true,
    },
  },
  dbConfig: {
    name: process.env.POSTGRESQL_DB ?? 'UserManagement_SMIELS',
    connector: 'postgresql',
    url: process.env.POSTGRESQL_URI ?? 'postgres://smiels:F4d1a6e0@localhost/UserManagement_SMIELS',
    host: process.env.POSTGRESQL_HOST ?? 'localhost',
    port: process.env.POSTGRESQL_PORT ?? 5432,
    user: process.env.POSTGRESQL_USER ?? 'smiels',
    password: process.env.POSTGRESQL_PASSWORD ?? 'F4d1a6e0',
    database: process.env.POSTGRESQL_DB ?? 'UserManagement_SMIELS'
  },
  jwt: {
    jwtExpiresIn: process.env.JWTEXPIRESIN ?? '14400',
    secret: process.env.JWTSECRET ?? 'MIIBIzANBgkqhkiG9w0BAQEFAAOCARAAMIIBCwKCAQIAi6oIpBoHT9M0XD5Xc6XN'
  }
};
