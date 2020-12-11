// Uncomment these imports to begin using these cool features!

import {inject} from '@loopback/core';
import {Count, CountSchema} from '@loopback/repository';
import {get, getModelSchemaRef, param, post, requestBody, SchemaObject} from '@loopback/rest';
import {CompanyServicesBindings} from '../keys';
import {NewCompanyRequest} from '../models';
import {CompanyManagementService, Signup, SignupService} from '../services';

const SignupSchema: SchemaObject = {
  type: 'object',
  required: ['firstName', 'lastName', 'password'],
  properties: {
    firstName: {
      type: 'string',
      minLength: 2,
    },
    lastName: {
      type: 'string',
      minLength: 2,
    },
    email: {
      type: 'string',
      format: 'email',
    },
  },
};

export const SignupRequestBody = {
  description: 'The input of signup function',
  required: true,
  content: {
    'application/json': {schema: SignupSchema},
  },
};

export class SignupController {
  constructor(
    @inject(CompanyServicesBindings.SIGN_UP)
    protected signupService: SignupService,
    @inject(CompanyServicesBindings.COMPANY_MANAGEMENT)
    protected companyService: CompanyManagementService,
  ) { }

  @post('/signup', {
    responses: {
      '202': {
        description: 'Request Accepted',
        content: {
          'application/json': {schema: CountSchema}
        }
      },
    },
  })
  async sendConfirmationEmail(
    @requestBody(SignupRequestBody) body: Signup
  ): Promise<void> {
    await this.signupService.prepareConfirmationEmail(body);
  }


  /// get user info token

  @get('/signup/{token}', {
    responses: {
      '200': {
        description: 'Signup Info from Token',
        content: {
          'application/json': {schema: SignupSchema},
        },
      },
    },
  })
  async verifyConfirmation(
    @param.path.string('token') token: string,
  ): Promise<Signup> {
    return this.signupService.verifyConfirmation(token);
  }


  // validate sub domain.
  @get('/signup/verifydomain/{subDomain}', {
    responses: {
      '200': {
        description: 'Validate SubDomain',
        content: {
          'application/json': {schema: CountSchema},
        },
      },
    },
  })
  async validateDomain(
    @param.path.string('subDomain') domain: string,
  ): Promise<Count> {
    return this.companyService.validateSubDomain(domain);
  }

  /// create user and company from verification

  @post('/signup/company', {
    responses: {
      '200': {
        description: 'Company model instance',
        content: {'application/json': {schema: getModelSchemaRef(NewCompanyRequest)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(NewCompanyRequest, {
            title: 'NewCompany',
            exclude: ['id', 'joinDate', 'users'],
          }),
        },
      },
    })
    company: NewCompanyRequest,
  ): Promise<object> {
    return this.companyService.createCompanywithUser(company);
  }
}
