import {
  Application,
  CoreBindings,
  inject,
  lifeCycleObserver,
  LifeCycleObserver
} from '@loopback/core';
import {repository} from '@loopback/repository';
import * as _ from 'lodash';
import {PermissionKey} from '../authorization';
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
            id: PermissionKey.UserCreate,
            subFeatureName: 'User Create',
            isActive: true,
          },
          {
            id: PermissionKey.UserRead,
            subFeatureName: 'User Read',
            isActive: true,
          },
          {
            id: PermissionKey.UserReadAll,
            subFeatureName: 'User Read All',
            isActive: true,
          },
          {
            id: PermissionKey.UserUpdate,
            subFeatureName: 'User Update',
            isActive: true,
          },
          {
            id: PermissionKey.UserUpdateAll,
            subFeatureName: 'User Update All',
            isActive: true,
          },
          {
            id: PermissionKey.UserDelete,
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
            id: PermissionKey.CompanyCreate,
            subFeatureName: 'Company Create',
            isActive: true,
          },
          {
            id: PermissionKey.CompanyRead,
            subFeatureName: 'Company Read',
            isActive: true,
          },
          {
            id: PermissionKey.CompanyReadAll,
            subFeatureName: 'Company Read All',
            isActive: true,
          },
          {
            id: PermissionKey.CompanyUpdate,
            subFeatureName: 'Company Update',
            isActive: true,
          },
          {
            id: PermissionKey.CompanyUpdateAll,
            subFeatureName: 'Company Update All',
            isActive: true,
          },
          {
            id: PermissionKey.CompanyDelete,
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
            appFeaturesOneSId: PermissionKey.UserCreate,
          },
          {
            appFeaturesOneSId: PermissionKey.UserRead,
          },
          {
            appFeaturesOneSId: PermissionKey.UserReadAll,
          },
          {
            appFeaturesOneSId: PermissionKey.UserUpdate,
          },
          {
            appFeaturesOneSId: PermissionKey.UserUpdateAll,
          },
          {
            appFeaturesOneSId: PermissionKey.UserDelete,
          },
          {
            appFeaturesOneSId: PermissionKey.CompanyRead,
          },
          {
            appFeaturesOneSId: PermissionKey.CompanyUpdate,
          },
          {
            appFeaturesOneSId: PermissionKey.MyProfile,
          }
        ]
      },
      {
        id: 2,
        name: 'Inventory Manager',
        rolePermissions: [
          {
            appFeaturesOneSId: PermissionKey.UserCreate,
          },
          {
            appFeaturesOneSId: PermissionKey.UserRead,
          },
          {
            appFeaturesOneSId: PermissionKey.UserReadAll,
          },
          {
            appFeaturesOneSId: PermissionKey.UserUpdate,
          },
          {
            appFeaturesOneSId: PermissionKey.UserUpdateAll,
          },
          {
            appFeaturesOneSId: PermissionKey.UserDelete,
          },
          {
            appFeaturesOneSId: PermissionKey.CompanyRead,
          },
          {
            appFeaturesOneSId: PermissionKey.MyProfile,
          }
        ]
      },
      {
        id: 3,
        name: 'Inventory Clerk',
        rolePermissions: []
      },
      {
        id: 4,
        name: 'Sales Manager',
        rolePermissions: []
      },
      {
        id: 5,
        name: 'Sales Person',
        rolePermissions: []
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
