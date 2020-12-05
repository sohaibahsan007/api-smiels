import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {postgresql: {schema: 'public', table: 'UserRoles'}},
})
export class UserRoles extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id: number;

  @property({
    type: 'string',
  })
  appFeaturesOneSId?: string;

  @property({
    type: 'string',
  })
  userId?: string;

  @property({
    type: 'number',
  })
  rolePermissionsId?: number;

  constructor(data?: Partial<UserRoles>) {
    super(data);
  }
}
export interface UserRolesRelations {
}
export type UserRolesWithRelations = UserRoles & UserRolesRelations;
