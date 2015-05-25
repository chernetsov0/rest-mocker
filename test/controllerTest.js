var vows   = require('vows'),
    assert = require('assert');

var Controller = require('../lib/controller').Controller;

var mappingMock = function(method) {
    return function(route, handler) {
        return { method: method, route: route, handler: handler };
    };
};

var handlerMock = function() {};

var serverMock = {
    app: {
        get   : mappingMock('GET'   ),
        post  : mappingMock('POST'  ),
        put   : mappingMock('PUT'   ),
        delete: mappingMock('DELETE')
    }
};

vows.describe('Controller').addBatch({
    'When': {
        topic: function() { return new Controller(serverMock, '/root') },

        'GET request is mapped': {
            topic: function(controller) { return controller.get('/get').respond(handlerMock) },

            'correct method' : function(topic) { assert.strictEqual(topic.method, 'GET') },
            'correct route'  : function(topic) { assert.strictEqual(topic.route, '/root/get') },
            'correct handler': function(topic) { assert.instanceOf(topic.handler, Function) },
        },

        'POST request is mapped': {
            topic: function(controller) { return controller.post('/post').respond(handlerMock) },

            'correct method' : function(topic) { assert.strictEqual(topic.method, 'POST') },
            'correct route'  : function(topic) { assert.strictEqual(topic.route, '/root/post') },
            'correct handler': function(topic) { assert.instanceOf(topic.handler, Function) },
        },

        'PUT request is mapped': {
            topic: function(controller) { return controller.put('/put').respond(handlerMock) },

            'correct method' : function(topic) { assert.strictEqual(topic.method, 'PUT') },
            'correct route'  : function(topic) { assert.strictEqual(topic.route, '/root/put') },
            'correct handler': function(topic) { assert.instanceOf(topic.handler, Function) },
        },

        'DELETE request is mapped': {
            topic: function(controller) { return controller.delete('/delete').respond(handlerMock) },

            'correct method' : function(topic) { assert.strictEqual(topic.method, 'DELETE') },
            'correct route'  : function(topic) { assert.strictEqual(topic.route, '/root/delete') },
            'correct handler': function(topic) { assert.instanceOf(topic.handler, Function) },
        }
    }
}).export(module);
