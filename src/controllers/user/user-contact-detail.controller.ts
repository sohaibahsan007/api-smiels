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
//   ContactDetail, User
// } from '../../models';
// import {UserRepository} from '../../repositories';

// export class UserContactDetailController {
//   constructor(
//     @repository(UserRepository) protected userRepository: UserRepository,
//   ) { }

//   @get('/users/{id}/contact-detail', {
//     responses: {
//       '200': {
//         description: 'User has one ContactDetail',
//         content: {
//           'application/json': {
//             schema: getModelSchemaRef(ContactDetail),
//           },
//         },
//       },
//     },
//   })
//   async get(
//     @param.path.string('id') id: string,
//     @param.query.object('filter') filter?: Filter<ContactDetail>,
//   ): Promise<ContactDetail> {
//     return this.userRepository.contactDetail(id).get(filter);
//   }

//   @post('/users/{id}/contact-detail', {
//     responses: {
//       '200': {
//         description: 'User model instance',
//         content: {'application/json': {schema: getModelSchemaRef(ContactDetail)}},
//       },
//     },
//   })
//   async create(
//     @param.path.string('id') id: typeof User.prototype.id,
//     @requestBody({
//       content: {
//         'application/json': {
//           schema: getModelSchemaRef(ContactDetail, {
//             title: 'NewContactDetailInUser',
//             exclude: ['id'],
//             optional: ['userId']
//           }),
//         },
//       },
//     }) contactDetail: Omit<ContactDetail, 'id'>,
//   ): Promise<ContactDetail> {
//     return this.userRepository.contactDetail(id).create(contactDetail);
//   }

//   @patch('/users/{id}/contact-detail', {
//     responses: {
//       '200': {
//         description: 'User.ContactDetail PATCH success count',
//         content: {'application/json': {schema: CountSchema}},
//       },
//     },
//   })
//   async patch(
//     @param.path.string('id') id: string,
//     @requestBody({
//       content: {
//         'application/json': {
//           schema: getModelSchemaRef(ContactDetail, {partial: true}),
//         },
//       },
//     })
//     contactDetail: Partial<ContactDetail>,
//     @param.query.object('where', getWhereSchemaFor(ContactDetail)) where?: Where<ContactDetail>,
//   ): Promise<Count> {
//     return this.userRepository.contactDetail(id).patch(contactDetail, where);
//   }

//   @del('/users/{id}/contact-detail', {
//     responses: {
//       '200': {
//         description: 'User.ContactDetail DELETE success count',
//         content: {'application/json': {schema: CountSchema}},
//       },
//     },
//   })
//   async delete(
//     @param.path.string('id') id: string,
//     @param.query.object('where', getWhereSchemaFor(ContactDetail)) where?: Where<ContactDetail>,
//   ): Promise<Count> {
//     return this.userRepository.contactDetail(id).delete(where);
//   }
// }
