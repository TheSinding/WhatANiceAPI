const mongoose = require('mongoose');

module.exports = function(app) {
  const options = app.get('mongodb');
  const user = process.env.MONGO_USER;
  const password = process.env.MONGO_PASSWORD;
  const url = options.url.replace('USER', user).replace('PASS', password);
  mongoose
    .connect(
      url,
      { useNewUrlParser: true }
    )
    .catch(error => {
      console.log(error);
    });
  mongoose.Promise = global.Promise;

  app.set('mongooseClient', mongoose);
};
