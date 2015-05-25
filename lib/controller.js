function Controller(server, path) {
    this.server = server;
    this.path   = path;
};

Controller.prototype.mapping = function(method, route) {
    var app  = this.server.app;
    var path = this.path;

    return {
        respond: function(handler, context) {
            return app[method](path + route, function(req, res) {
                var result = handler.call(context, req.params, req.body);

                res.send(JSON.stringify(result));
            });
        }
    };
}

Controller.prototype.get    = function(route) { return this.mapping('get'   , route); };
Controller.prototype.post   = function(route) { return this.mapping('post'  , route); };
Controller.prototype.put    = function(route) { return this.mapping('put'   , route); };
Controller.prototype.delete = function(route) { return this.mapping('delete', route); };

module.exports.Controller = Controller;
