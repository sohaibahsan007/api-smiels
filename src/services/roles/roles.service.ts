import {repository} from '@loopback/repository';
import {UserRolesRepository} from '../../repositories';

export class RolesManagementService {
  constructor(
    @repository(UserRolesRepository)
    private userRolesRepository: UserRolesRepository,
  ) { }

  async getUserRolesByUserId(userId: string) {
    const getRoles = await this.userRolesRepository.find({
      where: {userId: userId}
    });
    const roles = getRoles.map(a => a.appFeaturesOneSId);
    return roles ?? [];
  }

}
