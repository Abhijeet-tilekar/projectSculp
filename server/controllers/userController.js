var http = require('http');
const express = require('../node_modules/express');

var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;
var User = require('../models/User');

var session = require('../node_modules/express-session');
router.use(session({resave: true, saveUninitialized: true, secret: 'XCR3rsasa%RDHHH', cookie: { maxAge: 60000 }}));
var sessionData;

//TO get objectID of user or coach 
router.get('/getId/:MobileNo', (req, res) => {
    
    User.findOne({
         MobileNo: parseInt(req.params.MobileNo),
         UserType: "U"//req.params.UserType
    }, {
        _id: 1
    }, function (err, data) {
        res.json(data);
    })
})

// router.get('/set_session', (req, res) => {
//     sessionData = req.session;
//     sessionData.user = {};

   
// })





router.get('/', (req, res) => {
    User.find(function (err, data) {
        res.json(Array.from(data));
    })
    // User.find((err, docs) => {
    //     if (!err) { res.send(docs); }
    //     else { console.log('Error in Retriving Users :' + JSON.stringify(err, undefined, 2)); }
    // });
});

router.get('/:id', (req, res) => {
    res.send(req.params.id);
    // if (!ObjectId.isValid(req.params.id))
    //     return res.status(400).send(`No record with given id : ${req.params.id}`);

    // User.findById(req.params.id, (err, doc) => {
    //     if (!err) { res.send(doc); }
    //     else { console.log('Error in Retriving User :' + JSON.stringify(err, undefined, 2)); }
    // });
});

router.post('/', (req, res) => {
    var emp = new User({
        name: req.body.name,
        // position: req.body.position,
        // office: req.body.office,
        // salary: req.body.salary,
    });
    res.send(emp.name);
    // emp.save((err, doc) => {
    //     if (!err) { res.send(doc); }
    //     else { console.log('Error in User Save :' + JSON.stringify(err, undefined, 2)); }
    // });
});

router.put('/:id', (req, res) => {
    res.send(req.params.id);
    // if (!ObjectId.isValid(req.params.id))
    //     return res.status(400).send(`No record with given id : ${req.params.id}`);

    // var emp = {
    //     name: req.body.name,
    //     position: req.body.position,
    //     office: req.body.office,
    //     salary: req.body.salary,
    // };
    // User.findByIdAndUpdate(req.params.id, { $set: emp }, { new: true }, (err, doc) => {
    //     if (!err) { res.send(doc); }
    //     else { console.log('Error in User Update :' + JSON.stringify(err, undefined, 2)); }
    // });
});

router.delete('/:id', (req, res) => {
    res.send(req.params.id);
    // if (!ObjectId.isValid(req.params.id))
    //     return res.status(400).send(`No record with given id : ${req.params.id}`);

    // User.findByIdAndRemove(req.params.id, (err, doc) => {
    //     if (!err) { res.send(doc); }
    //     else { console.log('Error in User Delete :' + JSON.stringify(err, undefined, 2)); }
    // });
});



module.exports = router;