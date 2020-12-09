import {authenticate} from '@loopback/authentication';
import {inject} from '@loopback/core';
import {
  Count,
  repository
} from '@loopback/repository';
import {
  get,
  getModelSchemaRef,
  HttpErrors,
  param,
  patch,
  requestBody
} from '@loopback/rest';
import {SecurityBindings, securityId, UserProfile} from '@loopback/security';
import {PermissionKey} from '../../authorization';
import {UserServiceBindings} from '../../keys';
import {User, UserWithPassword} from '../../models';
import {UserRepository} from '../../repositories';
import {UserManagementService} from '../../services';

export class UserController {
  constructor(
    @repository(UserRepository)
    public userRepository: UserRepository,
    @inject(UserServiceBindings.USER_MANAGEMENT)
    protected userManagementService: UserManagementService,
  ) { }

  @authenticate({strategy: 'jwt', options: {"required": [PermissionKey.UserRead]}})
  @get('/users/profile', {
    responses: {
      '200': {
        description: 'User model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(User, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @inject(SecurityBindings.USER)
    currentUserProfile: UserProfile,
  ): Promise<User> {
    return this.userRepository.findById(currentUserProfile[securityId]);
  }

  @authenticate({strategy: 'jwt', options: {"required": [PermissionKey.UserUpdate]}})
  @patch('/user/{id}', {
    responses: {
      '200': {
        description: 'User Profile PATCH success'
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UserWithPassword, {
            partial: true,
            exclude: ['id', 'companyId', 'isAdmin', 'emailVerified', 'joinDate', 'username', 'isDeleted']
          }),
        },
      },
    })
    user: Partial<UserWithPassword>,
    @inject(SecurityBindings.USER)
    currentUserProfile: UserProfile,
  ): Promise<void | Count> {
    if (currentUserProfile[securityId] === id) {
      const password = user?.password;

      delete user.password;

      await this.userRepository.updateById(id, user as User);
      if (password) {
        await this.userManagementService.resetPassword(currentUserProfile[securityId], password);
      }
    } else {
      throw new HttpErrors.NotFound('User not found');

    }
  }

}
