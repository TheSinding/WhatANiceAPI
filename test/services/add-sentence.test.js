const assert = require('assert');
const app = require('../../src/app');

describe('\'addSentence\' service', () => {
  it('registered the service', () => {
    const service = app.service('add-sentence');

    assert.ok(service, 'Registered the service');
  });
});
