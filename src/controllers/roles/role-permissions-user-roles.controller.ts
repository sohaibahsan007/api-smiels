// import {
//   Count,
//   CountSchema,
//   Filter,
//   repository,
//   Where,
// } from '@loopback/repository';
// import {
//   del,
//   get,
//   getModelSchemaRef,
//   getWhereSchemaFor,
//   param,
//   patch,
//   post,
//   requestBody,
// } from '@loopback/rest';
// import {
//   RolePermissions,
//   UserRoles,
// } from '../../models';
// import {RolePermissionsRepository} from '../../repositories';

// export class RolePermissionsUserRolesController {
//   constructor(
//     @repository(RolePermissionsRepository) protected rolePermissionsRepository: RolePermissionsRepository,
//   ) { }

//   @get('/role-permissions/{id}/user-roles', {
//     responses: {
//       '200': {
//         description: 'Array of RolePermissions has many UserRoles',
//         content: {
//           'application/json': {
//             schema: {type: 'array', items: getModelSchemaRef(UserRoles)},
//           },
//         },
//       },
//     },
//   })
//   async find(
//     @param.path.number('id') id: number,
//     @param.query.object('filter') filter?: Filter<UserRoles>,
//   ): Promise<UserRoles[]> {
//     return this.rolePermissionsRepository.userRoles(id).find(filter);
//   }

//   @post('/role-permissions/{id}/user-roles', {
//     responses: {
//       '200': {
//         description: 'RolePermissions model instance',
//         content: {'application/json': {schema: getModelSchemaRef(UserRoles)}},
//       },
//     },
//   })
//   async create(
//     @param.path.number('id') id: typeof RolePermissions.prototype.id,
//     @requestBody({
//       content: {
//         'application/json': {
//           schema: getModelSchemaRef(UserRoles, {
//             title: 'NewUserRolesInRolePermissions',
//             exclude: ['id'],
//             optional: ['rolePermissionsId']
//           }),
//         },
//       },
//     }) userRoles: Omit<UserRoles, 'id'>,
//   ): Promise<UserRoles> {
//     return this.rolePermissionsRepository.userRoles(id).create(userRoles);
//   }

//   @patch('/role-permissions/{id}/user-roles', {
//     responses: {
//       '200': {
//         description: 'RolePermissions.UserRoles PATCH success count',
//         content: {'application/json': {schema: CountSchema}},
//       },
//     },
//   })
//   async patch(
//     @param.path.number('id') id: number,
//     @requestBody({
//       content: {
//         'application/json': {
//           schema: getModelSchemaRef(UserRoles, {partial: true}),
//         },
//       },
//     })
//     userRoles: Partial<UserRoles>,
//     @param.query.object('where', getWhereSchemaFor(UserRoles)) where?: Where<UserRoles>,
//   ): Promise<Count> {
//     return this.rolePermissionsRepository.userRoles(id).patch(userRoles, where);
//   }

//   @del('/role-permissions/{id}/user-roles', {
//     responses: {
//       '200': {
//         description: 'RolePermissions.UserRoles DELETE success count',
//         content: {'application/json': {schema: CountSchema}},
//       },
//     },
//   })
//   async delete(
//     @param.path.number('id') id: number,
//     @param.query.object('where', getWhereSchemaFor(UserRoles)) where?: Where<UserRoles>,
//   ): Promise<Count> {
//     return this.rolePermissionsRepository.userRoles(id).delete(where);
//   }
// }
