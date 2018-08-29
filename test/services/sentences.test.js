const assert = require('assert');
const app = require('../../src/app');

describe('\'sentences\' service', () => {
  it('registered the service', () => {
    const service = app.service('sentences');

    assert.ok(service, 'Registered the service');
  });
});
