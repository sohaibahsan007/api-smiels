import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, HasManyRepositoryFactory, repository} from '@loopback/repository';
import {RolePermissionsRepository, UserRolesRepository} from '..';
import {UserManagementSmielsDataSource} from '../../datasources';
import {AppFeaturesOneS, AppFeaturesOneSRelations, RolePermissions, UserRoles} from '../../models';

export class AppFeaturesOneSRepository extends DefaultCrudRepository<
  AppFeaturesOneS,
  typeof AppFeaturesOneS.prototype.id,
  AppFeaturesOneSRelations
  > {

  public readonly userRoles: HasManyRepositoryFactory<UserRoles, typeof AppFeaturesOneS.prototype.id>;

  public readonly rolePermissions: HasManyRepositoryFactory<RolePermissions, typeof AppFeaturesOneS.prototype.id>;

  constructor(
    @inject('datasources.UserManagement_SMIELS') dataSource: UserManagementSmielsDataSource, @repository.getter('UserRolesRepository') protected userRolesRepositoryGetter: Getter<UserRolesRepository>, @repository.getter('RolePermissionsRepository') protected rolePermissionsRepositoryGetter: Getter<RolePermissionsRepository>,
  ) {
    super(AppFeaturesOneS, dataSource);
    this.rolePermissions = this.createHasManyRepositoryFactoryFor('rolePermissions', rolePermissionsRepositoryGetter,);
    this.registerInclusionResolver('rolePermissions', this.rolePermissions.inclusionResolver);
    this.userRoles = this.createHasManyRepositoryFactoryFor('userRoles', userRolesRepositoryGetter,);
    this.registerInclusionResolver('userRoles', this.userRoles.inclusionResolver);
  }
}
