const MailConfig = require('../config/email');
const Helper = require('../helpers/index')
const nodemailer = require('nodemailer')
var smtpTransport = MailConfig.SMTPTransport;


async function ConfirmEmail(req) {

    const options = Helper.PrepareConfirmEmail(
        req.body.to
    )

    if (!process.env.SMTP_HOST) {
        smtpTransport = await MailConfig.testSMTPTransport()
    }

    return new Promise((resolve, reject) => {
        smtpTransport.verify((error, success) => {
            if (error) {
                return reject({
                    output: 'error',
                    message: error && error.message
                })

            } else {
                return smtpTransport.sendMail(options, (error, info) => {
                    if (error) {
                        return reject({
                            output: 'error',
                            message: error && error.message
                        })
                    }

                    console.log('Message %s sent: %s', info.messageId, info.response);
                    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

                    return resolve({
                        output: 'success',
                        message: info
                    })

                });
            }
        })
    })
}


module.exports = {
    ConfirmEmail: ConfirmEmail
}