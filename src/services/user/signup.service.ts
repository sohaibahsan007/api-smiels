import {inject} from '@loopback/core';
import {repository} from '@loopback/repository';
import {HttpErrors} from '@loopback/rest';
import {JWTService} from '../../authorization';
import {environment} from '../../environments';
import {AuthServiceBindings, EmailManagerBindings} from '../../keys';
import {Email} from '../../models';
import {EmailHistoryRepository, UserRepository} from '../../repositories';
import {SignupTemplate} from '../../static';
import {EmailService} from '../email/email.service';
export interface Signup {
  firstName: string,
  lastName: string;
  email: string;
  dateStamp?: Date;
};
export class SignupService {
  constructor(
    @repository(UserRepository)
    private userRepository: UserRepository,
    @repository(EmailHistoryRepository)
    private emailHistoryRepository: EmailHistoryRepository,
    @inject(AuthServiceBindings.JWT_SERVICE)
    private jwtService: JWTService,
    @inject(EmailManagerBindings.SEND_MAIL)
    private emailService: EmailService,
  ) { }

  async sendConfirmationEmail(body: Signup) {
    const foundUser = await this.userRepository.findOne({
      where: {email: body.email.toLowerCase()},
    });
    if (foundUser) {
      throw new HttpErrors.Conflict('Email is already registered');
    }
    body.dateStamp = new Date();
    // generate token
    const token = await this.jwtService.generatedynamicToken(body);

    const name = body.firstName + ' ' + body.lastName;
    const url = environment.webUrl + `/register?token=${token}`;
    const subject = `Welcome ${name}`;

    // prepare email object
    const email: Email = {
      from: environment.noreplyEmail,
      to: body.email,
      subject: subject,
      html: new SignupTemplate(name, url, 'Confirm Account').html,
    }
    // create history record
    await this.emailHistoryRepository.create(
      {
        type: 'signup',
        sendTo: body.email,
        senderName: name,
        subject: subject,
        dateStamp: new Date()
      });

    // send email
    await this.emailService.sendMail(email);
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
