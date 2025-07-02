import UserModel from '../../models/UserModel';
import { sendEmail } from './sendEmail';
import { addCreatorToUser } from '~/utils/authentication';

export const sendUserInviteApproval = (pubsub) => {
  return async (_, args) => {
    const userId = args.userId;
    const invitedUser = await UserModel.findById(userId);
    invitedUser.status = args.inviteStatus;
    await UserModel.update(
      { _id: userId },
      invitedUser,
      {
        upsert: true,
        new: true
      }
    );
    const mailTo = invitedUser.email;
    const clientUrl = process.env.CLIENT_URL;
    let mailOptions = {
      to: mailTo, // list of receivers
      from: `"Quote Admin" <${process.env.FROM_EMAIL}>`, // sender address
    };

    if (parseInt(args.inviteStatus) === 4) { // Approved
      const expiresIn = 60 * 60 * 24; // 1 day
      const token = await addCreatorToUser({
        username: invitedUser.username,
        password: '',
        requirePassword: false
      }, () => {
      }, false, expiresIn, true);
      mailOptions.subject = 'Your invitation to Quote is approved';
      mailOptions.html = `
      <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml">
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta name="x-apple-disable-message-reformatting" />
          <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
          <style type="text/css" rel="stylesheet" media="all">
           @import url("https://fonts.googleapis.com/css?family=Nunito+Sans:400,700&display=swap");
            body {
              background-color: #f2f4f6;
              font-family: "Nunito Sans", Helvetica, Arial, sans-serif;
            }
            h1 {
              margin-top: 0;
              color: white;
              font-size: 22px;
              font-weight: bold;
              text-align: left;
            }
            p {
              color: #51545e;
              margin: 0.4em 0 1.1875em;
              font-size: 16px;
              line-height: 1.625;
            }
            .email-masthead {
              width: 578px;
              margin: 0 auto;
              padding: 25px 0;
            }
            .email-body_inner {
              width: 578px;
              margin: 0 auto;
              padding: 0;
              background-color: #ffffff;
            }
            .content-cell {
              padding: 45px;
            }
            .illustration, .button {
              display: block;
              margin-left: auto;
              margin-right: auto;
              margin-bottom: 30px;
            }
            .invite {
              font-weight: bold;
            }
            .button {
              background-color: #E91E63;
              border-top: 10px solid #E91E63;
              border-right: 18px solid #E91E63;
              border-bottom: 10px solid #E91E63;
              border-left: 18px solid #E91E63;
              width: 250px;
              font-size: 16px;
              color: #fff;
              text-align: center;
              text-decoration: none;
              border-radius: 3px;
              box-shadow: 0 2px 3px rgba(0, 0, 0, 0.16);
              -webkit-text-size-adjust: none;
              box-sizing: border-box;
            }
            .email-footer {
              width: 578px;
              margin: 0 auto;
              padding: 0;
              background-color: #dbe7f2;
              text-align: center;
            }
            .footer-header {
              color: #51545e;
            }
            .share-your-thoughts-anchor {
              text-decoration: none;
              color: #424555
            }
            .footer-span {
              color: #52b274;
            }
            .footer-border {
              border-bottom: 1px solid #b0b0dad2;
              width: 100%;
              text-align: left;
              padding-bottom: 30px;
            }
            .footer-p {
              text-align: left;
              font-size: 14px;
              padding-top: 30px;
            }
            .customer-agreements-anchor {
                color: #424555
            }
          </style>
        </head>
        <body>
          <div class="email-masthead">
            <a
              href="https://quote.vote/"
            >
              <img src=${process.env.CLIENT_URL + "/email-images/QuoteIcon.png"} />
            </a>
          </div>
          <div class="email-body_inner">
            <img src=${process.env.CLIENT_URL + "/email-images/WelcomeEmailBanner.png"} />
              <div class="content-cell">
                <img class="illustration" src=${process.env.CLIENT_URL + "/email-images/welcome-illustration.png"} />
                <p>
                  <span class="invite">You are invited to join Quote.</span> Please continue with the process to be part of our community.
                </p>
                <a
                  href="${clientUrl}/auth/signup?token=${token}"
                  class="button"
                >CREATE YOUR PASSWORD
              </a>
                <p>Thank you,</p>
                <h4>Quote Team</h4>
              </div>  
                <div class="email-footer">
                  <div class="content-cell">
                  <div class="footer-border">
                    <h1 class="footer-header">
                      <a class="share-your-thoughts-anchor" href="https://quote.vote/">
                         Share <span class="footer-span">your thoughts</span>, ideas and plans
                      </a>
                    </h1>
                  </div>
                  <p class="footer-p">
                    This email was sent to you by Quote. By using our services, you agree to our
                    <a class="customer-agreements-anchor" href="https://quote.vote/">customer agreements.</a> ©Quote Vote 2020. All rights reserved.
                  </p>
              </div>  
            </div>
          </div>
        </body>
      </html>
      `;
    } else if (parseInt(args.inviteStatus) === 2) { // Declined
      mailOptions.subject = 'Your invitation to Quote has been declined';
      mailOptions.html = `
      <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml">
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta name="x-apple-disable-message-reformatting" />
          <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
          <style type="text/css" rel="stylesheet" media="all">
           @import url("https://fonts.googleapis.com/css?family=Nunito+Sans:400,700&display=swap");
            body {
              background-color: #f2f4f6;
              font-family: "Nunito Sans", Helvetica, Arial, sans-serif;
            }
            h1 {
              margin-top: 0;
              color: white;
              font-size: 22px;
              font-weight: bold;
              text-align: left;
            }
            p {
              color: #51545e;
              margin: 0.4em 0 1.1875em;
              font-size: 16px;
              line-height: 1.625;
            }
            .email-masthead {
              width: 578px;
              margin: 0 auto;
              padding: 25px 0;
            }
            .email-body_inner {
              width: 578px;
              margin: 0 auto;
              padding: 0;
              background-color: #ffffff;
            }
            .content-cell {
              padding: 45px;
            }
            .email-footer {
              width: 578px;
              margin: 0 auto;
              padding: 0;
              background-color: #dbe7f2;
              text-align: center;
            }
            .footer-header {
              color: #51545e;
            }
            .share-your-thoughts-anchor {
              text-decoration: none;
              color: #424555
            }
            .footer-span {
              color: #52b274;
            }
            .footer-border {
              border-bottom: 1px solid #b0b0dad2;
              width: 100%;
              text-align: left;
              padding-bottom: 30px;
            }
            .footer-p {
              text-align: left;
              font-size: 14px;
              padding-top: 30px;
            }
            .customer-agreements-anchor {
                color: #424555
            }
          </style>
        </head>
        <body>
          <div class="email-masthead">
            <a
              href="https://quote.vote/"
            >
              <img src=${process.env.CLIENT_URL + "/email-images/QuoteIcon.png"} />
            </a>
          </div>
          <div class="email-body_inner">
            <img src=${process.env.CLIENT_URL + "/email-images/invitation-declined-banner.png"} />
              <div class="content-cell">
                <p>
                  We regret to inform you that your request for invitation to Quote has been
                  declined. 
                  <br />
                  <br />
                  Please feel free to try again at a later date for futher consideration.
                  <br />
                  <br />
                  Regards, 
                  <br />
                  <br />
                  Quote Team.
                </p>
              </div>  
                <div class="email-footer">
                  <div class="content-cell">
                  <div class="footer-border">
                    <h1 class="footer-header">
                      <a class="share-your-thoughts-anchor" href="https://quote.vote/">
                         Share <span class="footer-span">your thoughts</span>, ideas and plans
                      </a>
                    </h1>
                  </div>
                  <p class="footer-p">
                    This email was sent to you by Quote. By using our services, you agree to our
                    <a class="customer-agreements-anchor" href="https://quote.vote/">customer agreements.</a> ©Quote Vote 2020. All rights reserved.
                  </p>
              </div>  
            </div>
          </div>
        </body>
      </html>
      `;
    } else {
      return {
        code: 'SUCCESS',
        message: `User Invite reset`
      };
    }
    const email = await sendEmail(mailOptions);

    //  ***   TODO test to see if email was sent   ***
    if (email) {
      return {
        code: 'SUCCESS',
        message: `User sign-up invite sent successfully to ${mailTo}.`
      };
    }
    console.log('no email returned');
    return {
      code: 'FAILURE',
      message: 'Mail transporter failed to return a response'
    };
  };
};
