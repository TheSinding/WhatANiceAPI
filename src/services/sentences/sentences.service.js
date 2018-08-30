// Initializes the `sentences` service on path `/sentences`
const createService = require('feathers-mongoose');
const hooks = require('./sentences.hooks');
const createModel = require('../../models/sentences.model');

module.exports = function(app) {
  const paginate = app.get('paginate');
  const Model = createModel(app);
  const options = { Model, paginate };

  // Initialize our service with any options it requires
  app.use('/sentences', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('sentences');

  service.hooks(hooks);
};
