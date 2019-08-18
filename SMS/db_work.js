exports.db_log = function() {
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/Sculp";

    const _from = require('./app.js');
    let _email = _from.sendEmail(); //receives Email of the user
    let _mobile = _from.sendMobile(); //receives Mobile number of the user
    let _otp1 = _from.sendOtp(); //receives EmailOTP of the user
    let _otp2 = _from.sendMobileOtp(); //receives MobileOTP of the user
    var datetime = new Date(); ////receives current GMT time.

    console.log(datetime);

    MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
        if (err) throw err;

        console.log("Database created!");
        var dbo = db.db("Sculp");
        dbo.createCollection("email_verification", function(err, res) {
            if (err) throw err;
            console.log("Collection created!");
            var myobj = { email: _email, Emailotp: _otp1, moblie: _mobile, MobileOtp: _otp2, is_verified: 0, timestamp: datetime };
            dbo.collection("email_mobile_verification").insertOne(myobj, function(err, res) {
                if (err) throw err;
                console.log("Number of documents inserted: " + res.insertedCount);
                db.close();
            });
        });
    });
}