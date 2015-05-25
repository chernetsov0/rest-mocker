var path = require('path');

module.exports = function(subdirectory) {
    return function load(base, name) {
        var loadPath   = path.join(base, subdirectory, name),
            normalized = path.normalize(loadPath);

        return require(normalized);
    };
};
