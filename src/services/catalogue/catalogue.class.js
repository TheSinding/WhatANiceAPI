/* eslint-disable no-unused-vars */
const firestore = require('../../database/firestore');
const errors = require('@feathersjs/errors');
class Service {
  constructor(options) {
    this.options = options || {};
    this.events = ['counterChanged', 'viewed'];
    this.collection = firestore.collection('catalogue');
  }

  setup(app) {
    this.publish('counterChanged', () => app.channel('everybody'));
    this.publish('viewed', () => app.channel('everybody'));
  }

  async find(params) {
    try {
      const { query } = params;
      if (!('catalogue' in query))
        throw new errors['404']('Catalogue is missing');

      const docRef = this.collection.doc(query.document);

      const result = await docRef.get();

      return result.data();
    } catch (error) {
      throw error;
    }
  }

  async get(id, params) {
    try {
      const result = await this.collection.doc(id).get();
      if (!result.exists)
        throw new errors['404']('A catalogue with that id is not found');
      return result.data();
    } catch (error) {
      throw error;
    }
  }

  async create(data, params) {
    try {
      if (!('catalogueName' in data))
        throw new errors['404']('Name is missing');
      if (!('data' in data)) throw new errors['404']('Data is missing');

      const docRef = this.collection.doc(data.catalogueName);
      const result = await docRef.set({ ...data.data });
      return { id: result.id, ...data };
    } catch (error) {
      throw error;
    }
  }

  async update(id, data, params) {
    const docRef = this.collection.doc(id);
    try {
      const result = await docRef.update({ ...data });
      return result;
    } catch (error) {
      throw error;
    }
  }

  async patch(id, data, params) {
    return this.update(id, data, params);
  }

  async remove(id, params) {
    const docRef = this.collection.doc(id);
    try {
      await docRef.delete();
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
