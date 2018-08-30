const assert = require('assert');
const app = require('../../src/app');

describe('\'apikeys\' service', () => {
  it('registered the service', () => {
    const service = app.service('apikeys');

    assert.ok(service, 'Registered the service');
  });
});
