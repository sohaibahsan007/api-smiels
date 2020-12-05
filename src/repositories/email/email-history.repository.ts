import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {UserManagementSmielsDataSource} from '../../datasources';
import {EmailHistory, EmailHistoryRelations} from '../../models';

export class EmailHistoryRepository extends DefaultCrudRepository<
  EmailHistory,
  typeof EmailHistory.prototype.id,
  EmailHistoryRelations
  > {
  constructor(
    @inject('datasources.UserManagement_SMIELS') dataSource: UserManagementSmielsDataSource,
  ) {
    super(EmailHistory, dataSource);
  }
}
