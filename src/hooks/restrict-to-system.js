// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const errors = require('@feathersjs/errors');

// eslint-disable-next-line no-unused-vars
module.exports = function(options = {}) {
  return async context => {
    console.log(context.params);

    if (!('$system' in context.params))
      throw new errors['403']('Forbidden Route');

    return context;
  };
};
