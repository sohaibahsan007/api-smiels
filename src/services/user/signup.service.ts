import {inject} from '@loopback/core';
import {repository} from '@loopback/repository';
import {HttpErrors} from '@loopback/rest';
import {JWTService} from '../../authorization';
import {AuthServiceBindings, EmailManagerBindings} from '../../keys';
import {UserRepository} from '../../repositories';
import {EmailService} from '../email/email.service';
export interface Signup {
  firstName: string,
  lastName: string;
  email: string;
  dateStamp?: Date;
};

export interface ISignupService {
  prepareConfirmationEmail(body: Signup): Promise<boolean>;
  verifyConfirmation(token: string): Promise<Signup>;
}
export class SignupService implements ISignupService {
  constructor(
    @repository(UserRepository)
    private userRepository: UserRepository,
    @inject(AuthServiceBindings.JWT_SERVICE)
    private jwtService: JWTService,
    @inject(EmailManagerBindings.SEND_MAIL)
    private emailService: EmailService,
  ) { }

  async prepareConfirmationEmail(body: Signup) {
    const foundUser = await this.userRepository.findOne({
      where: {email: body.email.toLowerCase()},
    });
    if (foundUser) {
      throw new HttpErrors.Conflict('Email is already registered');
    }
    body.dateStamp = new Date();
    return this.emailService.sendConfirmationEmail(body);
  }


  async verifyConfirmation(token: string): Promise<Signup> {
    let body: Signup;
    try {

      const decodedToken = await this.jwtService.verifydynamicToken(token) as Signup;

      body = Object.assign(
        {firstName: '', lastName: '', email: ''},
        {
          firstName: decodedToken.firstName,
          lastName: decodedToken.lastName,
          email: decodedToken.email,
          dateStamp: decodedToken.dateStamp,
        },
      );
    } catch (error) {
      throw new HttpErrors.NotAcceptable(
        `Error verifying token : ${error.message}`,
      );
    }

    return body;

  }



}
