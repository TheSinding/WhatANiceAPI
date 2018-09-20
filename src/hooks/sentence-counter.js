// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
// eslint-disable-next-line no-unused-vars
module.exports = function(options = {}) {
  return async context => {
    const { app, method } = context;
    const aggregationService = app.service('aggregations');

    try {
      const sentenceAggregation = await aggregationService.find({
        query: { type: 'sentences' }
      });
      if (sentenceAggregation.total <= 0) return context;

      const data = sentenceAggregation.data[0];
      let currentCount = data.count === undefined ? 0 : data.count;

      switch (method) {
      case 'create':
        currentCount++;
        break;
      case 'delete':
        currentCount--;
        break;
      }

      await aggregationService.patch(data._id, { count: currentCount });
      // service.emit('counterChanged', {
      //   type: 'counterChanged',
      //   data: { currentCount }
      // });
    } catch (error) {
      throw error;
    }
    return context;
  };
};
