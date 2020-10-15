const jwt = require('jsonwebtoken');
const userService = require('../services/user-service');
const { PRIVATE_KEY } = require('../../constants');

module.exports = async function login({ body }, res, next) {
    try{
        const { username, _id } = await userService.login(body);
        res.send({ token: jwt.sign( { username, _id }, PRIVATE_KEY, { expiresIn: '4h'})});
    }catch(e){
        next(e)
    }
}