module.exports = class NotFoundError extends Error {
    constructor (message) {
        super(message || 'Not Found');
    }
}