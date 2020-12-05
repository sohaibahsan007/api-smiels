import {inject, lifeCycleObserver, LifeCycleObserver, ValueOrPromise} from '@loopback/core';
import {juggler} from '@loopback/repository';
import {environment} from '../environments/index';

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class UserManagementSmielsDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'UserManagement_SMIELS';
  static readonly defaultConfig = environment.dbConfig;

  constructor(
    @inject('datasources.config.UserManagement_SMIELS', {optional: true})
    dsConfig: object = environment.dbConfig,
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
