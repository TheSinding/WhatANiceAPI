// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const errors = require('@feathersjs/errors');
// eslint-disable-next-line no-unused-vars
module.exports = function(options = {}) {
  return async context => {
    const { service, app } = context;
    const aggregationService = app.service('aggregations');
    const VIEWED = 'viewed';

    try {
      const sentenceAggregation = await aggregationService.get(VIEWED);
      if (!sentenceAggregation.exists) throw new errors['500']();

      const currentCount = sentenceAggregation.data.count + 1;

      await aggregationService.patch(VIEWED, { count: currentCount });

      service.emit('viewed', {
        type: 'viewed',
        data: { currentCount }
      });
    } catch (error) {
      throw error;
    }
    return context;
  };
};
