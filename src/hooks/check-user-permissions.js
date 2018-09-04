// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
const errors = require('@feathersjs/errors');
module.exports = function(options = {}) {
  return async context => {
    const { params, path, method, app, id } = context;
    const protectedRoutes = app.get('protectedRoutes');
    // If other serives uses the users method eg, authentication, params.user will be null
    const { user = null } = params;

    if (user === null) return context;

    // If a user is getting it's own user
    if (user._id.equals(id)) return context;

    const { permissions } = user;

    if (!(path in protectedRoutes)) return context;

    if (!(method in protectedRoutes[path])) return context;

    for (const permission of permissions) {
      if (protectedRoutes[path][method].includes(permission)) return context;
    }

    throw new errors.MethodNotAllowed('You have insuffient permissions.');
  };
};
