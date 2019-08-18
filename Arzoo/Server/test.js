console.log(new Date() > new Date("Sun Aug 18 2019 18:42:46 GMT+0530 (India Standard Time)"));

// const DB = require('../../Server/DBConnection.js');
// var User = require('../../Server/models/user');
// var Plan = require('../../Server/models/plan');
// var tmp = "9657663844"

// Plan.aggregate([{
//             $match: {
//                 GoalType: "Stamina"
//             }
//         }, {
//             $lookup: {
//                 from: "User",
//                 localField: "Coach",
//                 foreignField: "_id",
//                 as: "CoachDetails"
//             }
//         },{
//             $project : {
//                 Duration : 1,
//                 Price : 1,
//                 CoachDetails : {
//                     _id : 1,
//                     FirstName : 1,
//                     LastName : 1
//                 }
//             }
//         },{
//             $unwind : "$CoachDetails"
//         }
//     ],
//     function (err, res) {
//         console.log(JSON.stringify(res));
//     })











// // User.findOne({
// //     MobileNo: 9657663844, UserType:"U"
// // }, {
// //     _id: 1
// // }, function (err, res) {
// //     console.log(JSON.stringify(res));

// // })