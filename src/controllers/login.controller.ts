// Uncomment these imports to begin using these cool features!

import {inject} from '@loopback/core';
import {get, post, requestBody} from '@loopback/rest';
import {JWTService} from '../authorization';
import {AuthServiceBindings, CompanyServicesBindings, UserServiceBindings} from '../keys';
import {Credentials} from '../repositories';
import {CompanyManagementService, RolesManagementService, UserManagementService} from '../services';
import {CredentialsRequestBody, TenantInfo, TenantInfoSchema} from '../specs';

// import {inject} from '@loopback/core';

export class LoginController {
  constructor(
    @inject(UserServiceBindings.USER_MANAGEMENT)
    protected userManagementService: UserManagementService,
    @inject(AuthServiceBindings.JWT_SERVICE)
    protected jwtService: JWTService,
    @inject(CompanyServicesBindings.COMPANY_MANAGEMENT)
    protected companyService: CompanyManagementService,
    @inject(UserServiceBindings.ROLES_MANAGEMENT)
    protected rolesManagementService: RolesManagementService,
  ) { }

  @post('/login', {
    responses: {
      '200': {
        description: 'Token',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                token: {
                  type: 'string',
                },
              },
            },
          },
        },
      },
    },
  })
  async login(
    @requestBody(CredentialsRequestBody) credentials: Credentials,
  ): Promise<{token: string}> {
    // ensure the user exists, and the password is correct
    const user = await this.userManagementService.verifyCredentials(credentials);

    // get company details
    const company = await this.companyService.verifyCompanyById(user.companyId);

    // get roles assigned to user
    const roles = await this.rolesManagementService.getUserRolesByUserId(user.id);

    // convert a User object into a UserProfile object (reduced set of properties)
    const userProfile = await this.userManagementService.convertToUserProfile(company.subDomain, user, roles);

    // create a JSON Web Token based on the user profile
    const token = await this.jwtService.generateToken(userProfile);

    return {token};
  }

  @get('/login', {
    responses: {
      '200': {
        description: 'Verify Tenant and Send Company name and logo url',
        content: {'application/json': {schema: TenantInfoSchema}},
      },
    },
  })
  async find(
  ): Promise<TenantInfo> {
    return this.companyService.getTenantInfo();
  }
}
