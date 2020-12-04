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
  param,
  patch,


  requestBody
} from '@loopback/rest';
import {SecurityBindings, UserProfile} from '@loopback/security';
import {PermissionKey} from '../../authorization';
import {CompanyServicesBindings, MultiTenancyBindings} from '../../keys';
import {Company} from '../../models';
import {Tenant} from '../../multi-tenancy';
import {CompanyRepository} from '../../repositories';
import {CompanyManagementService} from '../../services';

@authenticate('jwt')
export class CompanyController {
  constructor(
    @repository(CompanyRepository)
    protected companyRepository: CompanyRepository,
    @inject(CompanyServicesBindings.COMPANY_MANAGEMENT)
    protected companyService: CompanyManagementService,
    @inject(MultiTenancyBindings.CURRENT_TENANT, {optional: true})
    protected tenant?: Tenant
  ) { }

  @authenticate({strategy: 'jwt', options: {"required": [PermissionKey.Support]}})
  @get('/company/count', {
    responses: {
      '200': {
        description: 'Company model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(@param.where(Company) where?: Where<Company>): Promise<Count> {
    return this.companyRepository.count(where);
  }

  @authenticate({strategy: 'jwt', options: {"required": [PermissionKey.Support]}})
  @get('/company', {
    responses: {
      '200': {
        description: 'Array of Company model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Company, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Company) filter?: Filter<Company>,
  ): Promise<Company[]> {
    return this.companyRepository.find(filter);
  }

  @authenticate({strategy: 'jwt', options: {"required": [PermissionKey.Support]}})
  @patch('/company', {
    responses: {
      '200': {
        description: 'Company PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Company, {partial: true, exclude: ['joinDate']}),
        },
      },
    })
    company: Company,
    @param.where(Company) where?: Where<Company>,
  ): Promise<Count> {
    return this.companyRepository.updateAll(company, where);
  }

  @authenticate({strategy: 'jwt', options: {"required": [PermissionKey.CompanyRead]}})
  @get('/company', {
    responses: {
      '200': {
        description: 'Company model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Company, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @inject(SecurityBindings.USER)
    currentUserProfile: UserProfile,
  ): Promise<Company> {
    return this.companyRepository.findById(currentUserProfile.companyId);
  }

  @authenticate({strategy: 'jwt', options: {"required": [PermissionKey.CompanyUpdate]}})
  @patch('/company', {
    responses: {
      '204': {
        description: 'Company PATCH success',
      },
    },
  })
  async updateById(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Company, {partial: true, exclude: ['joinDate']}),
        },
      },
    })
    company: Company,
    @inject(SecurityBindings.USER)
    currentUserProfile: UserProfile,
  ): Promise<void> {
    await this.companyRepository.updateById(currentUserProfile.companyId, company);
  }
}
