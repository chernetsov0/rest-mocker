try {
    var handler = require("readline").createInterface({
        input : process.stdin,
        output: process.stdout
    });
} catch(e) {
    // If ReadLine fails or is not available use process (will fail to do anything on Windows)
    var handler = process;
}

module.exports = function interrupt(callback, context) {
    // Possibly optimize in the future by iterating.
    var parameters = Array.prototype.slice(arguments, 2);

    handler.on("SIGINT", function() {
        callback.apply(context, parameters);

        process.nextTick(process.exit.bind(process));
    });
};
