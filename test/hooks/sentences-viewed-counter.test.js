const assert = require('assert');
const feathers = require('@feathersjs/feathers');
const sentencesViewedCounter = require('../../src/hooks/sentences-viewed-counter');

describe('\'sentencesViewedCounter\' hook', () => {
  let app;

  beforeEach(() => {
    app = feathers();

    app.use('/dummy', {
      async get(id) {
        return { id };
      }
    });

    app.service('dummy').hooks({
      before: sentencesViewedCounter()
    });
  });

  it('runs the hook', async () => {
    const result = await app.service('dummy').get('test');
    
    assert.deepEqual(result, { id: 'test' });
  });
});
