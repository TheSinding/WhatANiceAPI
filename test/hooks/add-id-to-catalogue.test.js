const assert = require('assert');
const feathers = require('@feathersjs/feathers');
const addIdToCatalogue = require('../../src/hooks/add-id-to-catalogue');

describe('\'addIDToCatalogue\' hook', () => {
  let app;

  beforeEach(() => {
    app = feathers();

    app.use('/dummy', {
      async get(id) {
        return { id };
      }
    });

    app.service('dummy').hooks({
      after: addIdToCatalogue()
    });
  });

  it('runs the hook', async () => {
    const result = await app.service('dummy').get('test');
    
    assert.deepEqual(result, { id: 'test' });
  });
});
