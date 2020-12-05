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
  ContactDetail
} from '../../models';
import {CompanyRepository} from '../../repositories';

export class CompanyContactDetailController {
  constructor(
    @repository(CompanyRepository) protected companyRepository: CompanyRepository,
    @inject(SecurityBindings.USER) protected currentUserProfile: UserProfile,
  ) { }


  @authenticate({strategy: 'jwt', options: {"required": [PermissionKey.CompanyRead]}})
  @get('/company/contact-detail', {
    responses: {
      '200': {
        description: 'Company has one ContactDetail',
        content: {
          'application/json': {
            schema: getModelSchemaRef(ContactDetail),
          },
        },
      },
    },
  })
  async get(
    @param.query.object('filter') filter?: Filter<ContactDetail>,
  ): Promise<ContactDetail> {
    return this.companyRepository.contactDetail(this.currentUserProfile.companyId).get(filter);
  }

  @authenticate({strategy: 'jwt', options: {"required": [PermissionKey.CompanyCreate]}})
  @post('/company/contact-detail', {
    responses: {
      '200': {
        description: 'Company model instance',
        content: {'application/json': {schema: getModelSchemaRef(ContactDetail)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ContactDetail, {
            title: 'NewContactDetailInCompany',
            exclude: ['id'],
            optional: ['companyId']
          }),
        },
      },
    }) contactDetail: Omit<ContactDetail, 'id'>,
  ): Promise<ContactDetail> {
    return this.companyRepository.contactDetail(this.currentUserProfile.companyId).create(contactDetail);
  }

  @authenticate({strategy: 'jwt', options: {"required": [PermissionKey.CompanyUpdate]}})
  @patch('/company/contact-detail', {
    responses: {
      '200': {
        description: 'Company.ContactDetail PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ContactDetail, {partial: true}),
        },
      },
    })
    contactDetail: Partial<ContactDetail>,
    @param.query.object('where', getWhereSchemaFor(ContactDetail)) where?: Where<ContactDetail>,
  ): Promise<Count> {
    return this.companyRepository.contactDetail(this.currentUserProfile.companyId).patch(contactDetail, where);
  }
}
