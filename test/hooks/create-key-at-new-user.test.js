const assert = require('assert');
const feathers = require('@feathersjs/feathers');
const createKeyAtNewUser = require('../../src/hooks/create-key-at-new-user');

describe('\'createKeyAtNewUser\' hook', () => {
  let app;

  beforeEach(() => {
    app = feathers();

    app.use('/dummy', {
      async get(id) {
        return { id };
      }
    });

    app.service('dummy').hooks({
      after: createKeyAtNewUser()
    });
  });

  it('runs the hook', async () => {
    const result = await app.service('dummy').get('test');
    
    assert.deepEqual(result, { id: 'test' });
  });
});
