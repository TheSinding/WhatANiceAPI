const assert = require('assert');
const feathers = require('@feathersjs/feathers');
const getRandomSentence = require('../../src/hooks/get-random-sentence');

describe('\'getRandomSentence\' hook', () => {
  let app;

  beforeEach(() => {
    app = feathers();

    app.use('/dummy', {
      async get(id) {
        return { id };
      }
    });

    app.service('dummy').hooks({
      after: getRandomSentence()
    });
  });

  it('runs the hook', async () => {
    const result = await app.service('dummy').get('test');
    
    assert.deepEqual(result, { id: 'test' });
  });
});
