
import {Entity, hasMany, hasOne, model, property} from '@loopback/repository';
import {AddressDetail, ContactDetail, UserCredentials, UserRoles} from '../../models';

@model({
  settings: {
    postgresql: {schema: 'public', table: 'Users'},
    indexes: {
      uniqueEmail: {
        keys: {
          email: 1,
        },
        options: {
          unique: true,
        },
      },
    },
  },
})
export class User extends Entity {
  @property({
    type: 'string',
    id: true,
    defaultFn: 'uuid',
  })
  id: string;

  @property({
    type: 'string',
    required: true,
    length: 254,
    index: {unique: true},
    jsonSchema: {
      format: 'email',
      minLength: 4,
      maxLength: 254,
      transform: ['toLowerCase'],
      errorMessage: {
        minLength: 'Email should be at least 4 characters.',
        maxLength: 'Email should not exceed 254 characters.',
      }
    },
    postgresql: {
      dataType: 'character varying',
      dataLength: 254,
      dataPrecision: null,
      dataScale: null,
      nullable: 'NO',
    },
  })
  email: string;

  @property({
    type: 'boolean',
  })
  emailVerified?: boolean;

  @property({
    type: 'string',
    index: {unique: true},
    length: 70,
    jsonSchema: {
      minLength: 4,
      maxLength: 70,
      transform: ['toLowerCase'],
      errorMessage: 'username should be between 04 and 70 characters.',
    },
    postgresql: {
      dataType: 'character varying',
      dataLength: 70,
      dataPrecision: null,
      dataScale: null,
      nullable: 'NO',
    },
  })
  username?: string;

  @property({
    type: 'string',
    length: 20,
    jsonSchema: {
      minLength: 2,
      maxLength: 20,
      errorMessage: 'firstname should be between 02 and 20 characters.',
    },
    postgresql: {
      dataType: 'character varying',
      dataLength: 20,
      dataPrecision: null,
      dataScale: null,
      nullable: 'YES',
    },
  })
  firstName?: string;
  @property({
    type: 'string',
    length: 20,
    jsonSchema: {
      minLength: 2,
      maxLength: 20,
      errorMessage: 'lastname should be between 02 and 20 characters.',
    },
    postgresql: {
      dataType: 'character varying',
      dataLength: 20,
      dataPrecision: null,
      dataScale: null,
      nullable: 'YES',
    },
  })
  lastName?: string;

  @property({
    type: 'date',
    required: true,
    defaultFn: 'now'
  })
  joinDate?: Date;

  @property({
    type: 'boolean',
  })
  isActive?: boolean;

  @property({
    type: 'boolean',
  })
  isAdmin?: boolean;

  @property({
    type: 'boolean',
  })
  isDeleted?: boolean;

  @property({
    type: 'date',
  })
  lastLogin?: Date;

  @property({
    type: 'date',
  })
  failedAttemptTime?: Date;

  @property({
    type: 'number',
  })
  failedAttemptTry?: number;

  @hasOne(() => ContactDetail)
  contactDetail: ContactDetail;

  @hasOne(() => AddressDetail)
  addressDetail: AddressDetail;

  @property({
    type: 'string',
  })
  companyId: string;

  @hasMany(() => UserRoles)
  userRoles: UserRoles[];

  @hasOne(() => UserCredentials)
  userCredentials: UserCredentials;

  constructor(data?: Partial<User>) {
    super(data);
  }
}
export interface UserRelations {
}
export type UserWithRelations = User & UserRelations;
