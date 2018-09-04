// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const errors = require('@feathersjs/errors');
// eslint-disable-next-line no-unused-vars
module.exports = function(options = {}) {
  return async context => {
    const { params, app, data = {} } = context;
    const { query } = params;
    const apiService = app.service('apikeys');
    if (!('apikey' in query) && !('apikey' in data))
      throw new errors.NotAuthenticated('No Apikey supplied');

    try {
      const suppliedApikey = query.apikey || data.apikey;

      const result = await apiService.find({
        query: { apikey: suppliedApikey },
        $skipUseridCheck: true
      });

      if (result.total === 0) throw new errors['404']('API not found');

      const apikey = result.data[0];

      if (!apikey.valid) throw new errors['403']('API not valid');

      if (apikey.scopes[0] === 'SUPERADMIN') params.$superadmin = true;

      params.apikey = apikey;
      return context;
    } catch (error) {
      throw error;
    }
  };
};
