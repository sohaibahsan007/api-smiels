import {environment} from '../../environments';
import {Email} from '../../models';
const sgMail = require('@sendgrid/mail');
export class EmailService {
  constructor() {
    sgMail.setApiKey(environment.sendGridKey);
  }
  async sendMail(mailObj: Email) {
    try {
      await sgMail.send(mailObj);
    } catch (error) {
      console.error(error);
      if (error.response) {
        console.error(error.response.body)
      }
    }
  }
}
