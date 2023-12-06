require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const port = process.env.PORT || 3000;
const router = require('./routers');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(router);

app.listen(port, () => console.log('Server run on Port', port));

module.exports = app;
