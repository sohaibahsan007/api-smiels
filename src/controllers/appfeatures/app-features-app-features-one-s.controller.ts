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
// import {AppFeatures} from '../../models';
// import {AppFeaturesRepository} from '../../repositories';


// export class AppFeaturesAppFeaturesOneSController {
//   constructor(
//     @repository(AppFeaturesRepository) protected appFeaturesRepository: AppFeaturesRepository,
//   ) { }

//   @get('/app-features/{id}/app-features-one-s', {
//     responses: {
//       '200': {
//         description: 'Array of AppFeatures has many AppFeaturesOneS',
//         content: {
//           'application/json': {
//             schema: {type: 'array', items: getModelSchemaRef(AppFeaturesOneS)},
//           },
//         },
//       },
//     },
//   })
//   async find(
//     @param.path.string('id') id: string,
//     @param.query.object('filter') filter?: Filter<AppFeaturesOneS>,
//   ): Promise<AppFeaturesOneS[]> {
//     return this.appFeaturesRepository.appFeaturesOneS(id).find(filter);
//   }

//   @post('/app-features/{id}/app-features-one-s', {
//     responses: {
//       '200': {
//         description: 'AppFeatures model instance',
//         content: {'application/json': {schema: getModelSchemaRef(AppFeaturesOneS)}},
//       },
//     },
//   })
//   async create(
//     @param.path.string('id') id: typeof AppFeatures.prototype.id,
//     @requestBody({
//       content: {
//         'application/json': {
//           schema: getModelSchemaRef(AppFeaturesOneS, {
//             title: 'NewAppFeaturesOneSInAppFeatures',
//             exclude: ['id'],
//             optional: ['appFeaturesId']
//           }),
//         },
//       },
//     }) appFeaturesOneS: Omit<AppFeaturesOneS, 'id'>,
//   ): Promise<AppFeaturesOneS> {
//     return this.appFeaturesRepository.appFeaturesOneS(id).create(appFeaturesOneS);
//   }

//   @patch('/app-features/{id}/app-features-one-s', {
//     responses: {
//       '200': {
//         description: 'AppFeatures.AppFeaturesOneS PATCH success count',
//         content: {'application/json': {schema: CountSchema}},
//       },
//     },
//   })
//   async patch(
//     @param.path.string('id') id: string,
//     @requestBody({
//       content: {
//         'application/json': {
//           schema: getModelSchemaRef(AppFeaturesOneS, {partial: true}),
//         },
//       },
//     })
//     appFeaturesOneS: Partial<AppFeaturesOneS>,
//     @param.query.object('where', getWhereSchemaFor(AppFeaturesOneS)) where?: Where<AppFeaturesOneS>,
//   ): Promise<Count> {
//     return this.appFeaturesRepository.appFeaturesOneS(id).patch(appFeaturesOneS, where);
//   }

//   @del('/app-features/{id}/app-features-one-s', {
//     responses: {
//       '200': {
//         description: 'AppFeatures.AppFeaturesOneS DELETE success count',
//         content: {'application/json': {schema: CountSchema}},
//       },
//     },
//   })
//   async delete(
//     @param.path.string('id') id: string,
//     @param.query.object('where', getWhereSchemaFor(AppFeaturesOneS)) where?: Where<AppFeaturesOneS>,
//   ): Promise<Count> {
//     return this.appFeaturesRepository.appFeaturesOneS(id).delete(where);
//   }
// }
