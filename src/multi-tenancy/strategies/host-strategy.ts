// Copyright IBM Corp. 2020. All Rights Reserved.
// Node module: @loopback/example-multi-tenancy
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import {RequestContext} from '@loopback/rest';
import {MultiTenancyStrategy, Tenant} from '../types';
/**
 * Use `host` to identify the tenant id
 */
export class HostStrategy implements MultiTenancyStrategy {
  name = 'host';
  identifyTenant(requestContext: RequestContext) {
    const host = requestContext.request.headers.host;
    return this.mapHostToTenant(host);
  }

  mapHostToTenant(host: string | undefined): Tenant | undefined {
    if (host == null) return undefined;
    host = host.replace('http://', '').replace('https://', '').replace('www.', '').split(/[/?#]/)[0];
    const hostname = host.split(':')[0];
    if (hostname === undefined || hostname == null) return undefined;
    const id = hostname.split('.')[0];
    if (id == null) return undefined;
    return {id};
  }
}
