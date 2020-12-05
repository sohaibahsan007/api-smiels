import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, HasManyRepositoryFactory, repository} from '@loopback/repository';
import {UserManagementSmielsDataSource} from '../../datasources';
import {RolePermissions, RolePermissionsRelations, UserRoles} from '../../models';
import {UserRolesRepository} from '../user/user-roles.repository';

export class RolePermissionsRepository extends DefaultCrudRepository<
  RolePermissions,
  typeof RolePermissions.prototype.id,
  RolePermissionsRelations
  > {

  public readonly userRoles: HasManyRepositoryFactory<UserRoles, typeof RolePermissions.prototype.id>;

  constructor(
    @inject('datasources.UserManagement_SMIELS') dataSource: UserManagementSmielsDataSource, @repository.getter('UserRolesRepository') protected userRolesRepositoryGetter: Getter<UserRolesRepository>,
  ) {
    super(RolePermissions, dataSource);
    this.userRoles = this.createHasManyRepositoryFactoryFor('userRoles', userRolesRepositoryGetter,);
    this.registerInclusionResolver('userRoles', this.userRoles.inclusionResolver);
  }
}
