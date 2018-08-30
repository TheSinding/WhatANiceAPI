// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const errors = require('@feathersjs/errors');
// eslint-disable-next-line no-unused-vars
module.exports = function(options = {}) {
  return async context => {
    // const { method, service, app } = context;
    // const SENTENCES = 'sentences';
    // try {
    //   const sentenceAggregation = await aggregationService.get(SENTENCES);
    //   if (!sentenceAggregation.exists) throw new errors['500']();

    //   let currentCount = sentenceAggregation.data.count;

    //   switch (method) {
    //   case 'create':
    //     currentCount++;
    //     break;
    //   case 'delete':
    //     currentCount--;
    //     break;
    //   }
    //   await aggregationService.patch(SENTENCES, { count: currentCount });

    //   service.emit('counterChanged', {
    //     type: 'counterChanged',
    //     data: { currentCount }
    //   });
    // } catch (error) {
    //   throw error;
    // }
    return context;
  };
};
