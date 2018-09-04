// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const errors = require('@feathersjs/errors');
// eslint-disable-next-line no-unused-vars
module.exports = function(options = {}) {
  return async context => {
    const { app, data } = context;
    const { document } = data;
    const analyzer = app.service('analyze');
    const config = app.get('sentencesConfig');

    if (!('metadata' in data) || !('document' in data))
      throw new errors.BadRequest(
        'Metadata or document is missing from request'
      );
    if (!('type' in data.document) || !('content' in data.document))
      throw new errors.BadRequest('Type or content is missing from document');

    try {
      const analyzed = await analyzer.analyze({ document });
      const { documentSentiment, language } = analyzed.result;

      if (documentSentiment.score < config.sentimentThreshold) {
        throw new errors.BadRequest({
          rejected: true,
          message: 'Sentence rejected due too, a too low sentiment score',
          documentSentiment
        });
      }
      context.data = {
        sentence: data.document.content,
        sentiment: documentSentiment,
        language,
        metadata: data.metadata
      };
    } catch (error) {
      throw error;
    }

    return context;
  };
};
