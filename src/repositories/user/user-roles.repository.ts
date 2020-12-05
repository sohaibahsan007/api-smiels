import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {UserManagementSmielsDataSource} from '../../datasources';
import {UserRoles, UserRolesRelations} from '../../models';

export class UserRolesRepository extends DefaultCrudRepository<
  UserRoles,
  typeof UserRoles.prototype.id,
  UserRolesRelations
  > {
  constructor(
    @inject('datasources.UserManagement_SMIELS') dataSource: UserManagementSmielsDataSource,
  ) {
    super(UserRoles, dataSource);
  }
}
