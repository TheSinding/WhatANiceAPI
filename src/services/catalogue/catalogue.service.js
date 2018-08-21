// Initializes the `catalogue` service on path `/catalogue`
const createService = require('feathers-nedb');
const createModel = require('../../models/catalogue.model');
const hooks = require('./catalogue.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/catalogue', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('catalogue');

  service.hooks(hooks);
};
