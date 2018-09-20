// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const moment = require('moment');
// eslint-disable-next-line no-unused-vars
module.exports = function(options = {}) {
  return async context => {
    const { app, service, result } = context;
    // If the call is only to count the sentences return
    if (result.limit === 0) return context;

    const metrics = app.service('metrics');
    const momentConfig = app.get('moment');
    const dateOfToday = moment().format(momentConfig.format);

    try {
      const usedMetric = await metrics.get('history');
      const { days } = usedMetric;
      const index = days.findIndex(day => day.date === dateOfToday);
      // ~ means -1, so ~index equals index !== -1
      const today = ~index
        ? days.splice(index, 1)[0]
        : {
          date: dateOfToday,
          count: 0
        };

      today.count++;
      days.push(today);
      // Maybe add await?
      metrics.patch('history', { days });
      service.emit('daysCount', { usedToday: today.count });
    } catch (error) {
      throw error;
    }
    return context;
  };
};
