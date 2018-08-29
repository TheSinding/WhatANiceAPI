const assert = require('assert');
const app = require('../../src/app');

describe('\'aggregations\' service', () => {
  it('registered the service', () => {
    const service = app.service('aggregations');

    assert.ok(service, 'Registered the service');
  });
});
