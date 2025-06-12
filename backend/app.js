const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const userRoute = require('./routes/user.route');
const companyRoute = require('./routes/company.route');


const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use('/ss/v1/user',userRoute);
app.use('/ss/v1/company',companyRoute);

module.exports = app;