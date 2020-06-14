let nodemailer = require('nodemailer');
let environment = process.env;

var TestUser = {}

function _prepareTestUser() {
    return nodemailer.createTransport({
        host: TestUser.smtp.host,
        port: TestUser.smtp.port,
        secure: TestUser.smtp.secure,
        debug: true,
        auth: {
            user: TestUser.user,
            pass: TestUser.pass
        }
    })
}

function getTestSMTP() {
    if (Object.keys(TestUser).length != 0) {
        return _prepareTestUser()
    }
    return nodemailer.createTestAccount()
        .then(result => {
            TestUser = result
            return _prepareTestUser()
        })
        .catch(e => {
            return e
        })
}

function SMTPTransport() {
    return nodemailer.createTransport({
        host: environment.SMTP_HOST,
        port: environment.SMTP_PORT,
        secure: environment.SMPT_SECURE,
        debug: true,
        auth: {
            user: environment.SMTP_USER_NAME,
            pass: environment.SMPT_PASSWORD
        }
    })
}

function emailData() {
    return {
        NANE: environment.FROM_NAME,
        EMAIL: environment.FROM_EMAIL
    }
}

function subjectEmails(type) {
    let subject = 'New message'
    switch (type) {
        case typesEmail().CONFIRM_EMAIL:
            subject = 'Confirm email'
            break;
        case typesEmail().RESET_PASSWORD:
            subject = 'Reset password'
            break;
        case typesEmail().INVITE_LINK:
            subject = 'Invite link'
            break;

        default:
            break;
    }
    return subject
}

function typesEmail() {
    return {
        CONFIRM_EMAIL: 1,
        RESET_PASSWORD: 2,
        INVITE_LINK: 3

    }
}

module.exports = {
    testSMTPTransport: getTestSMTP,
    SMTPTransport: SMTPTransport,
    SenderEmailData: emailData,
    SubjectEmails: subjectEmails,
    TypesEmail : typesEmail
}