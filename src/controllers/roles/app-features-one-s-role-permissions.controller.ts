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
//   AppFeaturesOneS,
//   RolePermissions,
// } from '../../models';
// import {AppFeaturesOneSRepository} from '../../repositories';

// export class AppFeaturesOneSRolePermissionsController {
//   constructor(
//     @repository(AppFeaturesOneSRepository) protected appFeaturesOneSRepository: AppFeaturesOneSRepository,
//   ) { }

//   @get('/app-features-one-s/{id}/role-permissions', {
//     responses: {
//       '200': {
//         description: 'Array of AppFeaturesOneS has many RolePermissions',
//         content: {
//           'application/json': {
//             schema: {type: 'array', items: getModelSchemaRef(RolePermissions)},
//           },
//         },
//       },
//     },
//   })
//   async find(
//     @param.path.string('id') id: string,
//     @param.query.object('filter') filter?: Filter<RolePermissions>,
//   ): Promise<RolePermissions[]> {
//     return this.appFeaturesOneSRepository.rolePermissions(id).find(filter);
//   }

//   @post('/app-features-one-s/{id}/role-permissions', {
//     responses: {
//       '200': {
//         description: 'AppFeaturesOneS model instance',
//         content: {'application/json': {schema: getModelSchemaRef(RolePermissions)}},
//       },
//     },
//   })
//   async create(
//     @param.path.string('id') id: typeof AppFeaturesOneS.prototype.id,
//     @requestBody({
//       content: {
//         'application/json': {
//           schema: getModelSchemaRef(RolePermissions, {
//             title: 'NewRolePermissionsInAppFeaturesOneS',
//             exclude: ['id'],
//             optional: ['appFeaturesOneSId']
//           }),
//         },
//       },
//     }) rolePermissions: Omit<RolePermissions, 'id'>,
//   ): Promise<RolePermissions> {
//     return this.appFeaturesOneSRepository.rolePermissions(id).create(rolePermissions);
//   }

//   @patch('/app-features-one-s/{id}/role-permissions', {
//     responses: {
//       '200': {
//         description: 'AppFeaturesOneS.RolePermissions PATCH success count',
//         content: {'application/json': {schema: CountSchema}},
//       },
//     },
//   })
//   async patch(
//     @param.path.string('id') id: string,
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
//     return this.appFeaturesOneSRepository.rolePermissions(id).patch(rolePermissions, where);
//   }

//   @del('/app-features-one-s/{id}/role-permissions', {
//     responses: {
//       '200': {
//         description: 'AppFeaturesOneS.RolePermissions DELETE success count',
//         content: {'application/json': {schema: CountSchema}},
//       },
//     },
//   })
//   async delete(
//     @param.path.string('id') id: string,
//     @param.query.object('where', getWhereSchemaFor(RolePermissions)) where?: Where<RolePermissions>,
//   ): Promise<Count> {
//     return this.appFeaturesOneSRepository.rolePermissions(id).delete(where);
//   }
// }
