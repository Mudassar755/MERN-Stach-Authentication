const express = require('express')
const connectDB = require('./config/db');
var cors = require("cors");
var helmet = require('helmet')
// const path = require('path');
// const fs = require('fs');
// const bodyParser = require('body-parser');
const users = require('./routes/users');
const auth = require('./routes/auth');
var useragent = require('express-useragent');

const app = express();
app.use(helmet())

//Connect MongoDB
connectDB();

var whitelist = ['http://localhost:3000']
var corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}

//Return Unauthorized Error Message
app.get('*', function (req, res) {
    res.json({
        code: 510,
        msg: "access denied"
    });
})

//init middleware
app.use(useragent.express());
app.use(helmet.hidePoweredBy())
app.use(cors());
app.use(express.json({ extended: false, limit:'50mb' }))

app.use('/api/users', users);
app.use('/api/auth', auth);

const PORT = process.env.PORT || 5002;

app.listen(PORT, () => console.log(`Server is up and running on the port ${PORT}`));