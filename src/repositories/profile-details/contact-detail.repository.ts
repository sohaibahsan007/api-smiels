import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {UserManagementSmielsDataSource} from '../../datasources';
import {ContactDetail, ContactDetailRelations} from '../../models';

export class ContactDetailRepository extends DefaultCrudRepository<
  ContactDetail,
  typeof ContactDetail.prototype.id,
  ContactDetailRelations
  > {
  constructor(
    @inject('datasources.UserManagement_SMIELS') dataSource: UserManagementSmielsDataSource,
  ) {
    super(ContactDetail, dataSource);
  }
}
