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
// import {AppFeaturesOneS} from '../../models';
// import {UserRoles} from '../../models';
// import {AppFeaturesOneSRepository} from '../../repositories';

// export class AppFeaturesOneSUserRolesController {
//   constructor(
//     @repository(AppFeaturesOneSRepository) protected appFeaturesOneSRepository: AppFeaturesOneSRepository,
//   ) { }

//   @get('/app-features-one-s/{id}/user-roles', {
//     responses: {
//       '200': {
//         description: 'Array of AppFeaturesOneS has many UserRoles',
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
//     return this.appFeaturesOneSRepository.userRoles(id).find(filter);
//   }

//   @post('/app-features-one-s/{id}/user-roles', {
//     responses: {
//       '200': {
//         description: 'AppFeaturesOneS model instance',
//         content: {'application/json': {schema: getModelSchemaRef(UserRoles)}},
//       },
//     },
//   })
//   async create(
//     @param.path.string('id') id: typeof AppFeaturesOneS.prototype.id,
//     @requestBody({
//       content: {
//         'application/json': {
//           schema: getModelSchemaRef(UserRoles, {
//             title: 'NewUserRolesInAppFeaturesOneS',
//             exclude: ['id'],
//             optional: ['appFeaturesOneSId']
//           }),
//         },
//       },
//     }) userRoles: Omit<UserRoles, 'id'>,
//   ): Promise<UserRoles> {
//     return this.appFeaturesOneSRepository.userRoles(id).create(userRoles);
//   }

//   @patch('/app-features-one-s/{id}/user-roles', {
//     responses: {
//       '200': {
//         description: 'AppFeaturesOneS.UserRoles PATCH success count',
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
//     return this.appFeaturesOneSRepository.userRoles(id).patch(userRoles, where);
//   }

//   @del('/app-features-one-s/{id}/user-roles', {
//     responses: {
//       '200': {
//         description: 'AppFeaturesOneS.UserRoles DELETE success count',
//         content: {'application/json': {schema: CountSchema}},
//       },
//     },
//   })
//   async delete(
//     @param.path.string('id') id: string,
//     @param.query.object('where', getWhereSchemaFor(UserRoles)) where?: Where<UserRoles>,
//   ): Promise<Count> {
//     return this.appFeaturesOneSRepository.userRoles(id).delete(where);
//   }
// }
