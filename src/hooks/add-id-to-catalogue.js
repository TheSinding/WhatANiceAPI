// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = function(options = {}) {
  return async context => {
    const { result, app } = context;

    const catalogueService = app.service('catalogue');

    try {
      const query = await catalogueService.find({
        query: {
          $select: ['_id', 'sentencesIds']
        }
      });

      if (query.total === 0) {
        await catalogueService.create({ sentencesIds: [result.id] });
        return context;
      }

      const { data } = query;
      const sentencesCatalouge = data[0];
      const { sentencesIds, _id } = sentencesCatalouge;
      sentencesIds.push(result.id);

      await catalogueService.patch(_id, { sentencesIds });
    } catch (error) {
      throw error;
    }

    return context;
  };
};
