const mongoose = require('../DBConnection');
const ObjectID = require('mongoose').Types.ObjectId;

var Plan = mongoose.model('Plan', {
    GoalType : {type : String},
    Duration : {type : String},
    Price : {type : Number},
    Coach : {type : ObjectID},
},"Plan");

module.exports = Plan;