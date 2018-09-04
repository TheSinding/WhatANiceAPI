const sentencesViewedCounter = require('../../hooks/sentences-viewed-counter');
const getRandomSentence = require('../../hooks/get-random-sentence');
const sentenceCounter = require('../../hooks/sentence-counter');
const checkApikeyScope = require('../../hooks/check-apikey-scope');
const findApikey = require('../../hooks/find-apikey');

const analyzeSentence = require('../../hooks/analyze-sentence');

module.exports = {
  before: {
    all: [findApikey(), checkApikeyScope()],
    find: [getRandomSentence()],
    get: [],
    create: [analyzeSentence()],
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
