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
//   AddressDetail, User
// } from '../../models';
// import {UserRepository} from '../../repositories';

// export class UserAddressDetailController {
//   constructor(
//     @repository(UserRepository) protected userRepository: UserRepository,
//   ) { }

//   @get('/users/{id}/address-detail', {
//     responses: {
//       '200': {
//         description: 'User has one AddressDetail',
//         content: {
//           'application/json': {
//             schema: getModelSchemaRef(AddressDetail),
//           },
//         },
//       },
//     },
//   })
//   async get(
//     @param.path.string('id') id: string,
//     @param.query.object('filter') filter?: Filter<AddressDetail>,
//   ): Promise<AddressDetail> {
//     return this.userRepository.addressDetail(id).get(filter);
//   }

//   @post('/users/{id}/address-detail', {
//     responses: {
//       '200': {
//         description: 'User model instance',
//         content: {'application/json': {schema: getModelSchemaRef(AddressDetail)}},
//       },
//     },
//   })
//   async create(
//     @param.path.string('id') id: typeof User.prototype.id,
//     @requestBody({
//       content: {
//         'application/json': {
//           schema: getModelSchemaRef(AddressDetail, {
//             title: 'NewAddressDetailInUser',
//             exclude: ['id'],
//             optional: ['userId']
//           }),
//         },
//       },
//     }) addressDetail: Omit<AddressDetail, 'id'>,
//   ): Promise<AddressDetail> {
//     return this.userRepository.addressDetail(id).create(addressDetail);
//   }

//   @patch('/users/{id}/address-detail', {
//     responses: {
//       '200': {
//         description: 'User.AddressDetail PATCH success count',
//         content: {'application/json': {schema: CountSchema}},
//       },
//     },
//   })
//   async patch(
//     @param.path.string('id') id: string,
//     @requestBody({
//       content: {
//         'application/json': {
//           schema: getModelSchemaRef(AddressDetail, {partial: true}),
//         },
//       },
//     })
//     addressDetail: Partial<AddressDetail>,
//     @param.query.object('where', getWhereSchemaFor(AddressDetail)) where?: Where<AddressDetail>,
//   ): Promise<Count> {
//     return this.userRepository.addressDetail(id).patch(addressDetail, where);
//   }

//   @del('/users/{id}/address-detail', {
//     responses: {
//       '200': {
//         description: 'User.AddressDetail DELETE success count',
//         content: {'application/json': {schema: CountSchema}},
//       },
//     },
//   })
//   async delete(
//     @param.path.string('id') id: string,
//     @param.query.object('where', getWhereSchemaFor(AddressDetail)) where?: Where<AddressDetail>,
//   ): Promise<Count> {
//     return this.userRepository.addressDetail(id).delete(where);
//   }
// }
