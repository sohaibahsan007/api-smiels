// import {
//   Count,
//   CountSchema,
//   Filter,
//   repository,
//   Where
// } from '@loopback/repository';
// import {
//   del,
//   get,
//   getModelSchemaRef,
//   getWhereSchemaFor,
//   param,
//   patch,
//   post,
//   requestBody
// } from '@loopback/rest';
// import {
//   RolePermissions, Roles
// } from '../../models';
// import {RolesRepository} from '../../repositories';

// export class RolesRolePermissionsController {
//   constructor(
//     @repository(RolesRepository) protected rolesRepository: RolesRepository,
//   ) { }

//   @get('/roles/{id}/role-permissions', {
//     responses: {
//       '200': {
//         description: 'Array of Roles has many RolePermissions',
//         content: {
//           'application/json': {
//             schema: {type: 'array', items: getModelSchemaRef(RolePermissions)},
//           },
//         },
//       },
//     },
//   })
//   async find(
//     @param.path.number('id') id: number,
//     @param.query.object('filter') filter?: Filter<RolePermissions>,
//   ): Promise<RolePermissions[]> {
//     return this.rolesRepository.rolePermissions(id).find(filter);
//   }

//   @post('/roles/{id}/role-permissions', {
//     responses: {
//       '200': {
//         description: 'Roles model instance',
//         content: {'application/json': {schema: getModelSchemaRef(RolePermissions)}},
//       },
//     },
//   })
//   async create(
//     @param.path.number('id') id: typeof Roles.prototype.id,
//     @requestBody({
//       content: {
//         'application/json': {
//           schema: getModelSchemaRef(RolePermissions, {
//             title: 'NewRolePermissionsInRoles',
//             exclude: ['id'],
//           }),
//         },
//       },
//     }) rolePermissions: Omit<RolePermissions, 'id'>,
//   ): Promise<RolePermissions> {
//     return this.rolesRepository.rolePermissions(id).create(rolePermissions);
//   }

//   @patch('/roles/{id}/role-permissions', {
//     responses: {
//       '200': {
//         description: 'Roles.RolePermissions PATCH success count',
//         content: {'application/json': {schema: CountSchema}},
//       },
//     },
//   })
//   async patch(
//     @param.path.number('id') id: number,
//     @requestBody({
//       content: {
//         'application/json': {
//           schema: getModelSchemaRef(RolePermissions, {partial: true}),
//         },
//       },
//     })
//     rolePermissions: Partial<RolePermissions>,
//     @param.query.object('where', getWhereSchemaFor(RolePermissions)) where?: Where<RolePermissions>,
//   ): Promise<Count> {
//     return this.rolesRepository.rolePermissions(id).patch(rolePermissions, where);
//   }

//   @del('/roles/{id}/role-permissions', {
//     responses: {
//       '200': {
//         description: 'Roles.RolePermissions DELETE success count',
//         content: {'application/json': {schema: CountSchema}},
//       },
//     },
//   })
//   async delete(
//     @param.path.number('id') id: number,
//     @param.query.object('where', getWhereSchemaFor(RolePermissions)) where?: Where<RolePermissions>,
//   ): Promise<Count> {
//     return this.rolesRepository.rolePermissions(id).delete(where);
//   }
// }
