var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/Sculp";
var email = 'ahm33.saad@gmail.com'; //
var datetime = new Date();
console.log(datetime);
MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
    if (err) throw err;

    console.log("Database created!");
    var dbo = db.db("Sculp");
    dbo.createCollection("user_log", function(err, res) {
        if (err) throw err;
        console.log("Collection created!");
        var myobj = { email: email, timestamp: datetime };
        dbo.collection("user_log").insertOne(myobj, function(err, res) {
            if (err) throw err;
            console.log("Number of documents inserted: " + res.insertedCount);
            db.close();
        });
    });
});






// var datetime = new Date();
// console.log(datetime.toISOString().slice(0, 10));