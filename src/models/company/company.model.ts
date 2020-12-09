
import {Entity, hasMany, hasOne, model, property} from '@loopback/repository';
import {AddressDetail, ContactDetail, User} from '..';
import {UserWithPassword} from '../user/user-with-password.model';

@model({
  settings: {
    postgresql: {schema: 'public', table: 'Company'},
    indexes: {
      uniquesubDomain: {
        keys: {
          subDomain: 1,
        },
        options: {
          unique: true,
        },
      },
    },
  },
})
export class Company extends Entity {
  @property({
    type: 'string',
    id: true,
    defaultFn: 'uuid',
  })
  id?: string;

  @property({
    type: 'string',
    length: 200,
    required: true,
    jsonSchema: {
      minLength: 4,
      maxLength: 200,
      errorMessage: 'Company Name should be between 04 and 200 characters.',
    },
    postgresql: {
      dataType: 'character varying',
      dataLength: 200,
      dataPrecision: null,
      dataScale: null,
      nullable: 'NO',
    },
  })
  name: string;

  @property({
    type: 'string',
    length: 30,
    index: {unique: true},
    required: true,
    jsonSchema: {
      minLength: 4,
      maxLength: 30,
      transform: ['toLowerCase'],
      errorMessage: 'subDomain should be between 04 and 30 characters.',
    },
    postgresql: {
      dataType: 'character varying',
      dataLength: 30,
      dataPrecision: null,
      dataScale: null,
      nullable: 'NO',
    },
  })
  subDomain: string;

  @property({
    type: 'string',
    required: true,
    length: 254,
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
    length: 45,
    jsonSchema: {
      minLength: 1,
      maxLength: 45,
      errorMessage: 'Registration Number should be between 1 and 45 characters.',
    },
    postgresql: {
      dataType: 'character varying',
      dataLength: 45,
      dataPrecision: null,
      dataScale: null,
      nullable: 'YES',
    },
  })
  regNumber?: string;

  @property({
    type: 'string',
    length: 100,
    jsonSchema: {
      minLength: 1,
      maxLength: 100,
      errorMessage: 'Industry Type should be between 1 and 100 characters.',
    },
    postgresql: {
      dataType: 'character varying',
      dataLength: 100,
      dataPrecision: null,
      dataScale: null,
      nullable: 'YES',
    },
  })
  industryType?: string;

  @property({
    type: 'date',
  })
  joinDate?: Date;

  @property({
    type: 'string',
    length: 3,
    required: true,
    jsonSchema: {
      minLength: 3,
      maxLength: 3,
      errorMessage: 'Currency should be 3 characters.',
    },
    postgresql: {
      dataType: 'character varying',
      dataLength: 3,
      dataPrecision: null,
      dataScale: null,
      nullable: 'NO',
    },
  })
  currencyCode: string;

  @property({
    type: 'string',
    length: 30,
    jsonSchema: {
      minLength: 0,
      maxLength: 30,
      errorMessage: 'VAT Number should be between 4 and 30 characters.',
    },
    postgresql: {
      dataType: 'character varying',
      dataLength: 30,
      dataPrecision: null,
      dataScale: null,
      nullable: 'YES',
    },
  })
  vatNumber?: string;

  @property({
    type: 'number',
    postgresql: {
      dataType: 'DECIMAL',
      dataLength: 3,
      dataPrecision: 2,
      dataScale: null,
      nullable: 'YES',
    },
  })
  vatRate?: string;


  @property({
    type: 'string',
  })
  logoUrl?: string;

  @property({
    type: 'string'
  })
  website?: string;

  @property({
    type: 'string',
    length: 30,
    required: true,
    jsonSchema: {
      minLength: 4,
      maxLength: 40,
      errorMessage: 'dateFormate should be between 4 and 40 characters.',
    },
    postgresql: {
      dataType: 'character varying',
      dataLength: 40,
      dataPrecision: null,
      dataScale: null,
      nullable: 'NO',
    },
  })
  dateFormate: string;

  @hasOne(() => ContactDetail)
  contactDetail: ContactDetail;

  @hasMany(() => AddressDetail)
  addressDetail: AddressDetail[];

  @hasMany(() => User)
  users: User[];


  constructor(data?: Partial<Company>) {
    super(data);
  }
}
export interface CompanyRelations {
}
export type CompanyWithRelations = Company & CompanyRelations;

@model()
export class NewCompanyRequest extends Company {
  @property({required: true})
  @hasOne(() => UserWithPassword)
  user: UserWithPassword;
  @property({required: true})
  inviteToken: string;
}
