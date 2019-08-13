exports.db_log = function () {
        var MongoClient = require('mongodb').MongoClient;
        var url = "mongodb://localhost:27017/SculpTest";

        const _from = require('./app.js');
        let _email = _from.sendEmail();
        let _otp = _from.sendOtp();
        var datetime = new Date();
        console.log(datetime);

        // console.log(_otp + "---" + _email);


        MongoClient.connect(url, {
            useNewUrlParser: true
        }, function (err, db) {
            if (err) throw err;

            console.log("Database created!");
            var dbo = db.db("SculpTest");
            // dbo.createCollection("email_verification", function(err, res) {
            //     if (err) throw err;
            //     console.log("Collection created!");
            var myobj = {
                email: _email,
                otp: _otp,
                is_verified: 0,
                timestamp: datetime
            };
            dbo.collection("Log").insertOne(myobj, function (err, res) {
                if (err) throw err;
                console.log("Number of documents inserted: " + res.insertedCount);
                db.close();
            });
        });
    }