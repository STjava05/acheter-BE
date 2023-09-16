const express = require('express');
const email = express.Router();
const cors = require('cors');
const nodemailer = require('nodemailer');



const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'ouzinnbis@hotmail.it',
    pass: 'Lifofifo11?'
  }
});

const mailOptions = {
  from: 'ouzinnbis@hotmail.it',
  to: 'ouzinnbis@hotmail.it',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});

// const transport = createTransport({
//     host: 'smtp.ethereal.email',
//     port: 587,
//     auth: {
//         user: 'van.ortiz7@ethereal.email',
//         pass: 'wkQUXJuQVEaW1XqKpH'
//     }
// });

// email.post('/send', (req, res) => {
//     const {name, email, message} = req.body;
//     const mailOptions = {
//         from: 'ouzinnbis@hotmail.it',
//         to: email,
//         subject:`${name} sent you a message`,
//         text: message
//     };  
//     transport.sendMail(mailOptions, (error, info) => {
//         if(error){
//             res.status(500).send(error.message)
//         }else{
//             console.log('Email sent');
//             res.status(200).json(req.body);
//         }
//     }
//     )
// })

module.exports = email;