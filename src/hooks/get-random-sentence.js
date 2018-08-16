// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = function(options = {}) {
  return async context => {
    const { params, result } = context;
    const { query } = params;

    if (query.hasOwnProperty('random') && result.length !== 0) {
      delete query.random;
      const rngNum = Math.floor(Math.random() * result.length);
      context.result = result[rngNum];
      return context;
    }
    return context;
  };
};
