// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
// eslint-disable-next-line no-unused-vars
const moment = require('moment');
module.exports = function(options = {}) {
  return async context => {
    const { app, service, result } = context;

    if (result.limit === 0) return context;

    const metrics = app.service('metrics');
    try {
      const usedMetric = await metrics.get('used');
      let { count } = usedMetric;
      count++;
      await metrics.patch('used', { count });
      service.emit('used', count);
    } catch (error) {
      throw error;
    }
    return context;
  };
};
