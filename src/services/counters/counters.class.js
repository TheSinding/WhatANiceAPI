/* eslint-disable no-unused-vars */
const errors = require('@feathersjs/errors');
class Service {
  constructor(options) {
    this.options = options || {};
  }

  setup(app) {
    this.app = app;
    this.aggregations = this.app.service('aggregations');
  }

  async find(params) {
    const _aggregations = await this.aggregations.find();
    const data = { counters: {} };

    _aggregations.forEach(agg => {
      const key = Object.keys(agg)[0];
      const counter = {
        [key]: agg[key].count
      };
      Object.assign(data.counters, counter);
    });

    return data;
  }

  async get(id, params) {
    const aggregation = await this.aggregations.get(id);
    if (!aggregation.exists) throw new errors['404']('Counter does not exist');
    return {
      [id]: aggregation.data.count
    };
  }

  async create(data, params) {
    throw new errors['405']('Not allowed');
  }

  async update(id, data, params) {
    throw new errors['405']('Not allowed');
  }

  async patch(id, data, params) {
    throw new errors['405']('Not allowed');
  }

  async remove(id, params) {
    throw new errors['405']('Not allowed');
  }
}

module.exports = function(options) {
  return new Service(options);
};

module.exports.Service = Service;
