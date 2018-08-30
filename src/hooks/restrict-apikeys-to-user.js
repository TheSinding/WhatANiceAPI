// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const { ObjectId } = require('mongoose').Types;
// eslint-disable-next-line no-unused-vars
module.exports = function(options = {}) {
  return async context => {
    const { params } = context;
    const query = {
      userId: params.user._id
    };

    context.params.query = query;
    return context;
  };
};
