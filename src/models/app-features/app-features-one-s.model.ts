import {Entity, hasMany, model, property} from '@loopback/repository';
import {RolePermissions, UserRoles} from '..';

@model({
  settings: {postgresql: {schema: 'public', table: 'AppFeatures_OneS'}},
})
export class AppFeaturesOneS extends Entity {
  @property({
    type: 'string',
    index: {unique: true},
    id: true,
  })
  id: string;

  @property({
    type: 'string',
    required: true,
    index: {unique: true},
    jsonSchema: {
      minLength: 4,
      maxLength: 70,
      errorMessage: 'subFeatureName should be between 04 and 70 characters.',
    },
    postgresql: {
      dataType: 'character varying',
      dataLength: 70,
      dataPrecision: null,
      dataScale: null,
      nullable: 'NO',
    },
  })
  subFeatureName: string;

  @property({
    type: 'boolean',
  })
  isActive?: boolean;

  @property({
    type: 'number',
  })
  appFeaturesId?: string;


  @hasMany(() => UserRoles)
  userRoles: UserRoles[];

  @hasMany(() => RolePermissions)
  rolePermissions: RolePermissions[];

  constructor(data?: Partial<AppFeaturesOneS>) {
    super(data);
  }
}
export interface AppFeaturesOneSRelations {
}
export type AppFeaturesOneSWithRelations = AppFeaturesOneS & AppFeaturesOneSRelations;
