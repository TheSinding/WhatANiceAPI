// Initializes the `counters` service on path `/counters`
const createService = require('./aggregations.class.js');
const hooks = require('./aggregations.hooks');

module.exports = function(app) {
  const paginate = app.get('paginate');

  const options = {
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/aggregations', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('aggregations');

  service.hooks(hooks);
};
