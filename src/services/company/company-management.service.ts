import {inject} from '@loopback/core';
import {Count, repository} from '@loopback/repository';
import {HttpErrors} from '@loopback/rest';
import {CompanyServicesBindings, MultiTenancyBindings, UserServiceBindings} from '../../keys';
import {Company, NewCompanyRequest} from '../../models';
import {Tenant} from '../../multi-tenancy';
import {CompanyRepository, UserRepository} from '../../repositories';
import {TenantInfo} from '../../specs';
import {SignupService} from '../user/signup.service';
import {UserManagementService} from '../user/user-management.service';

export class CompanyManagementService {
  constructor(
    @repository(CompanyRepository)
    private companyRepository: CompanyRepository,
    @repository(UserRepository)
    private userRepository: UserRepository,
    @inject(UserServiceBindings.USER_MANAGEMENT)
    private userManagementService: UserManagementService,
    @inject(CompanyServicesBindings.SIGN_UP)
    private singupService: SignupService,
    @inject(MultiTenancyBindings.CURRENT_TENANT, {optional: true})
    private tenant?: Tenant
  ) { }


  async validateInfo(company: NewCompanyRequest) {

    const verifyInviteToken = await this.singupService.verifyConfirmation(company.inviteToken);
    if (!verifyInviteToken) {
      throw new HttpErrors.Conflict('invite is expired.');
    }

    if (verifyInviteToken.email !== company.user.email) {
      throw new HttpErrors.Conflict('provided email is not matched with verified one.');
    }

    const foundDomain = await this.companyRepository.findOne({
      where: {subDomain: company.subDomain.toLowerCase()}
    })
    if (foundDomain) {
      throw new HttpErrors.Conflict('subDomain already exist');
    }

    const foundEmail = await this.userRepository.findOne({
      where: {email: verifyInviteToken.email.toLowerCase()}
    })
    if (foundEmail) {
      throw new HttpErrors.NotAcceptable('user is already registered with same email');
    }

    return verifyInviteToken.email;
  }

  // create new comany with admin user.
  async createCompanywithUser(company: NewCompanyRequest): Promise<Company> {
    // validate subDomain and user email address
    const email = await this.validateInfo(company);
    const user = company.user;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const icom = company as any;
    /// create company
    icom.joinDate = new Date();


    /// delete extra attached values
    delete icom.user;
    delete icom.inviteToken;
    delete icom.users;

    /// create operation
    const newcompany = await this.companyRepository.create(icom as Company);

    try {
      user.companyId = newcompany.id as string;
      user.isAdmin = true;
      user.email = email;
      user.emailVerified = true;
      const newuser = await this.userManagementService.createUser(user);
      // assign all the rights to the user
      await this.userManagementService.createUserRolesByRoleId(newuser.id, 1);
      return newcompany;
    } catch (error) {
      await this.companyRepository.deleteById(newcompany.id);
      throw new HttpErrors.BadRequest(error);
    }
  }


  /// get company info byId
  async verifyCompanyById(id: string): Promise<Company> {
    const company = await this.companyRepository.findById(id);
    if (this.tenant?.id === company.subDomain) {
      return company;
    } else {
      throw new HttpErrors.BadRequest('Unauthorized Request');
    }
  }

  async getTenantInfo(): Promise<TenantInfo> {
    const company = await this.companyRepository.findOne({where: {subDomain: this.tenant?.id}});
    if (!company || !this.tenant) {
      throw new HttpErrors.BadRequest('Tenant Not Found');
    }
    return {name: company?.name, logoUrl: company?.logoUrl};
  }

  async validateSubDomain(domain: string): Promise<Count> {
    const company = await this.companyRepository.findOne({where: {subDomain: domain.toLowerCase()}});
    if (company) {
      return {count: 1}
    } else {
      return {count: 0}
    }
  }

}
