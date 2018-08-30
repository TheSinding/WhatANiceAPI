// Initializes the `apikeys` service on path `/apikeys`
const createService = require('feathers-mongoose');
const createModel = require('../../models/apikeys.model');
const hooks = require('./apikeys.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/apikeys', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('apikeys');

  service.hooks(hooks);
};
