const DB = require('mongoose');

DB.connect('mongodb://localhost:27017/Crud', (err) => {
    if (!err)
        console.log('MongoDB connection succeeded.');
    else
        console.log('Error in DB connection : ' + JSON.stringify(err, undefined, 2));
});

module.exports = DB.connection;