import {Client, expect} from '@loopback/testlab';
import {UserManagementApp} from '../..';
import {MultiTenancyBindings} from '../../keys';
import {MultiTenancyMiddlewareOptions} from '../../multi-tenancy';
import {setupApplication} from './test-helper';

describe('PingController', () => {
  let app: UserManagementApp;
  let client: Client;

  before('setupApplication', async () => {
    ({app, client} = await setupApplication());
    app
      .configure<MultiTenancyMiddlewareOptions>(MultiTenancyBindings.MIDDLEWARE)
      .to({strategyNames: ['jwt', 'header', 'query']});
  });

  after(async () => {
    await app.stop();
  });

  it('invokes GET /ping', async () => {
    const res = await client.get('/ping?msg=world')
      .set('x-tenant-id', 'abc')
      .expect(200);
    expect(res.body).to.containEql({greeting: 'Hello from LoopBack', tenantId: 'abc'});
  });
});
