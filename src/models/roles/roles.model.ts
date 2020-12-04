import {Entity, hasMany, model, property} from '@loopback/repository';
import {RolePermissions} from './role-permissions.model';

@model({
  settings: {postgresql: {schema: 'public', table: 'Roles'}},
})
export class Roles extends Entity {
  @property({
    type: 'number',
    id: true,
    // turning it off to insert data using data seed file
    // generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
    index: {unique: true},
    jsonSchema: {
      minLength: 4,
      maxLength: 30,
      errorMessage: 'name should be between 04 and 30 characters.',
    },
    postgresql: {
      dataType: 'character varying',
      dataLength: 30,
      dataPrecision: null,
      dataScale: null,
      nullable: 'NO',
    },
  })
  name: string;

  @hasMany(() => RolePermissions)
  rolePermissions: RolePermissions[];

  constructor(data?: Partial<Roles>) {
    super(data);
  }
}
export interface RolesRelations {
}
export type RolesWithRelations = Roles & RolesRelations;

