const assert = require('assert');
const app = require('../../src/app');

describe('\'analyze\' service', () => {
  it('registered the service', () => {
    const service = app.service('analyze');

    assert.ok(service, 'Registered the service');
  });
});
