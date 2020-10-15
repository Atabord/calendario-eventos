const BadRequestError = require('../errors/bad-request-error');
const NotFoundError = require('../errors/not-found-error');
const Events = require('../schemas/events');

const eventsService = {
    async getAll({ _id }) {
        const events = await Events.find({
            userId: _id,
        });
        if(!events){
            console.warn('Error, no events found');
            throw new NotFoundError();
        }
        return events;
    },
    async create(event) {
        try {
            await Events.create(event);
        } catch(err) {
            console.warn(`Error creating the event ${err}`);
            throw new BadRequestError();
        }
    },
    async delete({ _id }) {
        try {
            await Events.deleteOne({ _id });
        } catch (err) {
            console.warn(`Error deleting the event ${err}`);
            throw new BadRequestError();
        }
    },
    async edit({ _id, ...newAttributes }) {
        try {
            await Events.findByIdAndUpdate(_id, { ...newAttributes });
        } catch (error) {
            console.warn(`Error trying to update event ${error}`);
            throw new BadRequestError();
        }
    }
}

module.exports = eventsService;