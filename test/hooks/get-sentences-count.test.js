const assert = require('assert');
const feathers = require('@feathersjs/feathers');
const getSentencesCount = require('../../src/hooks/get-sentences-count');

describe('\'getSentencesCount\' hook', () => {
  let app;

  beforeEach(() => {
    app = feathers();

    app.use('/dummy', {
      async get(id) {
        return { id };
      }
    });

    app.service('dummy').hooks({
      before: getSentencesCount()
    });
  });

  it('runs the hook', async () => {
    const result = await app.service('dummy').get('test');
    
    assert.deepEqual(result, { id: 'test' });
  });
});
