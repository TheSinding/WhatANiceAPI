const assert = require('assert');
const feathers = require('@feathersjs/feathers');
const customGithubUser = require('../../src/hooks/custom-github-user');

describe('\'customGithubUser\' hook', () => {
  let app;

  beforeEach(() => {
    app = feathers();

    app.use('/dummy', {
      async get(id) {
        return { id };
      }
    });

    app.service('dummy').hooks({
      before: customGithubUser()
    });
  });

  it('runs the hook', async () => {
    const result = await app.service('dummy').get('test');
    
    assert.deepEqual(result, { id: 'test' });
  });
});
