const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const mailAccount = require('./info.js');

const app = express();


// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Ok');
});

app.post('/send', async (req, res) => {
  const output = `
    <p>You have a new contact request</p>
    <h3>Contact Details</h3>
    <ul>  
      <li>Name: ${req.body.name}</li>
      <li>Company: ${req.body.company}</li>
      <li>Email: ${req.body.email}</li>
      <li>Phone: ${req.body.phone}</li>
    </ul>
    <h3>Message</h3>
    <p>${req.body.message}</p>
  `;

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: mailAccount.user, // generated ethereal user
      pass: mailAccount.pass, // generated ethereal password
    },
  });

  let info = await transporter.sendMail({
    from: '"Your Website" <info@calinteacu.com>', // sender address
    to: "caserutudor@yahoo.com", // list of receivers
    subject: "New client", // Subject line
    text: JSON.stringify(req.body), // plain text body
    html: output, // html body
  });

  res.send("Message sent: %s", info.messageId);
});

app.listen(3000, () => console.log('Server started...'));