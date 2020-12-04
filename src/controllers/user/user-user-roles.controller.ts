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
//   User,
//   UserRoles
// } from '../../models';
// import {UserRepository} from '../../repositories';

// export class UserUserRolesController {
//   constructor(
//     @repository(UserRepository) protected userRepository: UserRepository,
//   ) { }

//   @get('/users/{id}/user-roles', {
//     responses: {
//       '200': {
//         description: 'Array of User has many UserRoles',
//         content: {
//           'application/json': {
//             schema: {type: 'array', items: getModelSchemaRef(UserRoles)},
//           },
//         },
//       },
//     },
//   })
//   async find(
//     @param.path.string('id') id: string,
//     @param.query.object('filter') filter?: Filter<UserRoles>,
//   ): Promise<UserRoles[]> {
//     return this.userRepository.userRoles(id).find(filter);
//   }

//   @post('/users/{id}/user-roles', {
//     responses: {
//       '200': {
//         description: 'User model instance',
//         content: {'application/json': {schema: getModelSchemaRef(UserRoles)}},
//       },
//     },
//   })
//   async create(
//     @param.path.string('id') id: typeof User.prototype.id,
//     @requestBody({
//       content: {
//         'application/json': {
//           schema: getModelSchemaRef(UserRoles, {
//             title: 'NewUserRolesInUser',
//             exclude: ['id'],
//             optional: ['userId']
//           }),
//         },
//       },
//     }) userRoles: Omit<UserRoles, 'id'>,
//   ): Promise<UserRoles> {
//     return this.userRepository.userRoles(id).create(userRoles);
//   }

//   @patch('/users/{id}/user-roles', {
//     responses: {
//       '200': {
//         description: 'User.UserRoles PATCH success count',
//         content: {'application/json': {schema: CountSchema}},
//       },
//     },
//   })
//   async patch(
//     @param.path.string('id') id: string,
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
//     return this.userRepository.userRoles(id).patch(userRoles, where);
//   }

//   @del('/users/{id}/user-roles', {
//     responses: {
//       '200': {
//         description: 'User.UserRoles DELETE success count',
//         content: {'application/json': {schema: CountSchema}},
//       },
//     },
//   })
//   async delete(
//     @param.path.string('id') id: string,
//     @param.query.object('where', getWhereSchemaFor(UserRoles)) where?: Where<UserRoles>,
//   ): Promise<Count> {
//     return this.userRepository.userRoles(id).delete(where);
//   }
// }
