// Initializes the `counters` service on path `/counters`
const createService = require('./counters.class.js');
const hooks = require('./counters.hooks');

module.exports = function (app) {
  
  const paginate = app.get('paginate');

  const options = {
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/counters', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('counters');

  service.hooks(hooks);
};
