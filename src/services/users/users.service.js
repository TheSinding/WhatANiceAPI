// Initializes the `users` service on path `/users`
const createService = require('feathers-mongoose');
const hooks = require('./users.hooks');
const createModel = require('../../models/users.model');

module.exports = function(app) {
  const paginate = app.get('paginate');
  const Model = createModel(app);
  const options = { Model, paginate };

  // Initialize our service with any options it requires
  app.use('/users', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('users');

  service.hooks(hooks);
};
