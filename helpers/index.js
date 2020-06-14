const MailConfig = require('../config/email');
const FromSender = `${MailConfig.SenderEmailData().NANE} <${MailConfig.SenderEmailData().EMAIL}>`
const MailMessage = require('./message')
var path = require('path');
const pug = require('pug');
const mjml2html = require('mjml')

let confirmEmail = mjml2html(`
<mjml>
  <mj-body>
    <mj-section>
      <mj-column>
        <mj-text>
          Hello World!
        </mj-text>
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>
`, {keepComments: false, beautify:true, minify: true});



function prepareConfirmEmail(to, subject) {

    return {
        from: FromSender,
        to: to,
        subject: MailConfig.SubjectEmails(
            MailConfig.TypesEmail().CONFIRM_EMAIL
        ),
        // text: "Hello world?", // plain text body
        // html: MailMessage.ConfirmEmail, // html body

        // template: '/home/neyy/work/radar/notifications/template/confirm-email.pug'
        // template: path.join(__dirname, '../views/index.html')

        html: pug.renderFile(path.join(__dirname, '../views/confirm-email.pug'), {
            name: 'Timothy'
        })
        // template:  path.join(__dirname, '../views/email-template.mjml')
        // html:  confirmEmail.html
    }
}


function prepareResponse(status, data) {
    return {
        status: status || 200,
        data: data
    }
}

function prepareErrorResponse(status, message, data) {
    return {
        status: status,
        message: message || 'Error response',
        data: data || {}
    }
}


module.exports = {
    PrepareConfirmEmail: prepareConfirmEmail,
    PrepareResponse: prepareResponse,
    PrepareErrorResponse: prepareErrorResponse
}