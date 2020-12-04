
import {TokenService} from '@loopback/authentication';
import {TokenServiceBindings} from '@loopback/authentication-jwt';
import {inject} from '@loopback/context';
import {HttpErrors} from '@loopback/rest';
import {securityId, UserProfile} from '@loopback/security';
import {promisify} from 'util';
import {environment} from '../../environments';

const jwt = require('jsonwebtoken');
const signAsync = promisify(jwt.sign);
const verifyAsync = promisify(jwt.verify);

export class JWTService implements TokenService {
  constructor(
    @inject(TokenServiceBindings.TOKEN_SECRET)
    private jwtSecret: string,
  ) { }

  async verifyToken(token: string): Promise<UserProfile> {
    if (!token) {
      throw new HttpErrors.Unauthorized(
        `Error verifying token : 'token' is null`,
      );
    }

    let userProfile: UserProfile;

    try {
      // decode user profile from token
      const decodedToken = await verifyAsync(token, this.jwtSecret);
      // don't copy over  token field 'iat' and 'exp', nor 'email' to user profile
      userProfile = Object.assign(
        {[securityId]: '', name: ''},
        {
          [securityId]: decodedToken.id,
          name: decodedToken.name,
          id: decodedToken.id,
          companyId: decodedToken.companyId,
          tenantId: decodedToken.tenantId,
          permissions: decodedToken.permissions

        },
      );
    } catch (error) {
      throw new HttpErrors.Unauthorized(
        `Error verifying token : ${error.message}`,
      );
    }
    return userProfile;
  }
  async generateToken(userProfile: UserProfile): Promise<string> {
    if (!userProfile) {
      throw new HttpErrors.Unauthorized(
        'Error generating token : userProfile is null',
      );
    }
    const userInfoForToken = {
      id: userProfile[securityId],
      name: userProfile.name,
      companyId: userProfile.companyId,
      tenantId: userProfile.tenantId,
      permissions: userProfile.permissions
    };
    // Generate a JSON Web Token
    let token: string;
    try {
      token = await signAsync(userInfoForToken, this.jwtSecret, {
        expiresIn: Number(environment.jwt.jwtExpiresIn),
      });
    } catch (error) {
      throw new HttpErrors.Unauthorized(`Error encoding token : ${error}`);
    }

    return token;
  }

  async generatedynamicToken(obj: object): Promise<string> {
    if (!obj) {
      throw new HttpErrors.Unauthorized(
        'Error generating token : object is null',
      );
    }
    // Generate a JSON Web Token
    let token: string;
    try {
      token = await signAsync(obj, this.jwtSecret, {
        expiresIn: Number(environment.jwt.jwtExpiresIn),
      });
    } catch (error) {
      throw new HttpErrors.Unauthorized(`Error encoding token : ${error}`);
    }

    return token;

  }
  async verifydynamicToken(token: string): Promise<object> {
    let obj: object;
    try {
      // decode user profile from token
      const decodedToken = await verifyAsync(token, this.jwtSecret);
      obj = decodedToken;
    } catch (error) {
      throw new HttpErrors.Unauthorized(
        error.message,
      );
    }
    return obj;
  }
}

