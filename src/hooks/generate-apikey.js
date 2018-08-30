// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const uuid = require('uuid');
// eslint-disable-next-line no-unused-vars
module.exports = function(options = {}) {
  return async context => {
    const { params, app } = context;
    const config = app.get('apikeys');
    const { user } = params;
    const apikeyObject = {
      userId: user._id,
      apikey: uuid.v4(),
      scopes: config.defaultScopes
    };

    console.log(apikeyObject);

    context.data = apikeyObject;

    return context;
  };
};
