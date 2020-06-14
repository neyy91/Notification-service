let express = require("express"),
  path = require('path'),
  nodemailer = require('nodemailer'),
  bodyParser = require('body-parser');

  require('dotenv').config()

let app = express();

app.use(express.static('src'));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

let testAccount = {}

app.post('/send-email', function (req, res) {

  console.log("==== testAccount ====", testAccount, "\n")

  let transporter = nodemailer.createTransport({
      host: testAccount.smtp.host,
      port: testAccount.smtp.port,
      secure: testAccount.smtp.secure,
      auth: {
          // should be replaced with real sender's account
          user: testAccount.user,
          pass: testAccount.pass
      }
  });

  console.log("req.body.to =====", req.body.to)
  let mailOptions = {
      // should be replaced with real recipient's account
      from: testAccount.user,
      to: req.body.to,
      subject: req.body.subject,
      text: "Hello world?", // plain text body
      html: "<b>Hello world?</b>" // html body
  };
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
      console.log("===== error =====", error)
      console.log('Message %s sent: %s', info.messageId, info.response);

      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  });
  // res.writeHead(301, { Location: 'index.html' });
  // res.end();
  res.send('Hello World!');
});

let server = app.listen(process.env.HOST_PORT, async function(){
  testAccount = await nodemailer.createTestAccount();


    console.log("Server started at http://localhost:%s", process.env.HOST_PORT);
});





/**
 *       host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
          // should be replaced with real sender's account
          user: 'hello@gmail.com',
          pass: 'test'
      }
 */






















// var express = require('express');
// var app = express();
// require('dotenv').config()

// app.get('/', function (req, res) {
//   res.send('Hello World!');
// });

// app.listen(process.env.HOST_PORT, function () {
//   console.log('Example app listening on port ', process.env.HOST_PORT);
// });
