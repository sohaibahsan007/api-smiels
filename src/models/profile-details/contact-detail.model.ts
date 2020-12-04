import {Entity, model, property} from '@loopback/repository';
@model({
  settings: {postgresql: {schema: 'public', table: 'ContactDetail'}},
})
export class ContactDetail extends Entity {
  @property({
    type: 'string',
    id: true,
    defaultFn: 'uuid',
  })
  id: string;

  @property({
    type: 'number',
    required: true,
    length: 30
  })
  phoneNo: number;

  @property({
    type: 'number',
    required: true,
    length: 10
  })
  phoneExt: number;

  @property({
    type: 'number',
    required: true,
    length: 6
  })
  countryCode: number;

  @property({
    type: 'string',
    required: true,
    length: 6,
    postgresql: {
      dataType: 'character varying',
      dataLength: 6,
      dataPrecision: null,
      dataScale: null,
      nullable: 'NO',
    },
  })
  type: string;

  @property({
    type: 'string',
  })
  companyId?: string;

  @property({
    type: 'string',
  })
  userId?: string;

  constructor(data?: Partial<ContactDetail>) {
    super(data);
  }
}
export interface ContactDetailRelations {
}
export type ContactDetailWithRelations = ContactDetail & ContactDetailRelations;
