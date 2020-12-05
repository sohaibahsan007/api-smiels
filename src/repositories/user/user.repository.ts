import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, HasManyRepositoryFactory, HasOneRepositoryFactory, repository} from '@loopback/repository';
import {UserManagementSmielsDataSource} from '../../datasources';
import {AddressDetail, ContactDetail, User, UserCredentials, UserRelations, UserRoles} from '../../models';
import {AddressDetailRepository, ContactDetailRepository, UserCredentialsRepository, UserRolesRepository} from '../../repositories';

export type Credentials = {
  email: string;
  password: string;
};
export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id,
  UserRelations
  > {

  public readonly contactDetail: HasOneRepositoryFactory<ContactDetail, typeof User.prototype.id>;

  public readonly addressDetail: HasOneRepositoryFactory<AddressDetail, typeof User.prototype.id>;

  public readonly userRoles: HasManyRepositoryFactory<UserRoles, typeof User.prototype.id>;

  public readonly userCredentials: HasOneRepositoryFactory<UserCredentials, typeof User.prototype.id>;

  constructor(
    @inject('datasources.UserManagement_SMIELS') dataSource: UserManagementSmielsDataSource, @repository.getter('ContactDetailRepository') protected contactDetailRepositoryGetter: Getter<ContactDetailRepository>, @repository.getter('AddressDetailRepository') protected addressDetailRepositoryGetter: Getter<AddressDetailRepository>, @repository.getter('UserRolesRepository') protected userRolesRepositoryGetter: Getter<UserRolesRepository>, @repository.getter('UserCredentialsRepository') protected userCredentialsRepositoryGetter: Getter<UserCredentialsRepository>,
  ) {
    super(User, dataSource);
    this.userCredentials = this.createHasOneRepositoryFactoryFor('userCredentials', userCredentialsRepositoryGetter);
    this.userRoles = this.createHasManyRepositoryFactoryFor('userRoles', userRolesRepositoryGetter,);
    this.registerInclusionResolver('userRoles', this.userRoles.inclusionResolver);
    this.addressDetail = this.createHasOneRepositoryFactoryFor('addressDetail', addressDetailRepositoryGetter);
    this.registerInclusionResolver('addressDetail', this.addressDetail.inclusionResolver);
    this.contactDetail = this.createHasOneRepositoryFactoryFor('contactDetail', contactDetailRepositoryGetter);
    this.registerInclusionResolver('contactDetail', this.contactDetail.inclusionResolver);
  }

  async findCredentials(
    userId: typeof User.prototype.id,
  ): Promise<UserCredentials | undefined> {
    try {
      return await this.userCredentials(userId).get();
    } catch (err) {
      if (err.code === 'ENTITY_NOT_FOUND') {
        return undefined;
      }
      throw err;
    }
  }
}
