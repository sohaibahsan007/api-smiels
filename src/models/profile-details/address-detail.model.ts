import {Entity, model, property} from '@loopback/repository';
@model({
  settings: {postgresql: {schema: 'public', table: 'AddressDetail'}},
})
export class AddressDetail extends Entity {
  @property({
    type: 'string',
    id: true,
    defaultFn: 'uuid',
  })
  id: string;

  @property({
    type: 'string',
    required: true,
    length: 200,
    postgresql: {
      dataType: 'character varying',
      dataLength: 200,
      dataPrecision: null,
      dataScale: null,
      nullable: 'NO',
    },
  })
  line1: string;

  @property({
    type: 'string',
    length: 200,
    postgresql: {
      dataType: 'character varying',
      dataLength: 200,
      dataPrecision: null,
      dataScale: null,
      nullable: 'YES',
    },
  })
  line2?: string;

  @property({
    type: 'string',
    length: 100,
    postgresql: {
      dataType: 'character varying',
      dataLength: 100,
      dataPrecision: null,
      dataScale: null,
      nullable: 'YES',
    },
  })
  city?: string;

  @property({
    type: 'string',
    length: 100,
    postgresql: {
      dataType: 'character varying',
      dataLength: 100,
      dataPrecision: null,
      dataScale: null,
      nullable: 'YES',
    },
  })
  state?: string;

  @property({
    type: 'string',
    length: 100,
    postgresql: {
      dataType: 'character varying',
      dataLength: 100,
      dataPrecision: null,
      dataScale: null,
      nullable: 'YES',
    },
  })
  country: string;

  @property({
    type: 'string',
    length: 20,
    postgresql: {
      dataType: 'character varying',
      dataLength: 20,
      dataPrecision: null,
      dataScale: null,
      nullable: 'YES',
    },
  })
  zipcode: string;

  @property({
    type: 'string',
  })
  companyId?: string;

  @property({
    type: 'string',
  })
  userId?: string;

  @property({
    type: 'string',
    length: 20,
    postgresql: {
      dataType: 'character varying',
      dataLength: 20,
      dataPrecision: null,
      dataScale: null,
      nullable: 'YES',
    },
  })
  type: string;

  constructor(data?: Partial<AddressDetail>) {
    super(data);
  }
}
export interface AddressDetailRelations {
}
export type AddressDetailWithRelations = AddressDetail & AddressDetailRelations;
