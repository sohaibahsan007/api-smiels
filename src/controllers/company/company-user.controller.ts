import {authenticate} from '@loopback/authentication';
import {inject} from '@loopback/core';
import {
  Count,
  CountSchema,
  Filter,
  repository
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  param,
  patch,
  post,
  requestBody
} from '@loopback/rest';
import {SecurityBindings, UserProfile} from '@loopback/security';
import {PermissionKey} from '../../authorization';
import {EmailManagerBindings, UserServiceBindings} from '../../keys';
import {
  User, UserWithPassword
} from '../../models';
import {CompanyRepository} from '../../repositories';
import {EmailService, UserManagementService} from '../../services';

// parent authenticate.
@authenticate('jwt')
export class CompanyUserController {
  constructor(
    @repository(CompanyRepository) protected companyRepository: CompanyRepository,
    @inject(SecurityBindings.USER) protected currentUserProfile: UserProfile,
    @inject(UserServiceBindings.USER_MANAGEMENT)
    protected userManagementService: UserManagementService,
    @inject(EmailManagerBindings.SEND_MAIL)
    private emailService: EmailService,
  ) { }

  @authenticate({strategy: 'jwt', options: {"required": [PermissionKey.UserReadAll]}})
  @get('/company/users', {
    responses: {
      '200': {
        description: 'Array of Company has many User',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(User)},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter') filter?: Filter<User>,
  ): Promise<User[]> {
    return this.companyRepository.users(this.currentUserProfile.companyId).find(filter);
  }

  @authenticate({strategy: 'jwt', options: {"required": [PermissionKey.UserCreate]}})
  @post('/company/users', {
    responses: {
      '200': {
        description: 'Company model instance',
        content: {'application/json': {schema: getModelSchemaRef(User)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UserWithPassword, {
            title: 'NewUserInCompany',
            exclude: ['id', 'companyId', 'isAdmin', 'emailVerified', 'joinDate', 'username', 'isDeleted'],
          }),
        },
      },
    }) user: UserWithPassword,
  ): Promise<User> {
    user.companyId = this.currentUserProfile.companyId;
    const password = user.password;
    const newuser = await this.userManagementService.createUser(user);

    // re-assign password.
    user.password = password;
    await this.emailService.sendNewMemberEmail(user);
    return newuser;
  }

  @authenticate({strategy: 'jwt', options: {"required": [PermissionKey.UserUpdateAll]}})
  @patch('/company/users/{id}', {
    responses: {
      '200': {
        description: 'Company.User PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UserWithPassword, {
            exclude: ['companyId', 'isAdmin', 'email', 'emailVerified', 'joinDate', 'username', 'isDeleted', 'userRoles', 'userCredentials'],
            partial: true
          }
          ),
        },
      },
    })
    user: Partial<UserWithPassword>,
    @param.path.string('id') id: string
  ): Promise<Count> {
    const password = user?.password;

    delete user.password;
    let count = await this.companyRepository.users(this.currentUserProfile.companyId).patch(user, {id});
    if (password) {
      count = await this.userManagementService.resetPassword(id, password);
    }
    return count;
  }

  @authenticate({strategy: 'jwt', options: {"required": [PermissionKey.UserDelete]}})
  @del('/company/users/{id}', {
    responses: {
      '200': {
        description: 'Company.User DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
  ): Promise<Count> {
    return this.companyRepository.deleteSoft(this.currentUserProfile.companyId, id);
  }
}
