var Server = require('./lib/server').Server;

module.exports.server = function(directory) {
    return new Server(directory);
};
