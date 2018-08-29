const sentencesViewedCounter = require('../../hooks/sentences-viewed-counter');
const getRandomSentence = require('../../hooks/get-random-sentence');
const sentenceCounter = require('../../hooks/sentence-counter');

module.exports = {
  before: {
    all: [],
    find: [getRandomSentence()],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [sentencesViewedCounter()],
    create: [sentenceCounter()],
    update: [],
    patch: [],
    remove: [sentenceCounter()]
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
