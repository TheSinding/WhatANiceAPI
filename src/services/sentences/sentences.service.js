// Initializes the `addSentences` service on path `/sentences`
const createService = require('./sentences.class.js');
const hooks = require('./sentences.hooks');

module.exports = function(app) {
  const paginate = app.get('paginate');
  const options = {
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/sentences', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('sentences');

  service.hooks(hooks);
};
