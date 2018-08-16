/* eslint-disable no-unused-vars */
const errors = require('@feathersjs/errors');
class Service {
  constructor(options) {
    this.options = options || {};
    this.database = require('../../database/firestore');
    this.collection = this.database.collection('sentences');
  }

  async find(params) {
    try {
      const result = await this.collection.get();
      const documents = await result.docs.map(doc => {
        return { id: doc.id, data: doc.data() };
      });
      return documents;
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
    const document = this.database.doc(`${this.collection}/${id}`);
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
    const document = this.database.doc(`${this.collection}/${id}`);
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
