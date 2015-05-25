var rewire = require('rewire');

var loadController = rewire('./utils/loader')('controllers');

var Controller = rewire('./controller').Controller;
var Data       = rewire('./data'      ).Data;

function Route(server, path) {
    this.server = server;
    this.path   = path;
}

Route.prototype.to = function(controllerName) {
    var config = loadController(this.server.directory, controllerName);

    this.controller = new Controller(this.server, this.path);
    this.data       = new Data      (this.server);

    return config(this.controller, this.data);
};

module.exports.Route = Route;
