const ForbiddenError = require('../errors/forbidden-error');
const User = require('../schemas/user');
const { hashPassword } = require('./password-service');

const userService = {
    async login ({ username, password }) {
        const user = await User.findOne({
            username,
        });
        if(!user){
            console.warn('Error, user not fond');
            throw new ForbiddenError();
        }
        const newPassword = hashPassword(password, user.salt);
        if(user.password !== newPassword.password) {
            console.warn('Error, password mismatch');
            throw new ForbiddenError();
        }
        return user;
    }
}

module.exports = userService;