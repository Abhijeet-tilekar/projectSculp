const express = require('./node_modules/express');
const bodyParser = require('./node_modules/body-parser');
const cors = require('./node_modules/cors/lib');

const { DB } = require('./DBConnection.js');
var userController = require('./controllers/userController.js');


var app = express();
app.use(bodyParser.json());
app.use(cors({origin : 'http://localhost:4200'}));


app.listen(3000, () => console.log('Server started at port : 3000'));
app.use('/user',userController);
//app.use('/coach',userController);
 
