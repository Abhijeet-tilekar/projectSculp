const mongoose = require('mongoose');


var enrollSchema = new mongoose.Schema({
    UserId: String,
    StartDate: Date,
    EndDate: Date,
    CoachId: String,
    PlanId: String
})
mongoose.model('Enroll', enrollSchema, "Enroll");