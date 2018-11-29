const url = require('url');
const MongoClient = require('mongodb').MongoClient;

module.exports = function(app) {
  const config = app.get('mongodb');
  const user = process.env.MONGO_USER;
  const password = process.env.MONGO_PASSWORD;
  const dbName = url.parse(config.url).path.substring(1);
  const _url = config.url.replace('USER', user).replace('PASS', password);
  const promise = MongoClient.connect(
    _url,
    config.options
  )
    .then(client => {
      // For mongodb <= 2.2
      if (client.collection) {
        return client;
      }

      return client.db(dbName);
    })
    .catch(error => {
      console.log(error);
    });

  app.set('mongoClient', promise);
};
