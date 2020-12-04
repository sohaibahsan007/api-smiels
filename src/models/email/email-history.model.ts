import {Entity, model, property} from '@loopback/repository';
@model({
  settings: {postgresql: {schema: 'public', table: 'EmailHistory'}},
})
export class EmailHistory extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id: number;

  @property({
    type: 'string',
    required: true,
  })
  type: string;

  @property({
    type: 'string',
    required: true,
  })
  sendTo: string;

  @property({
    type: 'string',
    required: true,
  })
  subject: string;

  @property({
    type: 'string',
    required: true,
  })
  senderName: string;

  @property({
    type: 'string',
  })
  senderId: string;

  @property({
    type: 'date',
  })
  dateStamp: Date;

  constructor(data?: Partial<EmailHistory>) {
    super(data);
  }
}
export interface EmailHistoryRelations {
}
export type EmailHistoryWithRelations = EmailHistory & EmailHistoryRelations;

