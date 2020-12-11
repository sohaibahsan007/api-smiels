// Copyright IBM Corp. 2020. All Rights Reserved.
// Node module: loopback4-example-shopping
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import {inject} from '@loopback/context';
import {Count, repository} from '@loopback/repository';
import {HttpErrors} from '@loopback/rest';
import {securityId, UserProfile} from '@loopback/security';
import _ from 'lodash';
import {PasswordHasher} from '../../authorization/hash.password.bcryptjs';
import {PasswordHasherBindings} from '../../keys';
import {User, UserWithPassword} from '../../models';
import {Credentials, RolePermissionsRepository, UserRepository, UserRolesRepository} from '../../repositories';


export interface IUserManagementService {
  verifyCredentials(credentials: Credentials): Promise<User>;
  verifyNewUserRequest(user: UserWithPassword): Promise<void>;
  convertToUserProfile(tenantId: string, companyName: string, user: User, roles: (string | undefined)[]): Promise<UserProfile>;
  createUser(userWithPassword: UserWithPassword): Promise<User>;
  resetPassword(userId: string, password: string): Promise<Count>;
  createUserRolesByRoleId(userId: string, roleId: number): Promise<Count>;

}

export class UserManagementService implements IUserManagementService {
  constructor(
    @repository(UserRepository)
    private userRepository: UserRepository,
    @repository(RolePermissionsRepository)
    private rolePermissionsRepository: RolePermissionsRepository,
    @repository(UserRolesRepository)
    private userRolesRepository: UserRolesRepository,
    @inject(PasswordHasherBindings.PASSWORD_HASHER)
    private passwordHasher: PasswordHasher,

  ) { }

  async verifyCredentials(credentials: Credentials): Promise<User> {
    const {email, password} = credentials;
    const invalidCredentialsError = 'Invalid email or password.';

    if (!email) {
      throw new HttpErrors.Unauthorized(invalidCredentialsError);
    }
    const foundUser = await this.userRepository.findOne({
      where: {email: credentials.email.toLowerCase()},
    });
    if (!foundUser) {
      throw new HttpErrors.Unauthorized(invalidCredentialsError);
    }

    if (!foundUser.isActive) {
      throw new HttpErrors.Unauthorized('user is not active');
    }

    const credentialsFound = await this.userRepository.findCredentials(
      foundUser.id,
    );
    if (!credentialsFound) {
      throw new HttpErrors.Unauthorized(invalidCredentialsError);
    }

    const passwordMatched = await this.passwordHasher.comparePassword(
      password,
      credentialsFound.password,
    );

    if (!passwordMatched) {

      throw new HttpErrors.Unauthorized(invalidCredentialsError);
    }

    // add entry to login time.
    await this.userRepository.updateById(foundUser.id, {lastLogin: new Date()});

    // pass the valid user.
    return foundUser;
  }

  async verifyNewUserRequest(user: UserWithPassword) {
    const foundUser = await this.userRepository.findOne({
      where: {email: user.email.toLowerCase()},
    });
    if (foundUser) {
      throw new HttpErrors.Conflict('User with this Email already exist!.');
    }
  }
  async convertToUserProfile(tenantId: string, companyName: string, user: User, roles: (string | undefined)[]): Promise<UserProfile> {
    // since first name and lastName are optional, no error is thrown if not provided
    let userName = '';
    if (user.firstName) userName = `${user.firstName}`;
    if (user.lastName)
      userName = user.firstName
        ? `${userName} ${user.lastName}`
        : `${user.lastName}`;
    return {
      [securityId]: user.id,
      name: userName,
      id: user.id,
      companyId: user.companyId,
      companyName: companyName,
      tenantId: tenantId,
      permissions: roles

    };
  }

  async createUser(userWithPassword: UserWithPassword): Promise<User> {
    await this.verifyNewUserRequest(userWithPassword);


    // make admin field false.
    if (!userWithPassword.isAdmin) userWithPassword.isAdmin = false;

    userWithPassword.joinDate = new Date();
    userWithPassword.username = userWithPassword.email.toLowerCase();
    userWithPassword.email = userWithPassword.email.toLowerCase();
    userWithPassword.isActive = true;

    const password = await this.passwordHasher.hashPassword(
      userWithPassword.password,
    );
    userWithPassword.password = password;
    const user = await this.userRepository.create(
      _.omit(userWithPassword, 'password'),
    );
    user.id = user.id.toString();
    await this.userRepository.userCredentials(user.id).create({password});

    // add roles to newly created user
    await this.createUserRolesByRoleId(user.id, user.roleId);

    return user;
  }

  // assign roles to users using Roles table which is linked to RolePermission
  // you need to pass roleId and userId.
  async createUserRolesByRoleId(userId: string, roleId: number): Promise<Count> {
    let count = 0;
    try {

      await this.userRolesRepository.deleteAll({userId})
      // get all role permissions with sub app feature id
      const rolepersmission = await this.rolePermissionsRepository.find(
        {
          where: {rolesId: roleId}
        }
      );
      for (const r of rolepersmission) {
        const found = await this.userRolesRepository.findOne({
          where: {userId: userId, rolePermissionsId: r.id, appFeaturesOneSId: r.appFeaturesOneSId}
        })
        if (!found) {
          count += 1;
          await this.userRepository.userRoles(userId).create({
            rolePermissionsId: r.id,
            appFeaturesOneSId: r.appFeaturesOneSId
          });
        }
      }
    } catch (e) {
      throw new HttpErrors.UnprocessableEntity("Error Happened while assigning roles");
    }

    return {count};

  }

  // update password

  async resetPassword(userId: string, password: string): Promise<Count> {
    const passwordHash = await this.passwordHasher.hashPassword(password);
    return this.userRepository
      .userCredentials(userId)
      .patch({password: passwordHash});

  }

}
