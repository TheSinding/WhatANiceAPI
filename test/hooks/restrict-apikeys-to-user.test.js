const assert = require('assert');
const feathers = require('@feathersjs/feathers');
const restrictApikeysToUser = require('../../src/hooks/restrict-apikeys-to-user');

describe('\'restrictApikeysToUser\' hook', () => {
  let app;

  beforeEach(() => {
    app = feathers();

    app.use('/dummy', {
      async get(id) {
        return { id };
      }
    });

    app.service('dummy').hooks({
      before: restrictApikeysToUser()
    });
  });

  it('runs the hook', async () => {
    const result = await app.service('dummy').get('test');
    
    assert.deepEqual(result, { id: 'test' });
  });
});
