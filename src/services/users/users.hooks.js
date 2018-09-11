const { authenticate } = require('@feathersjs/authentication').hooks;
const checkUserPermissions = require('../../hooks/check-user-permissions');
const {
  hashPassword,
  protect
} = require('@feathersjs/authentication-local').hooks;

const removePermissions = require('../../hooks/remove-permissions');

const customGithubUser = require('../../hooks/custom-github-user');

const createKeyAtNewUser = require('../../hooks/create-key-at-new-user');

module.exports = {
  before: {
    all: [],
    find: [authenticate('jwt'), checkUserPermissions()],
    get: [authenticate('jwt'), checkUserPermissions()],
    create: [hashPassword(), removePermissions(), customGithubUser()],
    update: [hashPassword(), authenticate('jwt'), checkUserPermissions()],
    patch: [hashPassword(), authenticate('jwt'), checkUserPermissions()],
    remove: [authenticate('jwt')]
  },

  after: {
    all: [
      // Make sure the password field is never sent to the client
      // Always must be the last hook
      protect('password')
    ],
    find: [],
    get: [],
    create: [createKeyAtNewUser()],
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
