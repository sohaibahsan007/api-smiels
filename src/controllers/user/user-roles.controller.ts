import {authenticate} from '@loopback/authentication';
import {inject} from '@loopback/core';
import {
  Count,
  CountSchema
} from '@loopback/repository';
import {
  param,

  post
} from '@loopback/rest';
import {PermissionKey} from '../../authorization';
import {UserServiceBindings} from '../../keys';
import {UserManagementService} from '../../services';

export class UserRolesController {
  constructor(
    @inject(UserServiceBindings.USER_MANAGEMENT)
    private userManagementService: UserManagementService,
  ) { }

  // @get('/users/{id}/user-roles', {
  //   responses: {
  //     '200': {
  //       description: 'Array of User has many UserRoles',
  //       content: {
  //         'application/json': {
  //           schema: {type: 'array', items: getModelSchemaRef(UserRoles)},
  //         },
  //       },
  //     },
  //   },
  // })
  // async find(
  //   @param.path.string('id') id: string,
  //   @param.query.object('filter') filter?: Filter<UserRoles>,
  // ): Promise<UserRoles[]> {
  //   return this.userRepository.userRoles(id).find(filter);
  // }

  @authenticate({strategy: 'jwt', options: {"required": [PermissionKey.UserUpdateAll]}})
  @post('/users/{id}/user-roles/{roleid}', {
    responses: {
      '200': {
        description: 'User.UserRoles PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateUserRoles(
    @param.path.string('id') id: string,
    @param.path.string('roleid') roleid: number,
  ): Promise<Count> {
    return this.userManagementService.createUserRolesByRoleId(id, roleid);
  }
}
