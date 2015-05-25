module.exports = function() {
    return function cors(request, response, next) {
        var origin = request.get('Origin');

        if (origin) {
            response.set('Access-Control-Allow-Origin', origin);
            response.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
            response.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
            response.set('Access-Control-Allow-Credentials', 'true');
        }

        if (request.method === 'OPTIONS') {
            response.send(200);
        } else {
            next();
        }
    };
};
