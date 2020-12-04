// Copyright IBM Corp. 2020. All Rights Reserved.
// Node module: @loopback/example-multi-tenancy
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import {
  config,
  ContextTags,
  extensionPoint,
  extensions,
  Getter,
  Provider
} from '@loopback/core';
import {asMiddleware, Middleware, RequestContext} from '@loopback/rest';
import {MultiTenancyBindings, MULTI_TENANCY_STRATEGIES} from '../../keys';
import {MultiTenancyMiddlewareOptions, MultiTenancyStrategy} from '../types';
@extensionPoint(
  MULTI_TENANCY_STRATEGIES,
  {
    tags: {
      [ContextTags.KEY]: MultiTenancyBindings.MIDDLEWARE,
    },
  },
  asMiddleware({
    group: 'tenancy',
    downstreamGroups: 'findRoute',
  }),
)
export class MultiTenancyMiddlewareProvider implements Provider<Middleware> {
  constructor(
    @extensions()
    private readonly getMultiTenancyStrategies: Getter<MultiTenancyStrategy[]>,
    @config()
    private options: MultiTenancyMiddlewareOptions = {
      strategyNames: ['host'],
    },
  ) {
  }

  value(): Middleware {
    return async (ctx, next) => {
      await this.action(ctx as RequestContext);
      return next();
    };
  }

  /**
   * The implementation of authenticate() sequence action.
   * @param request - The incoming request provided by the REST layer
   */
  async action(requestCtx: RequestContext) {
    const tenancy = await this.identifyTenancy(requestCtx);
    if (tenancy == null) return;
    requestCtx.bind(MultiTenancyBindings.CURRENT_TENANT).to(tenancy.tenant);
    return tenancy.tenant;
  }

  private async identifyTenancy(requestCtx: RequestContext) {
    const strategyNames = this.options.strategyNames;
    let strategies = await this.getMultiTenancyStrategies();
    strategies = strategies
      .filter(s => strategyNames.includes(s.name))
      .sort((a, b) => {
        return strategyNames.indexOf(a.name) - strategyNames.indexOf(b.name);
      });
    for (const strategy of strategies) {
      const tenant = await strategy.identifyTenant(requestCtx);
      if (tenant != null) {
        return {tenant, strategy};
      }
    }
    return undefined;
  }
}
