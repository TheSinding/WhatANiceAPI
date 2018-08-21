const assert = require('assert');
const app = require('../../src/app');

describe('\'catalogue\' service', () => {
  it('registered the service', () => {
    const service = app.service('catalogue');

    assert.ok(service, 'Registered the service');
  });
});
