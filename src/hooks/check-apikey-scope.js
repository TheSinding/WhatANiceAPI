// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const errors = require('@feathersjs/errors');

// eslint-disable-next-line no-unused-vars
module.exports = function(options = {}) {
  return async context => {
    const { params, method, path } = context;
    const { apikey = null } = params;

    if (apikey === null) throw new Error('Apikey not in params');
    const { scopes } = apikey;
    for (const scope of scopes) {
      if (path in scope) {
        if (!(method in scope[path])) {
          throw new errors.MethodNotAllowed(
            `API does not have the required permission the method: '${method}' on scope '${path}'`
          );
        }
        return context;
      }
    }
    throw new errors.MethodNotAllowed(
      `API key does not have the required permission for scope: '${path}'`
    );
  };
};
