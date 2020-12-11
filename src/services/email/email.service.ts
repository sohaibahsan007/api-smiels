import {inject} from '@loopback/core';
import {repository} from '@loopback/repository';
import {SecurityBindings, UserProfile} from '@loopback/security';
import {JWTService} from '../../authorization';
import {environment} from '../../environments';
import {AuthServiceBindings} from '../../keys';
import {Email, UserWithPassword} from '../../models';
import {EmailHistoryRepository} from '../../repositories';
import {SignupTemplate} from '../../static';
import {NewMemeberTemplate} from '../../static/emailTemplates/new-member';
import {Signup} from '../user/signup.service';
const sgMail = require('@sendgrid/mail');
export interface IEmailService {
  sendMail(mailObj: Email, emailType: string, sentByName?: string): Promise<void>;
  sendConfirmationEmail(body: Signup): Promise<boolean>;
  sendNewMemberEmail(user: UserWithPassword): Promise<void>;
}

export class EmailService implements IEmailService {
  constructor(
    @repository(EmailHistoryRepository)
    private emailHistoryRepository: EmailHistoryRepository,
    @inject(AuthServiceBindings.JWT_SERVICE)
    private jwtService: JWTService,
    @inject(SecurityBindings.USER, {optional: true})
    public user: UserProfile,
  ) {
    sgMail.setApiKey(environment.sendGridKey);
  }

  async sendMail(mailObj: Email, emailType: string, sentByName?: string) {
    try {
      mailObj.subject = environment.isDevelopment ? 'Dev-' + mailObj.subject : mailObj.subject;
      await sgMail.send(mailObj);

      // create history record
      await this.emailHistoryRepository.create(
        {
          type: emailType,
          sendTo: mailObj.to,
          senderName: sentByName,
          subject: mailObj.subject,
          dateStamp: new Date()
        });
    } catch (error) {
      console.error(error);
      if (error.response) {
        console.error(error.response.body)
      }
    }
  }

  async sendConfirmationEmail(body: Signup): Promise<boolean> {
    // generate token
    const token = await this.jwtService.generatedynamicToken(body);

    const name = body.firstName + ' ' + body.lastName;
    const url = this.generateWebUrl(`/register?token=${token}`);
    const subject = `Welcome ${name}`;

    // prepare email object
    const email: Email = {
      from: environment.noreplyEmail,
      to: body.email,
      subject: subject,
      html: new SignupTemplate(name, url, 'Confirm Account').html,
    }
    // send email
    await this.sendMail(email, 'signup', 'name');
    return true;
  }

  async sendNewMemberEmail(user: UserWithPassword): Promise<void> {

    const name = user?.firstName + ' ' + user?.lastName;
    const subject = `Welcome ${name}`;
    const url = this.generateWebUrl('/login', this.user.tenantId);

    // prepare email object
    const email: Email = {
      from: environment.noreplyEmail,
      to: user.email,
      subject: subject,
      html: new NewMemeberTemplate(this.user.companyName, name, user.email, user.password, url).html,
    }
    // send email
    await this.sendMail(email, 'signup', 'name');
  }

  /**
   * This method is to use for generate web url from environment
   * Please pass the end path like /register as url path
   * and Sub Domain with a dot
   * This method doesn't expect any request body.
   */
  generateWebUrl(urlPath: string, subDomain?: string) {

    if (subDomain) subDomain = subDomain + '.';
    else subDomain = '';

    return (environment.isDevelopment ? 'http://' : 'https://') + subDomain + environment.webUrl + urlPath;
  }

}
