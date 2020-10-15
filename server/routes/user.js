'use strict'
const express = require('express');
const user = express.Router();

user.post('/login', require('../controllers/login'));

module.exports = user;