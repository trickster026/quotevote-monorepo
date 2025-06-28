import UserModel from '../../models/UserModel';
import { sendEmail } from './sendEmail';
import { UserInputError } from 'apollo-server-express';

export const requestUserAccess = (pubsub) => {
  return async (_, args) => {
    const { requestUserAccessInput } = args;
    const { email } = requestUserAccessInput;
    console.log('checking mail for', email);

    const existingUser = await UserModel.findOne({ email });
    console.log('Existing user', existingUser);
    let user;
    if (!existingUser) {

      const userArgs = {
        username: email,
        email,
        status: 1, // prospect
      };
      user = await new UserModel(userArgs).save();

    } else {
      throw new UserInputError('Email already exists', {
        invalidArgs: Object.keys(args),
      });
    }
    const requestAccessUrl = process.env.REQUEST_ACCESS_URL; //this is the link for sharing with your friends

    //  ***   Send the email   ***
    const mailOptions = {
      to: email,
      from: `"Quote Admin" <${process.env.FROM_EMAIL}>`, // sender address
      subject: 'Be The First: quote.vote Invitation',
      html: `
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
              color: #00cf6e;
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
            <img src=${process.env.CLIENT_URL + "/email-images/received-banner.png"}/>
              <div class="content-cell">
                <img class="illustration" src=${process.env.CLIENT_URL + "/email-images/received-illustration.png"}/>
                <h4>
                  Thank you for requesting an invite to
                  <a href="https://quote.vote/">quote.vote</a>!
                </h4>
                <p>
                  Feel free to reply to this message to introduce
                  yourself, suggest ideas, or even join our project. You
                  can really help us out by sharing with your friends:
                </p>
                <a
                  href="https://quote.vote/"
                  class="button"
                >SHARE QUOTE
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
                    <a class="customer-agreements-anchor" href="https://quote.vote/">customer agreements.</a> ©VoxPOP 2020. All rights reserved.
                  </p>
              </div>  
            </div>
          </div>
        </body>
      </html>
          `,
    };

    const sendMailResult = await sendEmail(mailOptions);
    if (sendMailResult) {
      console.log(`SUCCESS: User invite sent successfully to ${email}.`);
    } else {
      console.log(`FAILURE: Mail transporter failed to return a response`);
    }

    return user;
  };
};
