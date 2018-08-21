/* eslint-disable no-unused-vars */
const firestore = require('../../database/firestore');
const errors = require('@feathersjs/errors');
class Service {
  constructor(options) {
    this.options = options || {};
    this.collection = firestore.collection('aggregation');
  }

  async find(params) {
    try {
      const result = await this.collection.get();

      if (result.size === 0) return { data: [] };

      const documents = result.docs.map(async doc => {
        return { [doc.id]: doc.data() };
      });
      return await Promise.all(documents);
    } catch (error) {
      throw error;
    }
  }

  async get(id, params) {
    try {
      const result = await this.collection.doc(id).get();
      if (!result.exists)
        return { exists: false, message: 'Resource not found' };
      return { exists: true, data: result.data() };
    } catch (error) {
      throw error;
    }
  }

  async create(data, params) {
    if (!('id' in data)) throw new errors.BadRequest('Id missing');
    try {
      const doc = await this.collection.doc(data.id).set({ ...data.data });
      return doc;
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
    // TODO: Cache the count to reduce the amount of writes
    const document = this.collection.doc(id);
    try {
      await document.update({ ...data });
      return 'Success';
    } catch (error) {
      throw error;
    }
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
