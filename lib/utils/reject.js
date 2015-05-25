module.exports = function() {
    return function reject(error, request, response, next) {
        if (error.code && error.message) {
            response.status(error.code).send(error.message);
        } else {
            console.log(error.stack);
        }
    };
};
