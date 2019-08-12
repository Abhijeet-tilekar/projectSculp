const DB = require('./DBConnection.js');
var User = require('./models/user');
var Plan = require('./models/plan');
var tmp = "9657663844"

Plan.aggregate([{
        $lookup: {
            from: "User",
            localField: "Coach",
            foreignField: "_id",
            as: "CoachDetails"
        }
    }, {
        $unwind : "$CoachDetails"
    }],
    function (err, data) {
        console.log(JSON.stringify(data))
    })











// User.findOne({
//     MobileNo: 9657663844, UserType:"U"
// }, {
//     _id: 1
// }, function (err, res) {
//     console.log(JSON.stringify(res));

// })