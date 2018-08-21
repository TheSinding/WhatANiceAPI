/* eslint-disable no-unused-vars */
const firestore = require('../../database/firestore');
const errors = require('@feathersjs/errors');
class Service {
  constructor(options) {
    this.options = options || {};
    this.events = ['counterChanged', 'viewed'];
    this.collection = firestore.collection('sentences');
  }

  setup(app) {
    this.publish('counterChanged', () => app.channel('everybody'));
    this.publish('viewed', () => app.channel('everybody'));
  }

  async find(params) {
    try {
      const { query } = params;
      const { paginate } = this.options;
      let offset = 0;
      const queryLimit = query.limit !== undefined ? Number(query.limit) : null;
      const limit = queryLimit === null ? paginate.default : queryLimit;

      if ('offset' in query) offset = Number(query.offset);
      if (limit > paginate.max)
        throw new errors['400'](`Limit is too large, max is ${paginate.max}`);

      const result = await this.collection
        .limit(limit)
        .offset(offset)
        .get();

      const documents = result.docs.map(async doc => {
        return { id: doc.id, data: doc.data() };
      });

      const data = {
        total: result.size,
        limit,
        offset,
        data: await Promise.all(documents)
      };

      return data;
    } catch (error) {
      throw error;
    }
  }

  async get(id, params) {
    try {
      const result = await this.collection.doc(id).get();
      if (!result.exists)
        throw new errors['404']('A sentence with that id is not found');
      return result.data();
    } catch (error) {
      throw error;
    }
  }

  async create(data, params) {
    try {
      const result = await this.collection.add({ ...data });
      return { id: result.id, ...data };
    } catch (error) {
      throw error;
    }
  }

  async update(id, data, params) {
    const document = this.collection.doc(id);
    try {
      await document.update({ ...data });
      return 'Success';
    } catch (error) {
      throw error;
    }
  }

  async patch(id, data, params) {
    return data;
  }

  async remove(id, params) {
    const document = this.collection.doc(id);
    try {
      await document.delete();
      return 'Success';
    } catch (error) {
      throw error;
    }
  }
}

module.exports = function(options) {
  return new Service(options);
};

module.exports.Service = Service;
