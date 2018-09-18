const assert = require('assert');
const app = require('../../src/app');

describe('\'metrics\' service', () => {
  it('registered the service', () => {
    const service = app.service('metrics');

    assert.ok(service, 'Registered the service');
  });
});
