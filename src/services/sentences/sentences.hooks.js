const getRandomSentence = require('../../hooks/get-random-sentence');

const sentenceCounter = require('../../hooks/sentence-counter');

const addIdToCatalogue = require('../../hooks/add-id-to-catalogue');

const sentencesViewedCounter = require('../../hooks/sentences-viewed-counter');

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
    create: [sentenceCounter(), addIdToCatalogue()],
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
