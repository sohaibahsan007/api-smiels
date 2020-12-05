// Copyright IBM Corp. 2020. All Rights Reserved.
// Node module: loopback4-example-shopping
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import {model, property} from '@loopback/repository';
import {User} from './user.model';

@model()
export class UserWithPassword extends User {
  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      minLength: 8,
      maxLength: 40,
      errorMessage: {
        minLength: 'password should be atleast 8 characters',
        maxLength: 'password should not exceed 40 characters'
      },
    },
  })
  password: string;
}
