

const getRandomSentence = require('../../hooks/get-random-sentence');

const sentenceCounter = require('../../hooks/sentence-counter');

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [getRandomSentence()],
    get: [],
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
