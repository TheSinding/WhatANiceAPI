// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const errors = require('@feathersjs/errors');
// eslint-disable-next-line no-unused-vars
module.exports = function(options = {}) {
  return async context => {
    const { params, app, service } = context;
    const { query } = params;
    const catalogueService = app.service('catalogue');

    if (!('random' in query)) return context;

    try {
      const query = await catalogueService.find({
        query: {
          $select: ['sentencesIds']
        }
      });
      if (query.total === 0) {
        throw new errors['500']('Sentences ID\'s is broken');
      }

      const { data } = query;
      const sentencesCatalouge = data[0];
      const { sentencesIds } = sentencesCatalouge;

      const rngNum = Math.floor(Math.random() * sentencesIds.length);

      const sentence = await service.get(sentencesIds[rngNum]);
      context.result = sentence;
    } catch (error) {
      throw error;
    }
    return context;
  };
};
