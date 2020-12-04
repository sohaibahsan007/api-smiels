import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {UserManagementSmielsDataSource} from '../../datasources';
import {AddressDetail, AddressDetailRelations} from '../../models';

export class AddressDetailRepository extends DefaultCrudRepository<
  AddressDetail,
  typeof AddressDetail.prototype.id,
  AddressDetailRelations
  > {
  constructor(
    @inject('datasources.UserManagement_SMIELS') dataSource: UserManagementSmielsDataSource,
  ) {
    super(AddressDetail, dataSource);
  }
}
