const eventsService = require('../../services/events-service');
const tokenService = require('../../services/token-service');

module.exports = async function getAll({ query }, res, next) {
    try{
        const { token } = query;
        const { _id } = await tokenService.getUser(token)
        const events = await eventsService.getAll({
            _id,
        });
        res.send(events);
    }catch(e){
        next(e)
    }
}