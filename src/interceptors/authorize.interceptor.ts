import {AuthenticationBindings, AuthenticationMetadata} from '@loopback/authentication';
import {
  globalInterceptor, inject,

  Interceptor,
  InvocationContext,
  InvocationResult,
  Provider,
  ValueOrPromise
} from '@loopback/context';
import {Getter} from '@loopback/core';
import {HttpErrors} from '@loopback/rest';
import {UserProfile} from '@loopback/security';
import {RequiredPermissions, UserPermissionsFn} from '../authorization';
import {AuthServiceBindings, MultiTenancyBindings} from '../keys';
import {Tenant} from '../multi-tenancy';
/**
 * This class will be bound to the application as an `Interceptor` during
 * `boot`
 */
@globalInterceptor('', {tags: {name: 'authorize'}})
export class AuthorizationInterceptor implements Provider<Interceptor> {
  constructor(
    @inject(AuthenticationBindings.METADATA)
    public metadata: AuthenticationMetadata[],
    @inject(AuthServiceBindings.USER_PERMISSIONS)
    protected checkPermissons: UserPermissionsFn,
    @inject.getter(AuthenticationBindings.CURRENT_USER)
    public getCurrentUser: Getter<UserProfile>,
    @inject(MultiTenancyBindings.CURRENT_TENANT, {optional: true})
    private tenant?: Tenant
  ) { }

  /**
   * This method is used by LoopBack context to produce an interceptor function
   * for the binding.
   *
   * @returns An interceptor function
   */
  value() {
    return this.intercept.bind(this);
  }

  /**
   * The logic to intercept an invocation
   * @param invocationCtx - Invocation context
   * @param next - A function to invoke next interceptor or the target method
   */
  async intercept(
    invocationCtx: InvocationContext,
    next: () => ValueOrPromise<InvocationResult>,
  ) {

    if (!(this.metadata?.[0])) return next();

    if (!this.metadata?.[0].options) {
      throw new HttpErrors.Forbidden('PERMISSION NOT DEFINED');
    }
    const user = await this.getCurrentUser();

    if (!this.tenant || !user.tenantId) {
      throw new HttpErrors.NotAcceptable('TENANT NOT FOUND');
    }
    // get tenant from url and verify
    if (user.tenantId !== this.tenant?.id) {
      throw new HttpErrors.NotAcceptable('TENANT NOT VERIFIED');
    }
    const requiredPermissions = this.metadata[0].options as RequiredPermissions;

    if (!this.checkPermissons(user.permissions, requiredPermissions)) {
      throw new HttpErrors.Forbidden('INVALID_ACCESS_PERMISSION');
    }

    const result = await next();

    return result;
  }
}
