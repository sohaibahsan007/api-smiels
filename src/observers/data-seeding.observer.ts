import {
  Application,
  CoreBindings,
  inject,
  lifeCycleObserver,
  LifeCycleObserver
} from '@loopback/core';
import {repository} from '@loopback/repository';
import * as _ from 'lodash';
import {AppFeaturesOneSRepository, AppFeaturesRepository, RolePermissionsRepository, RolesRepository} from '../repositories';
@lifeCycleObserver('')
export class DataSeedingObserver implements LifeCycleObserver {
  constructor(
    @inject(CoreBindings.APPLICATION_INSTANCE) private app: Application,
    @repository(AppFeaturesRepository)
    public appFeaturesRepository: AppFeaturesRepository,
    @repository(AppFeaturesOneSRepository)
    public appFeaturesOneSRepository: AppFeaturesOneSRepository,
    @repository(RolesRepository)
    public rolesRepository: RolesRepository,
    @repository(RolePermissionsRepository)
    public rolePermissionsRepository: RolePermissionsRepository,
  ) { }

  /**
   * This method will be invoked when the application starts
   */
  async start(): Promise<void> {
    await this.createAppFeatures();
    await this.createRolesandPermissions();
  }

  /**
   * This method will be invoked when the application stops
   */
  async stop(): Promise<void> {
    // Add your logic for stop
  }

  async createAppFeatures(): Promise<void> {
    const features = [
      {
        id: 1,
        featureName: 'User Module',
        isActive: true,
        appFeaturesOneS: [
          {
            id: 'UserC',
            subFeatureName: 'User Create',
            isActive: true,
          },
          {
            id: 'UserR',
            subFeatureName: 'User Read',
            isActive: true,
          },
          {
            id: 'UserRA',
            subFeatureName: 'User Read All',
            isActive: true,
          },
          {
            id: 'UserU',
            subFeatureName: 'User Update',
            isActive: true,
          },
          {
            id: 'UserUA',
            subFeatureName: 'User Update All',
            isActive: true,
          },
          {
            id: 'UserD',
            subFeatureName: 'User Delete',
            isActive: true,
          }
        ]
      },
      {
        id: 2,
        featureName: 'Company Module',
        isActive: true,
        appFeaturesOneS: [
          {
            id: 'CompanyC',
            subFeatureName: 'Company Create',
            isActive: true,
          },
          {
            id: 'CompanyR',
            subFeatureName: 'Company Read',
            isActive: true,
          },
          {
            id: 'CompanyRA',
            subFeatureName: 'Company Read All',
            isActive: true,
          },
          {
            id: 'CompanyU',
            subFeatureName: 'Company Update',
            isActive: true,
          },
          {
            id: 'CompanyUA',
            subFeatureName: 'Company Update All',
            isActive: true,
          },
          {
            id: 'CompanyD',
            subFeatureName: 'Company Delete',
            isActive: true,
          }
        ]
      },
    ];

    for (const f of features) {
      const found = await this.appFeaturesRepository.findOne({where: {id: f.id}});
      if (!found) {
        await this.appFeaturesRepository.create(_.pick(f, ['id', 'featureName', 'isActive']));
      }
      for (const subf of f.appFeaturesOneS) {
        const subfound = await this.appFeaturesOneSRepository.findOne({where: {id: subf.id}});
        if (!subfound) {
          await this.appFeaturesRepository.appFeaturesOneS(f.id).create(subf);
        }
      }
    }
  }

  // create Roles and Permissions
  async createRolesandPermissions(): Promise<void> {
    const roles = [
      {
        id: 1,
        name: 'Admin',
        rolePermissions: [
          {
            appFeaturesOneSId: 'UserC',
          },
          {
            appFeaturesOneSId: 'UserR',

          },
          {
            appFeaturesOneSId: 'UserRA',

          },
          {
            appFeaturesOneSId: 'UserU',

          },
          {
            appFeaturesOneSId: 'UserUA',

          },
          {
            appFeaturesOneSId: 'UserD',

          },
          {
            appFeaturesOneSId: 'CompanyR',

          },
          {
            appFeaturesOneSId: 'CompanyU',

          }
        ]
      }
    ];

    for (const r of roles) {
      const found = await this.rolesRepository.findOne({where: {id: r.id}});
      if (!found) {
        await this.rolesRepository.create(_.pick(r, ['id', 'name']));
      }
      for (const p of r.rolePermissions) {
        const subfound = await this.rolePermissionsRepository.findOne({where: {rolesId: r.id, appFeaturesOneSId: p.appFeaturesOneSId}});
        if (!subfound) {
          await this.rolesRepository.rolePermissions(r.id).create(p);
        }
      }
    }
  }
}
