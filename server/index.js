const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const ForbiddenError = require('./errors/forbidden-error');
const { PORT, MONGO_URI, DB_NAME } = require('../constants');
const BadRequestError = require('./errors/bad-request-error');
const NotFoundError = require('./errors/not-found-error');
const UnauthorizedError = require('./errors/unauthorized-error');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/', express.static('client'));
app.use('/api/v1/user', require('./routes/user'));
app.use('/api/v1/events', require('./routes/events'));

app.use((err, req, res, next) => {
    if(err instanceof ForbiddenError){
        res.status(403).send(err.message);
    } else if(err instanceof BadRequestError) {
        res.status(400).send(err.message);
    } else if(err instanceof NotFoundError) {
        res.status(404).send(err.message);
    } else if(err instanceof UnauthorizedError) {
        res.status(401).send(err.message);
    } else {
        console.warn('unexpected error', err);
        res.status(500).send('Something went wrong');
    }
});

(async () => {
    await mongoose.connect(MONGO_URI, {
        useNewUrlParser:true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
        dbName: DB_NAME
    });
    app.listen(PORT, (err) => {
        if(err) {
            console.log(err);
        } else {
            console.log(`Listening on port ${PORT}`)
        }
    });
})();
