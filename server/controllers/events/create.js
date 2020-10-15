const eventsService = require('../../services/events-service');
const tokenService = require('../../services/token-service');

module.exports = async function create({ body }, res, next) {
    try{
        const { title, start, end, token} = body;
        const user = await tokenService.getUser(token)
        await eventsService.create({
            title,
            start,
            end,
            userId: user._id
        });
        res.send(true);
    }catch(e){
        next(e)
    }
}