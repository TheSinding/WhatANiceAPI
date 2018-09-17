const sentencesViewedCounter = require('../../hooks/sentences-viewed-counter');
const sentenceCounter = require('../../hooks/sentence-counter');
const getRandomSentence = require('../../hooks/get-random-sentence');

const { authenticate } = require('@feathersjs/authentication').hooks;

const analyzeSentence = require('../../hooks/analyze-sentence');

module.exports = {
  before: {
    all: [],
    find: [getRandomSentence()],
    get: [getRandomSentence()],
    create: [analyzeSentence()],
    update: [authenticate('jwt')],
    patch: [authenticate('jwt')],
    remove: [authenticate('jwt')]
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
