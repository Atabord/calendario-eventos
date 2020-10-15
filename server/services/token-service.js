const jwt = require('jsonwebtoken');
const { PRIVATE_KEY } = require('../../constants');
const UnauthorizedError = require('../errors/unauthorized-error');

const tokenService = {
    getUser(token) {
        try {
            const user = jwt.verify(token, PRIVATE_KEY);
            return user;
        } catch(err) {
            console.warn(`Error verifying token ${err}`);
            throw new UnauthorizedError();
        }
    }
}

module.exports = tokenService;