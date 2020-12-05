import {authenticate} from '@loopback/authentication';
import {inject} from '@loopback/core';
import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody
} from '@loopback/rest';
import {SecurityBindings, UserProfile} from '@loopback/security';
import {PermissionKey} from '../../authorization';
import {
  AddressDetail
} from '../../models';
import {CompanyRepository} from '../../repositories';

export class CompanyAddressDetailController {
  constructor(
    @repository(CompanyRepository) protected companyRepository: CompanyRepository,
    @inject(SecurityBindings.USER) protected currentUserProfile: UserProfile,
  ) { }

  @authenticate({strategy: 'jwt', options: {"required": [PermissionKey.CompanyRead]}})
  @get('/company/address-detail', {
    responses: {
      '200': {
        description: 'Array of Company has one AddressDetail',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(AddressDetail)},
          },
        },
      },
    },
  })
  async get(
    @param.query.object('filter') filter?: Filter<AddressDetail>,
  ): Promise<AddressDetail[]> {
    return this.companyRepository.addressDetail(this.currentUserProfile.companyId).find(filter);
  }

  @authenticate({strategy: 'jwt', options: {"required": [PermissionKey.CompanyCreate]}})
  @post('/company/address-detail', {
    responses: {
      '200': {
        description: 'Company model instance',
        content: {'application/json': {schema: getModelSchemaRef(AddressDetail)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AddressDetail, {
            title: 'NewAddressDetailInCompany',
            exclude: ['id', 'companyId'],
            optional: ['companyId']
          }),
        },
      },
    }) addressDetail: Omit<AddressDetail, 'id'>,
  ): Promise<AddressDetail> {
    return this.companyRepository.addressDetail(this.currentUserProfile.companyId).create(addressDetail);
  }

  @authenticate({strategy: 'jwt', options: {"required": [PermissionKey.CompanyUpdate]}})
  @patch('/company/address-detail', {
    responses: {
      '200': {
        description: 'Company.AddressDetail PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AddressDetail, {partial: true}),
        },
      },
    })
    addressDetail: Partial<AddressDetail>,
    @param.query.object('where', getWhereSchemaFor(AddressDetail)) where?: Where<AddressDetail>,
  ): Promise<Count> {
    return this.companyRepository.addressDetail(this.currentUserProfile.companyId).patch(addressDetail, where);
  }

  @authenticate({strategy: 'jwt', options: {"required": [PermissionKey.CompanyDelete]}})
  @del('/company/address-detail', {
    responses: {
      '200': {
        description: 'Company.AddressDetail DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.query.object('where', getWhereSchemaFor(AddressDetail)) where?: Where<AddressDetail>,
  ): Promise<Count> {
    return this.companyRepository.addressDetail(this.currentUserProfile.companyId).delete(where);
  }
}
