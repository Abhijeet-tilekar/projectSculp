 const db_work = require('./db_work');
 const nodemailer = require('nodemailer');
 const Nexmo = require('nexmo');
 const socketio = require('socket.io');

 const io = socketio();

 const nexmo = new Nexmo({
     apiKey: '9950b278',
     apiSecret: 'D865qE2fsB5hR3WB'
 }, { debug: true });

 //code to generate otp
 function genotp(length) {

     var chars = '0123456789'.split('');
     var str = '';
     for (var i = 0; i < length; i++) {
         str += chars[Math.floor(Math.random() * chars.length)];
     }
     return (str);
 }

 function sendText(mob, otp) {

     const number = mob;
     const text = 'test message OTP =>' + otp;

     nexmo.message.sendSms(
         '919421785433', number, text, { type: 'unicode' },
         (err, responseData) => {
             if (err) {
                 console.log(err);
             } else {
                 const { messages } = responseData;
                 const {
                     ['message-id']: id, ['to']: number, ['error-text']: error
                 } = messages[0];
                 console.dir(responseData);
                 // Get data from response
                 const data = {
                     id,
                     number,
                     error
                 };

                 // Emit to the client
                 io.emit('smsStatus', data);
             }
         }
     );
 }
 //creates settings and sends mail
 function sendMail(email, otp) {
     const transporter = nodemailer.createTransport({
         host: 'smtp.gmail.com',
         port: 465,
         secure: true,
         auth: {
             type: 'OAuth2',
             user: 'saad.ahmed@onval.co',
             clientId: '366209567621-l6ifn5hp7alh3fn2iuc6tmuss3bug5i4.apps.googleusercontent.com',
             clientSecret: 'bq6WlQ8bS0LGi-4aQLVKSmoC',
             refreshToken: '1/ufShwABzttbcuYzxzBzBjFwP0_WiTPEPffB004EgYX6YyFtzssr2IA-cJ71sXvTy',
             accessToken: 'ya29.GltdB6ZzpsbMXIdLOsYYicsk0OX-g7bsa8_njg81FP2DhFq5dSERwnKmVMBzgMBZmqCyHQz8xQ6NaQNWKZAPcylmdtw0mYCL6vzvxg3_w0vA3rVt5BGNY4LENe5m'
         }
     });


     var mailOption = {
         from: 'Saad Ahmed <saad.ahmed@onval.co>',
         to: email,
         subject: 'Email Verification',
         text: 'Your One Time Password for E-mail verification is : ' + otp
     };


     transporter.sendMail(mailOption, function(err, res) {
         if (err) {
             console.log("Error Occurred: " + err);
         } else {
             console.log('Mail sent Successfully!' + otp + " -- " + email);
         }
     });

 }

 function otp_generate() {

     var email = 'abhijeet8900@gmail.com' //jisko bhejna hai uska mail id
     var mobile = '919657663844'; //mobile number jisko bhejna hai...

     var otpMail = genotp(4);
     var otpMobile = genotp(4);

     sendMail(email, otpMail);
     sendText(mobile, otpMobile);

     //-----------------------
     exports.sendEmail = function() {
         return (email);
     }
     exports.sendOtp = function() {
         return (otpMail);
     }

     exports.sendMobileOtp = function() {
         return (otpMobile);
     }
     exports.sendMobile = function() {
         return (mobile);
     }

     //---------------------
     db_work.db_log();
 }
 otp_generate();