import {inject, lifeCycleObserver, LifeCycleObserver, ValueOrPromise} from '@loopback/core';
import {juggler} from '@loopback/repository';

const dbConfig = {
  name: process.env.POSTGRESQL_DB ?? 'UserManagement_SMIELS',
  connector: 'postgresql',
  url: process.env.POSTGRESQL_URI ?? 'postgres://smiels:F4d1a6e0@localhost/UserManagement_SMIELS',
  host: process.env.POSTGRESQL_HOST ?? 'localhost',
  port: process.env.POSTGRESQL_PORT ?? 5432,
  user: process.env.POSTGRESQL_USER ?? 'smiels',
  password: process.env.POSTGRESQL_PASSWORD ?? 'F4d1a6e0',
  database: process.env.POSTGRESQL_DB ?? 'UserManagement_SMIELS'
}
@lifeCycleObserver('datasource')
export class UserManagementSmielsDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'UserManagement_SMIELS';
  static readonly defaultConfig = dbConfig;

  constructor(
    @inject('datasources.config.UserManagement_SMIELS', {optional: true})
    dsConfig: object = dbConfig,
  ) {
    super(dsConfig);
  }

  /**
   * Disconnect the datasource when application is stopped. This allows the
   * application to be shut down gracefully.
   */
  stop(): ValueOrPromise<void> {
    return super.disconnect();
  }
}
