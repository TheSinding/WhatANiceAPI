// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
// eslint-disable-next-line no-unused-vars
const { ObjectID } = require('mongodb');
module.exports = function(options = {}) {
  return async context => {
    const { params, service } = context;
    const { query = {} } = params;
    const { Model } = service;
    const aggregationQuery = [{ $sample: { size: 1 } }];

    if (!('random' in query)) return context;

    if ('$not' in query) {
      aggregationQuery.unshift({
        $match: { _id: { $ne: ObjectID(query.$not) } }
      });
    }

    try {
      const documents = [];
      const query = await Model.aggregate(aggregationQuery);

      await query.forEach(doc => {
        documents.push(doc);
      });

      context.result = documents;
    } catch (error) {
      throw error;
    }
    return context;
  };
};
