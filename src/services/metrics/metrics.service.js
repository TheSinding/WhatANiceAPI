// Initializes the `metrics` service on path `/metrics`
const createService = require('feathers-mongodb');
const hooks = require('./metrics.hooks');

module.exports = async function(app) {
  const paginate = app.get('paginate');
  const mongoClient = app.get('mongoClient');
  const options = { paginate };

  // Initialize our service with any options it requires
  app.use('/metrics', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('metrics');

  const db = await mongoClient;
  service.Model = db.collection('metrics');

  service.hooks(hooks);

  await init(app, service);
};

async function init(app, service) {
  const metricsConfig = app.get('metrics');
  const metrics = await Promise.all(
    metricsConfig.map(async metric => {
      if (typeof metric === 'object') return metric;
      return { _id: metric, count: 0 };
    })
  );

  try {
    await service.create(metrics);
  } catch (error) {}
}
