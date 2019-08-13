const OTPVerify  = require('./testModule').verifyOTP;
const express = require('express');
const bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());
app.listen(3000, () => console.log('Server started at port : 3000'));


app.get('/OTP',function(req,res){
    //if(err){console.log(err)}
    res.send(200,OTPVerify("abhijeet8900@gmail.com"));
})