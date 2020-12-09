import {AuthenticationComponent, registerAuthenticationStrategy} from '@loopback/authentication';
import {
  TokenServiceBindings
} from '@loopback/authentication-jwt';
import {BootMixin} from '@loopback/boot';
import {ApplicationConfig, BindingKey, createBindingFromClass} from '@loopback/core';
import {HealthBindings, HealthComponent} from '@loopback/health';
import {RepositoryMixin} from '@loopback/repository';
import {RestApplication} from '@loopback/rest';
import {
  RestExplorerBindings,
  RestExplorerComponent
} from '@loopback/rest-explorer';
import {ServiceMixin} from '@loopback/service-proxy';
import path from 'path';
import {BcryptHasher, JWTService, JWTStrategy, SecuritySpecEnhancer, UserPermissionsProvider} from './authorization';
import {environment} from './environments';
import {AuthServiceBindings, CompanyServicesBindings, EmailManagerBindings, PasswordHasherBindings, UserServiceBindings} from './keys';
import {MultiTenancyMiddlewareProvider} from './multi-tenancy';
import {MultiTenancyComponent} from './multi-tenancy/component';
import {MyAuthenticationSequence, MyMiddlewareSequence} from './sequence';
import {CompanyManagementService, EmailService, RolesManagementService, SignupService, UserManagementService} from './services';
/**
 * Information from package.json
 */
export interface PackageInfo {
  name: string;
  version: string;
  description: string;
}
export const PackageKey = BindingKey.create<PackageInfo>('application.package');

const pkg: PackageInfo = require('../package.json');

export {ApplicationConfig};

export class UserManagementApp extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
  constructor(options: ApplicationConfig = {}) {
    super(options);

    this.sequence(MyAuthenticationSequence);
    // Set up the custom sequence
    this.sequence(MyMiddlewareSequence);
    this.middleware(MultiTenancyMiddlewareProvider);

    this.setupBindings();

    // Set up default home page
    this.static('/', path.join(__dirname, '../public'));


    // setup configurations of components
    this.setUpConfigurations();

    this.setUpComponents();

    this.projectRoot = __dirname;
    // Customize @loopback/boot Booter Conventions here
    this.bootOptions = {
      controllers: {
        // Customize ControllerBooter Conventions here
        dirs: ['controllers'],
        extensions: ['.controller.js'],
        nested: true,
      },
    };
  }
  setUpConfigurations(): void {
    // Customize @loopback/rest-explorer configuration here
    this.configure(RestExplorerBindings.COMPONENT).to({
      path: '/explorer',
    });
    this.configure(HealthBindings.COMPONENT).to({
      openApiSpec: true,
    });
  }
  setUpComponents(): void {
    this.component(RestExplorerComponent);
    this.component(MultiTenancyComponent);
    this.component(AuthenticationComponent);
    this.component(HealthComponent);

    // for now, disabled
    // this.component(MetricsComponent);
  }

  setupBindings(): void {

    // Bind package.json to the application context
    this.bind(PackageKey).to(pkg);

    // Use JWT secret from JWT_SECRET environment variable if set
    // otherwise create a random string of 64 hex digits
    this.bind(TokenServiceBindings.TOKEN_SECRET).to(environment.jwt.secret);

    // Bind bcrypt hash services
    this.bind(PasswordHasherBindings.ROUNDS).to(10);
    this.bind(PasswordHasherBindings.PASSWORD_HASHER).toClass(BcryptHasher);

    // Bind JWT & permission authentication strategy related elements
    registerAuthenticationStrategy(this, JWTStrategy);

    this.bind(AuthServiceBindings.JWT_SERVICE).toClass(JWTService);
    this.bind(AuthServiceBindings.USER_PERMISSIONS).toProvider(UserPermissionsProvider);
    this.add(createBindingFromClass(SecuritySpecEnhancer));

    // signup service binding
    this.bind(CompanyServicesBindings.SIGN_UP).toClass(SignupService);
    this.bind(EmailManagerBindings.SEND_MAIL).toClass(EmailService);

    // user service bindings
    this.bind(UserServiceBindings.USER_MANAGEMENT).toClass(UserManagementService);

    // company registration service binding
    this.bind(CompanyServicesBindings.COMPANY_MANAGEMENT).toClass(CompanyManagementService);

    // roles services binding

    this.bind(UserServiceBindings.ROLES_MANAGEMENT).toClass(RolesManagementService);

  }

}
