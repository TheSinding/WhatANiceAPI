/* eslint-disable no-unused-vars */
const language = require('@google-cloud/language');
const errors = require('@feathersjs/errors');
class Service {
  constructor(options) {
    this.options = options || {};
    this.client = new language.LanguageServiceClient();
  }

  async find(params) {
    throw new errors.NotFound();
  }

  async get(id, params) {
    throw new errors.NotFound();
  }

  async create(data, params) {
    if (!data.hasOwnProperty('metadata'))
      throw new errors.BadRequest('Metadata is missing');
    if (!data.hasOwnProperty('document'))
      throw new errors.BadRequest('Document is missing');

    const document = data.document;

    if (!document.hasOwnProperty('content'))
      throw new errors.BadRequest('Content is missing');
    if (!document.hasOwnProperty('type'))
      throw new errors.BadRequest('Type is missing');
    try {
      const documentResult = await this.client.analyzeSentiment({ document });
      const result = {
        document: document,
        result: documentResult[0],
        metadata: data.metadata
      };
      return result;
    } catch (error) {
      return error;
    }
  }

  async update(id, data, params) {
    return data;
  }

  async patch(id, data, params) {
    return data;
  }

  async remove(id, params) {
    return { id };
  }
}

module.exports = function(options) {
  return new Service(options);
};

module.exports.Service = Service;
