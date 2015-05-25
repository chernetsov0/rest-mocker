var vows   = require('vows'  ),
    assert = require('assert'),
    _      = require('underscore');

var Data = require('../lib/data').Data;

var serverMock = {
    config: {
        attributes: {
            id     : 'id',
            created: 'created_at',
            updated: 'updated_at'
        }
    }
};

vows.describe('Data').addBatch({ 'When item is': {
    topic: function() {
        var data = new Data(serverMock).allow('title');

        data.add({ title: 'Bob' })

        return data;
    },

    'queried': {
        topic: function(data) { return data.get(1); },

        'is present'       : function(topic) { assert.isObject(topic); },
        'has id'           : function(topic) { assert.isNumber(topic.id); },
        'has saved data'   : function(topic) { assert.strictEqual(topic.title, 'Bob'); },
        'has creation time': function(topic) { assert.instanceOf(topic.created_at, Date); }
    },

    'added': {
        topic: function(data) { return data.add({ title: 'Joe' }); },

        'is present'       : function(topic) { assert.isObject(topic); },
        'has id'           : function(topic) { assert.isNumber(topic.id); },
        'has passed data'  : function(topic) { assert.strictEqual(topic.title, 'Joe'); },
        'has creation time': function(topic) { assert.instanceOf(topic.created_at, Date); }
    },

    'updated': {
        topic: function(data) {
            var item = data.add({ title: 'John' });

            return data.update(item.id, { title: 'Joe' });
        },

        'is present'       : function(topic) { assert.isObject(topic); },
        'has id'           : function(topic) { assert.isNumber(topic.id); },
        'has changed data' : function(topic) { assert.strictEqual(topic.title, 'Joe'); },
        'has creation time': function(topic) { assert.instanceOf(topic.created_at, Date); },
        'has update time'  : function(topic) { assert.instanceOf(topic.updated_at, Date); }
    },

    'deleted': {
        topic: function(data) {
            var item = data.add({ title: 'John' });

            data.remove(item.id);

            return { data: data, item: item };
        },

        'is absent': function(topic) {
            assert.throws(function() { topic.data.get(topic.item.id); });
        }
    }
}
}).addBatch({
    'When all items are queried': {
        topic: function() {
            var data = new Data(serverMock);

            data.add({});
            data.add({});

            return data.all();
        },

        'is present'        : function(topic) { assert.isArray(topic); },
        'has correct length': function(topic) { assert.lengthOf(topic, 2); }
    }
}).export(module);
