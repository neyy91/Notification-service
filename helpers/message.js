const mjml2html = require('mjml')
var path = require('path');

// const confirmEmail = mjml2html(path.join(__dirname, '../views/email-template.mjml'), {})

var confirmEmail = mjml2html(`
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
`, {})

module.exports = {
  ConfirmEmail: confirmEmail
}