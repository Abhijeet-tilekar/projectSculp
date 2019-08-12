const mongoose = require('../DBConnection');

var User = mongoose.model('User', {
    FirstName : {type : String},
    LastName : {type : String},
    CountryCode : {type : Number},
    MobileNo : {type : Number},
    Email : {type : String},
    Password : {type : String},
    UserType : {type : String},
    Bio : {type : String},
    Photo : {type : String}
},"User");

module.exports = User;