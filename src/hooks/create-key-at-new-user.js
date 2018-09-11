// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = function(options = {}) {
  return async context => {
    const { result, app } = context;
    const apiService = app.service('apikeys');
    console.log(result);

    try {
      await apiService.create({ userId: result._id });
    } catch (error) {
      throw error;
    }
    return context;
  };
};
