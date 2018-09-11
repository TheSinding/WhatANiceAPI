// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = function(options = {}) {
  return async context => {
    const { data, service, params } = context;
    const { user = {} } = params;

    try {
      if ('apikeyId' in data) {
        await service.remove(data.apikeyId);
        return context;
      }

      if (!('_id' in user)) return context;

      const query = await service.find({
        $skipUseridCheck: true,
        query: { userId: user._id }
      });

      if (query.total === 0) return context;

      await service.remove(query.data[0]._id);
    } catch (error) {
      throw error;
    }

    return context;
  };
};
