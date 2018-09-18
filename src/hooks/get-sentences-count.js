// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
// eslint-disable-next-line no-unused-vars

const feathers = require('@feathersjs/feathers');
module.exports = function(options = {}) {
  return async context => {
    const { service, id } = context;
    if (id !== 'count') return context;

    try {
      const query = await service.find({ query: { $limit: 0 } });
      context.result = query;
    } catch (error) {
      throw error;
    }
    return context;
  };
};
