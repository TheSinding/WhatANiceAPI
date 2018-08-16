const analyze = require('./analyze/analyze.service.js');
const sentences = require('./sentences/sentences.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function(app) {
  app.configure(analyze);
  app.configure(sentences);
};
