import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, HasManyRepositoryFactory, repository} from '@loopback/repository';
import {UserManagementSmielsDataSource} from '../../datasources';
import {AppFeatures, AppFeaturesOneS, AppFeaturesRelations} from '../../models';
import {AppFeaturesOneSRepository} from '../../repositories';

export class AppFeaturesRepository extends DefaultCrudRepository<
  AppFeatures,
  typeof AppFeatures.prototype.id,
  AppFeaturesRelations
  > {

  public readonly appFeaturesOneS: HasManyRepositoryFactory<AppFeaturesOneS, typeof AppFeatures.prototype.id>;

  constructor(
    @inject('datasources.UserManagement_SMIELS') dataSource: UserManagementSmielsDataSource, @repository.getter('AppFeaturesOneSRepository') protected appFeaturesOneSRepositoryGetter: Getter<AppFeaturesOneSRepository>,
  ) {
    super(AppFeatures, dataSource);
    this.appFeaturesOneS = this.createHasManyRepositoryFactoryFor('appFeaturesOneS', appFeaturesOneSRepositoryGetter,);
    this.registerInclusionResolver('appFeaturesOneS', this.appFeaturesOneS.inclusionResolver);
  }
}
