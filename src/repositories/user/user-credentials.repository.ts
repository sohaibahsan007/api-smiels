import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {UserManagementSmielsDataSource} from '../../datasources';
import {UserCredentials, UserCredentialsRelations} from '../../models';

export class UserCredentialsRepository extends DefaultCrudRepository<
  UserCredentials,
  typeof UserCredentials.prototype.id,
  UserCredentialsRelations
  > {
  constructor(
    @inject('datasources.UserManagement_SMIELS') dataSource: UserManagementSmielsDataSource,
  ) {
    super(UserCredentials, dataSource);
  }
}
