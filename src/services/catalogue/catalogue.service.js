// Initializes the `catalogue` service on path `/catalogue`
// const createService = require('feathers-nedb');
const createService = require('./catalogue.class.js');
const hooks = require('./catalogue.hooks');

module.exports = function(app) {
  const paginate = app.get('paginate');

  const options = {
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/catalogue', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('catalogue');

  service.hooks(hooks);
};
