const eventsService = require('../../services/events-service');

module.exports = async function deleteEvent({ params }, res, next) {
    try{
        const { id } = params;
        await eventsService.delete({
            _id: id,
        });
        res.send(true);
    }catch(e){
        next(e)
    }
}