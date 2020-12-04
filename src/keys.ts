import {BindingKey} from '@loopback/core';
import {Middleware} from '@loopback/rest';
import {JWTService, PasswordHasher} from './authorization';
import {UserPermissionsFn} from './authorization/types';
import {Tenant} from './multi-tenancy';
import {CompanyManagementService, EmailService, RolesManagementService, SignupService} from './services';
import {UserManagementService} from './services/user/user-management.service';
// signup service binding
export namespace CompanyServicesBindings {
  export const SIGN_UP = BindingKey.create<SignupService>(
    'services.email.signup',
  );

  export const COMPANY_MANAGEMENT = BindingKey.create<CompanyManagementService>(
    'services.company.company',
  );
}

// user service bindings
export namespace UserServiceBindings {
  export const USER_MANAGEMENT = BindingKey.create<UserManagementService>(
    'services.user.usermanagement',
  );

  export const ROLES_MANAGEMENT = BindingKey.create<RolesManagementService>(
    'services.roles.rolesmanagement',
  );
}

// password hashing service binding
export namespace PasswordHasherBindings {
  export const PASSWORD_HASHER = BindingKey.create<PasswordHasher>(
    'services.hasher',
  );
  export const ROUNDS = BindingKey.create<number>('services.hasher.round');
}


// email sender service
export namespace EmailManagerBindings {
  export const SEND_MAIL = BindingKey.create<EmailService>('services.email.send');
}

// token service binding
export namespace AuthServiceBindings {
  export const JWT_SERVICE = BindingKey.create<JWTService>('authorization.services.jwt');

  export const USER_PERMISSIONS = BindingKey.create<UserPermissionsFn>(
    'authorization.actions.userPermissions',
  );
}

/// multi tenancy bindings
export namespace MultiTenancyBindings {
  export const MIDDLEWARE = BindingKey.create<Middleware>(
    'middleware.multi-tenancy',
  );

  export const CURRENT_TENANT = BindingKey.create<Tenant>(
    'multi-tenancy.currentTenant',
  );
}
export const MULTI_TENANCY_STRATEGIES = 'multi-tenancy.strategies';
