import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, HasManyRepositoryFactory, repository} from '@loopback/repository';
import {UserManagementSmielsDataSource} from '../../datasources';
import {RolePermissions, Roles, RolesRelations} from '../../models';
import {RolePermissionsRepository} from './role-permissions.repository';

export class RolesRepository extends DefaultCrudRepository<
  Roles,
  typeof Roles.prototype.id,
  RolesRelations
  > {

  public readonly rolePermissions: HasManyRepositoryFactory<RolePermissions, typeof Roles.prototype.id>;

  constructor(
    @inject('datasources.UserManagement_SMIELS') dataSource: UserManagementSmielsDataSource, @repository.getter('RolePermissionsRepository') protected rolePermissionsRepositoryGetter: Getter<RolePermissionsRepository>,
  ) {
    super(Roles, dataSource);
    this.rolePermissions = this.createHasManyRepositoryFactoryFor('rolePermissions', rolePermissionsRepositoryGetter,);
    this.registerInclusionResolver('rolePermissions', this.rolePermissions.inclusionResolver);
  }
}
