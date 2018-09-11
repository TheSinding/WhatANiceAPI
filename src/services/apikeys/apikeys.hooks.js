const { authenticate } = require('@feathersjs/authentication').hooks;

const generateApikey = require('../../hooks/generate-apikey');

const restrictApikeysToUser = require('../../hooks/restrict-apikeys-to-user');

const overrideId = require('../../hooks/override-id');

const deleteOldKey = require('../../hooks/delete-old-key');

module.exports = {
  before: {
    all: [authenticate('jwt')],
    find: [restrictApikeysToUser()],
    get: [overrideId()],
    create: [generateApikey(), deleteOldKey()],
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
