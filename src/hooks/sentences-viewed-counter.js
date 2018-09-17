// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
// eslint-disable-next-line no-unused-vars
const moment = require('moment');
module.exports = function(options = {}) {
  return async context => {
    const { app } = context;
    const aggregationService = app.service('aggregations');
    const today = moment()
      .startOf('day')
      .format();
    try {
      const sentenceAggregation = await aggregationService.find({
        query: { type: 'sentences' }
      });
      if (sentenceAggregation.total <= 0) return context;

      const data = sentenceAggregation.data[0];
      let currentCount = data.used === undefined ? 1 : data.used + 1;
      // const dayCount = data.daysCount.filter(day => {
      //   return day.date === 'a';
      // });

      // console.log(dayCount);

      await aggregationService.patch(data._id, {
        used: currentCount
      });
    } catch (error) {
      throw error;
    }
    return context;
  };
};
