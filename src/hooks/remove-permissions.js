/*
  This removes permissions from the create request, if  there is any.
  Else people would be able to make them self superadmin, as the create a user.
*/

module.exports = function(options = {}) {
  return async context => {
    const { data = {} } = context;
    if ('permissions' in data) delete data.permissions;
    return context;
  };
};
