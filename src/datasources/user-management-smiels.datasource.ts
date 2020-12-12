import {inject, lifeCycleObserver, LifeCycleObserver, ValueOrPromise} from '@loopback/core';
import {AnyObject, juggler} from '@loopback/repository';

const config = {
  name: 'UserManagement_SMIELS',
  connector: 'postgresql',
  url: 'postgres://smiels:F4d1a6e0@localhost/UserManagement_SMIELS',
  host: 'localhost',
  port: 5432,
  user: 'smiels',
  password: 'F4d1a6e0',
  database: 'UserManagement_SMIELS'
}

function updateConfig(dsConfig: AnyObject) {
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
@lifeCycleObserver('datasource')
export class UserManagementSmielsDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'UserManagement_SMIELS';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.UserManagement_SMIELS', {optional: true})
    dsConfig: object = config,
  ) {
    super(updateConfig(dsConfig));
  }

  /**
   * Disconnect the datasource when application is stopped. This allows the
   * application to be shut down gracefully.
   */
  stop(): ValueOrPromise<void> {
    return super.disconnect();
  }
}
