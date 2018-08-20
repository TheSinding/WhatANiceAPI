// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = function(options = {}) {
  return async context => {
    const { params, result } = context;
    const { query } = params;

    if ('random' in query && result.total !== 0) {
      const rngNum = Math.floor(Math.random() * result.total);
      context.result = result.data[rngNum];
      return context;
    }
    return context;
  };
};
