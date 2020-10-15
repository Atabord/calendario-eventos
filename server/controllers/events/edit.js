const eventsService = require('../../services/events-service');

module.exports = async function editEvent({ body }, res, next) {
    try{
        const { id, start, end } = body;
        await eventsService.edit({
            _id: id,
            start,
            end,
        });
        res.send(true);
    }catch(e){
        next(e)
    }
}