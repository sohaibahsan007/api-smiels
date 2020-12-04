import {
  AuthenticationBindings, AuthenticationMetadata, AuthenticationStrategy
} from '@loopback/authentication';
import {JWTService} from '@loopback/authentication-jwt';
import {inject} from '@loopback/core';
import {HttpErrors, Request} from '@loopback/rest';
import {UserProfile} from '@loopback/security';
import {AuthServiceBindings} from '../../keys';
import {
  UserPermissionsFn
} from '../types';
export class JWTStrategy implements AuthenticationStrategy {
  name = 'jwt';

  constructor(
    @inject(AuthenticationBindings.METADATA)
    public metadata: AuthenticationMetadata,
    @inject(AuthServiceBindings.USER_PERMISSIONS)
    protected checkPermissons: UserPermissionsFn,
    @inject(AuthServiceBindings.JWT_SERVICE)
    protected tokenService: JWTService,
  ) { }
  async authenticate(request: Request): Promise<UserProfile | undefined> {
    const token: string = this.extractCredentials(request);
    try {
      const user: UserProfile = await this.tokenService.verifyToken(token) as UserProfile;
      return user;
    } catch (err) {
      Object.assign(err, {code: 'INVALID_ACCESS_TOKEN', statusCode: 401, });
      throw err;
    }
  }

  extractCredentials(request: Request): string {
    if (!request.headers.authorization) {
      throw new HttpErrors.Unauthorized(`Authorization header not found.`);
    }
    const authHeaderValue = request.headers.authorization;

    if (!authHeaderValue.startsWith('Bearer')) {
      throw new HttpErrors.Unauthorized(
        `Authorization header is not of type 'Bearer'.`,
      );
    }
    const parts = authHeaderValue.split(' ');
    if (parts.length !== 2)
      throw new HttpErrors.Unauthorized(
        `Authorization header value has too many parts. It must follow the pattern: 'Bearer xx.yy.zz' where xx.yy.zz is a valid JWT token.`,
      );
    const token = parts[1];
    return token;
  }
}
