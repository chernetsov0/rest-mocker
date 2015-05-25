var underscore = require('underscore'),
    rewire     = require('rewire');

var errors = rewire('./utils/errors');

function DataWrapper(data) {
    this.all     = function(params, body) { return data.all(); };
    this.get     = function(params, body) { return data.get(params[data.config.id]); };
    this.add     = function(params, body) { return data.add(body); };
    this.update  = function(params, body) { return data.update(params[data.config.id], body); };
    this.remove  = function(params, body) { return data.remove(params[data.config.id], body); };
};

function Data(server) {
    this.config  = server.config.attributes;
    this.wrapper = new DataWrapper(this);

    this.items   = [];
    this.allowed = [];

    this.nextId = 1;
}

Data.prototype.allow = function() {
    this.allowed = this.allowed.concat(arguments);

    return this;
};

Data.prototype.all = function() {
    return underscore.compact(this.items);
};

Data.prototype.get = function(id) {
    var result = this.items[id];

    if (!result) throw new errors.NotFound;

    return result;
};

Data.prototype.add = function(data) {
    var item = underscore.pick(data, this.allowed);

    item[this.config.id] = this.nextId++;
    item[this.config.created] = new Date();
    item[this.config.updated] = new Date();

    this.items[item.id] = item;

    return item;
};

Data.prototype.update = function(id, data) {
    var result = this.items[id];

    if (!result) throw new errors.NotFound;

    var item = underscore.pick(data, this.allowed);
    underscore.extendOwn(result, item);

    result[this.config.updated] = new Date();

    return result;
};

Data.prototype.remove = function(id) {
    var result = this.items[id];

    if (!result) throw new errors.NotFound;

    this.items.splice(id, 1);
};

module.exports.Data = Data;
