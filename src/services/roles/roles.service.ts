import {repository} from '@loopback/repository';
import {UserRolesRepository} from '../../repositories';
export interface IRolesMangementService {
  getUserRolesByUserId(userId: string): Promise<(string | undefined)[]>;
}
export class RolesManagementService implements IRolesMangementService {
  constructor(
    @repository(UserRolesRepository)
    private userRolesRepository: UserRolesRepository,
  ) { }

  async getUserRolesByUserId(userId: string): Promise<(string | undefined)[]> {
    const getRoles = await this.userRolesRepository.find({
      where: {userId: userId}
    });
    const roles = getRoles.map(a => a.appFeaturesOneSId);
    return roles ?? [];
  }

}
