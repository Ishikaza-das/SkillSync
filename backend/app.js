const express = require('express');
const cors = require('cors');

const userRoute = require('./routes/user.route');
const cookieParser = require('cookie-parser');


const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use('/ss/v1/user',userRoute);

module.exports = app;