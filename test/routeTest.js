var vows   = require('vows'),
    assert = require('assert'),
    rewire = require('rewire');

var route = rewire('../lib/route');

var serverMock = { directory: 'base' };

var loaderMock = function(base, name) {
    return function(controller, data) {
        return {
            base: base,
            name: name,
            controller: controller,
            data: data
        };
    };
};

var controllerMock = function(server, path) { this.server = server; this.path = path; };
var dataMock       = function(server      ) { this.server = server; };

route.__set__({ Controller: controllerMock, Data: dataMock, loadController: loaderMock });

vows.describe('Route').addBatch({
    'When created it': {
        topic: function() {
            return new route.Route(serverMock, '/any').to('name');
        },

        'requires given configuration': function(topic) {
            assert.strictEqual(topic.base, 'base');
            assert.strictEqual(topic.name, 'name');
        },

        'passes initialized controller': function(topic) {
            assert.instanceOf(topic.controller, controllerMock);

            assert.strictEqual(topic.controller.server, serverMock);
            assert.strictEqual(topic.controller.path, '/any');
        },

        'passes initialized data': function(topic) {
            assert.instanceOf(topic.data, dataMock);

            assert.strictEqual(topic.data.server, serverMock);
        }
    }
}).export(module);
