import {Entity, hasMany, model, property} from '@loopback/repository';
import {UserRoles} from '..';

@model({
  settings: {postgresql: {schema: 'public', table: 'RolePermission'}},
})
export class RolePermissions extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
  })
  rolesId?: number;

  @property({
    type: 'string',
  })
  appFeaturesOneSId?: string;

  @hasMany(() => UserRoles)
  userRoles: UserRoles[];

  constructor(data?: Partial<RolePermissions>) {
    super(data);
  }
}

export interface RolePermissionsRelations {
  // describe navigational properties here
}

export type RolePermissionsWithRelations = RolePermissions & RolePermissionsRelations;
