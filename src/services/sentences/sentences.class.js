/* eslint-disable no-unused-vars */
const firestore = require('../../database/firestore');
const errors = require('@feathersjs/errors');
class Service {
  constructor(options) {
    this.options = options || {};
    this.events = ['counterChanged'];
    this.collection = firestore.collection('sentences');
  }

  async find(params) {
    try {
      const { query } = params;

      let limit = 25;
      let offset = 0;

      if ('offset' in query) offset = Number(query.offset);
      if ('limit' in query) limit = Number(query.limit);

      const result = await this.collection
        .limit(limit)
        .offset(offset)
        .get();

      // if (!result.exists) return { total: 0, limit, offset, data: [] };

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
      if (!result.exists) return { message: 'Resource not found' };
      return result.data();
    } catch (error) {
      throw error;
    }
  }

  async create(data, params) {
    try {
      await this.collection.add({ ...data });
      return 'Success';
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
