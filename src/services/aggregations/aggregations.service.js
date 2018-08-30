// Initializes the `aggregations` service on path `/aggregations`
const createService = require('feathers-mongoose');
const createModel = require('../../models/aggregations.model');
const hooks = require('./aggregations.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/aggregations', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('aggregations');

  service.hooks(hooks);
};
