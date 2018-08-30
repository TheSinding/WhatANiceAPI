const { authenticate } = require('@feathersjs/authentication').hooks;

const generateApikey = require('../../hooks/generate-apikey');

const restrictApikeysToUser = require('../../hooks/restrict-apikeys-to-user');

module.exports = {
  before: {
    all: [authenticate('jwt')],
    find: [restrictApikeysToUser()],
    get: [restrictApikeysToUser()],
    create: [generateApikey()],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
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
