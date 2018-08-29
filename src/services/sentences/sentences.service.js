// Initializes the `sentences` service on path `/sentences`
const createService = require('feathers-mongodb');
const hooks = require('./sentences.hooks');

module.exports = function(app) {
  const paginate = app.get('paginate');
  const mongoClient = app.get('mongoClient');
  const options = { paginate };

  // Initialize our service with any options it requires
  app.use('/sentences', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('sentences');

  mongoClient.then(db => {
    service.Model = db.collection('sentences');
  });

  service.hooks(hooks);
};
