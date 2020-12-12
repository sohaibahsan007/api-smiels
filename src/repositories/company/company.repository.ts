import {Getter, inject} from '@loopback/core';
import {Count, DefaultCrudRepository, HasManyRepositoryFactory, HasOneRepositoryFactory, repository} from '@loopback/repository';
import {AddressDetailRepository, ContactDetailRepository, UserRepository} from '..';
import {UserManagementSmielsDataSource} from '../../datasources';
import {AddressDetail, Company, CompanyRelations, ContactDetail, User} from '../../models';

export class CompanyRepository extends DefaultCrudRepository<
  Company,
  typeof Company.prototype.id,
  CompanyRelations
  > {

  public readonly contactDetail: HasOneRepositoryFactory<ContactDetail, typeof Company.prototype.id>;

  public readonly addressDetail: HasManyRepositoryFactory<AddressDetail, typeof Company.prototype.id>;

  public readonly users: HasManyRepositoryFactory<User, typeof Company.prototype.id>;

  constructor(
    @inject('datasources.UserManagement_SMIELS') dataSource: UserManagementSmielsDataSource, @repository.getter('ContactDetailRepository') protected contactDetailRepositoryGetter: Getter<ContactDetailRepository>, @repository.getter('AddressDetailRepository') protected addressDetailRepositoryGetter: Getter<AddressDetailRepository>, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>,
  ) {
    super(Company, dataSource);
    this.users = this.createHasManyRepositoryFactoryFor('users', userRepositoryGetter,);
    this.registerInclusionResolver('users', this.users.inclusionResolver);
    this.addressDetail = this.createHasManyRepositoryFactoryFor('addressDetail', addressDetailRepositoryGetter);
    this.registerInclusionResolver('addressDetail', this.addressDetail.inclusionResolver);
    this.contactDetail = this.createHasOneRepositoryFactoryFor('contactDetail', contactDetailRepositoryGetter);
    this.registerInclusionResolver('contactDetail', this.contactDetail.inclusionResolver);
  }

  async deleteSoft(
    companyId: typeof Company.prototype.id,
    userId: typeof User.prototype.id,
  ): Promise<Count> {
    try {
      const user = await this.users(companyId).find({where: {id: userId}});
      if (user) {
        const currentuser = user[0];
        currentuser.isDeleted = true;
        await this.users(companyId).patch(currentuser, {id: userId});
        return {count: 1};
      } else return {count: 0};
    } catch (err) {
      if (err.code === 'ENTITY_NOT_FOUND') {
        return {count: 0};
      }
      throw err;
    }
  }
}
