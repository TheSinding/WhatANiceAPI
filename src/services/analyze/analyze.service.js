// Initializes the `analyze` service on path `/analyze`
const createService = require('./analyze.class.js');
const hooks = require('./analyze.hooks');

module.exports = function(app) {
  const paginate = app.get('paginate');

  const options = {
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/analyze', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('analyze');

  service.hooks(hooks);
};
