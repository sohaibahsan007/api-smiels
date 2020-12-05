import {Entity, hasMany, model, property} from '@loopback/repository';
import {AppFeaturesOneS} from '../../models';

@model({
  settings: {postgresql: {schema: 'public', table: 'AppFeatures'}},
})
export class AppFeatures extends Entity {
  @property({
    type: 'number',
    id: true,
  })
  id: number;

  @property({
    type: 'string',
    required: true,
    index: {unique: true},
    jsonSchema: {
      minLength: 4,
      maxLength: 70,
      errorMessage: 'featureName should be between 04 and 70 characters.',
    },
    postgresql: {
      dataType: 'character varying',
      dataLength: 70,
      dataPrecision: null,
      dataScale: null,
      nullable: 'NO',
    },
  })
  featureName: string;

  @property({
    type: 'boolean',
  })
  isActive?: boolean;

  @hasMany(() => AppFeaturesOneS)
  appFeaturesOneS: AppFeaturesOneS[];

  constructor(data?: Partial<AppFeatures>) {
    super(data);
  }
}
export interface AppFeaturesRelations {
}
export type AppFeaturesWithRelations = AppFeatures & AppFeaturesRelations;
