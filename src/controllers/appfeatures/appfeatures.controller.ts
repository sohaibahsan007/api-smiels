// import {
//   Count,
//   CountSchema,
//   Filter,
//   FilterExcludingWhere,
//   repository,
//   Where
// } from '@loopback/repository';
// import {
//   del,
//   get,
//   getModelSchemaRef,
//   param,
//   patch,
//   post,
//   put,
//   requestBody
// } from '@loopback/rest';
// import {AppFeatures} from '../../models';
// import {AppFeaturesRepository} from '../../repositories';

// export class AppfeaturesController {
//   constructor(
//     @repository(AppFeaturesRepository)
//     public appFeaturesRepository: AppFeaturesRepository,
//   ) { }

//   @post('/app-features', {
//     responses: {
//       '200': {
//         description: 'AppFeatures model instance',
//         content: {'application/json': {schema: getModelSchemaRef(AppFeatures)}},
//       },
//     },
//   })
//   async create(
//     @requestBody({
//       content: {
//         'application/json': {
//           schema: getModelSchemaRef(AppFeatures, {
//             title: 'NewAppFeatures',
//           }),
//         },
//       },
//     })
//     appFeatures: AppFeatures,
//   ): Promise<AppFeatures> {
//     return this.appFeaturesRepository.create(appFeatures);
//   }

//   @get('/app-features/count', {
//     responses: {
//       '200': {
//         description: 'AppFeatures model count',
//         content: {'application/json': {schema: CountSchema}},
//       },
//     },
//   })
//   async count(
//     @param.where(AppFeatures) where?: Where<AppFeatures>,
//   ): Promise<Count> {
//     return this.appFeaturesRepository.count(where);
//   }

//   @get('/app-features', {
//     responses: {
//       '200': {
//         description: 'Array of AppFeatures model instances',
//         content: {
//           'application/json': {
//             schema: {
//               type: 'array',
//               items: getModelSchemaRef(AppFeatures, {includeRelations: true}),
//             },
//           },
//         },
//       },
//     },
//   })
//   async find(
//     @param.filter(AppFeatures) filter?: Filter<AppFeatures>,
//   ): Promise<AppFeatures[]> {
//     return this.appFeaturesRepository.find(filter);
//   }

//   @patch('/app-features', {
//     responses: {
//       '200': {
//         description: 'AppFeatures PATCH success count',
//         content: {'application/json': {schema: CountSchema}},
//       },
//     },
//   })
//   async updateAll(
//     @requestBody({
//       content: {
//         'application/json': {
//           schema: getModelSchemaRef(AppFeatures, {partial: true}),
//         },
//       },
//     })
//     appFeatures: AppFeatures,
//     @param.where(AppFeatures) where?: Where<AppFeatures>,
//   ): Promise<Count> {
//     return this.appFeaturesRepository.updateAll(appFeatures, where);
//   }

//   @get('/app-features/{id}', {
//     responses: {
//       '200': {
//         description: 'AppFeatures model instance',
//         content: {
//           'application/json': {
//             schema: getModelSchemaRef(AppFeatures, {includeRelations: true}),
//           },
//         },
//       },
//     },
//   })
//   async findById(
//     @param.path.string('id') id: string,
//     @param.filter(AppFeatures, {exclude: 'where'})
//     filter?: FilterExcludingWhere<AppFeatures>,
//   ): Promise<AppFeatures> {
//     return this.appFeaturesRepository.findById(id, filter);
//   }

//   @patch('/app-features/{id}', {
//     responses: {
//       '204': {
//         description: 'AppFeatures PATCH success',
//       },
//     },
//   })
//   async updateById(
//     @param.path.string('id') id: string,
//     @requestBody({
//       content: {
//         'application/json': {
//           schema: getModelSchemaRef(AppFeatures, {partial: true}),
//         },
//       },
//     })
//     appFeatures: AppFeatures,
//   ): Promise<void> {
//     await this.appFeaturesRepository.updateById(id, appFeatures);
//   }

//   @put('/app-features/{id}', {
//     responses: {
//       '204': {
//         description: 'AppFeatures PUT success',
//       },
//     },
//   })
//   async replaceById(
//     @param.path.string('id') id: string,
//     @requestBody() appFeatures: AppFeatures,
//   ): Promise<void> {
//     await this.appFeaturesRepository.replaceById(id, appFeatures);
//   }

//   @del('/app-features/{id}', {
//     responses: {
//       '204': {
//         description: 'AppFeatures DELETE success',
//       },
//     },
//   })
//   async deleteById(@param.path.string('id') id: string): Promise<void> {
//     await this.appFeaturesRepository.deleteById(id);
//   }
// }
