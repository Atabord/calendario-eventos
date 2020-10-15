'use strict'
const express = require('express');
const events = express.Router();

events.get('/all', require('../controllers/events/get-all'));
events.post('/new', require('../controllers/events/create'));
events.post('/delete/:id', require('../controllers/events/delete'));
events.patch('/edit', require('../controllers/events/edit'));

module.exports = events;