// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = function(options = {}) {
  return async context => {
    // This only accounts for ONE sentence.
    // If multiple sentences at a time is needed this has to be rewritten.
    const { app, result } = context;
    const documentResult = result.result;
    const sentiment = documentResult.documentSentiment;
    const metadata = result.metadata;
    const sentencesService = app.service('sentences');

    if (sentiment.score < 0.5) {
      context.result = {
        rejected: true,
        message: 'Sentence rejected due too, a too low sentiment score',
        sentiment
      };
      return context;
    }

    try {
      const sentence = documentResult.sentences[0].text.content;
      sentencesService.create({
        sentence,
        sentiment,
        metadata
      });
      context.result = {
        rejected: false,
        message: 'Sentence added to database',
        sentiment
      };
    } catch (error) {
      throw error;
    }

    return context;
  };
};
