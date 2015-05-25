var rewire    = require('rewire');

var express   = rewire('express'),
    interrupt = rewire('./utils/interrupt');

var morgan = rewire('morgan')('dev');
    json   = rewire('body-parser').json({ type: '*/*' });
    cors   = rewire('./utils/cors'  )();
    reject = rewire('./utils/reject')();

var Route = rewire('./route').Route;

function Server(directory) {
    this.directory = directory;
    this.routes    = [];
    this.app       = express();

    this.config = {
        attributes: {
            id     : 'id',
            created: 'created_at',
            updated: 'updated_at'
        }
    };

    this.app.use(cors);
    this.app.use(json);
    this.app.use(morgan);
}

Server.prototype.configure = function(options) {
    underscore.extendOwn(this.config, options);
};

Server.prototype.route = function(path) {
    return new Route(this, path);
};

Server.prototype.run = function(address, port) {
    this.app.use(reject);

    server = this.app.listen(port, address, function() {
        var host = this.address().address;
        var port = this.address().port;

        console.log('RestMocker is listening at http://%s:%s', host, port);
    });

    interrupt(server.close, server);
};

module.exports.Server = Server;
