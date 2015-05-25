### RestMocker

Simple [Express](http://expressjs.com/) app to mock REST-based servers. Can be used either separately or as a connect middleware for example as a part of yeoman server.

#### Server: How To
Start by installing it through NPM

```bash
npm install rest-mocker --save
```

Then require it and create server using current directory as root.

```js
var server = require('rest-mocker').create(__dirname);
```

Use it to connect your controllers to routes. Controllers should be placed in the directory `controllers` located at the root.

```js
server.route('/projects').to('projects');
```

Run it as a standalone server.

```js
server.run('localhost', 8000);
```

Or use it's app in connect.

```js
connect().use(server.app);
```

#### Controller: How To

Controllers are modules that export a function. You have two parameters, one to map routes and another to save data. This should be enough to mock simple servers, disregarding their real complexity. You can also write your own handlers to mimic more complex behavior.

```js
module.exports = function(controller, data) {
    // Allow attributes in the objects that will be saved.
    data.allow('title', 'slug');

    // Add initial data.
    data.add({ title: 'Project A', slug: 'project-a' });
    data.add({ title: 'Project B', slug: 'project-b' });

    // Use Data wrapper to define routes
    controller.get   ('/:id').respond(data.wrapper.get); // Requires id param to work
    controller.post  ('/'   ).respond(data.wrapper.add);
    controller.put   ('/:id').respond(data.wrapper.update); // Requires id param to work
    controller.delete('/:id').respond(data.wrapper.remove); // Requires id param to work

    // Or roll you own
    controller.post('/custom/:name').respond(function(params, body) {
        return {
          status: 'Message ' + body.message + 'was sent to user @' + params['name']
        };
    });
};
```

#### Use with Yeoman

Define your server and controllers in a subdirectory e.g. `backend`. Export server from it's module and use it as a middleware in `connect.livereload.options` in `Gruntfile.js`:

```js
var backend = require('./backend/server');

module.exports = function (grunt) {
  // ...
  connect: {
    // ...
    livereload: {
      options: {
        // ...
        middleware: function (connect) {
          return [
            connect().use('/api', backend.app),
            // ...
```

#### License

RestMocker is licensed under the [MIT License](http://github.com/chernetsov0/rest-mocker/raw/master/LICENSE).
