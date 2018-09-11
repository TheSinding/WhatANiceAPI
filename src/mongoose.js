const mongoose = require('mongoose');

module.exports = function(app) {
  const options = app.get('mongodb');
  mongoose
    .connect(
      options.url,
      { useNewUrlParser: true }
    )
    .catch(error => {
      console.log(error);
    });
  mongoose.Promise = global.Promise;

  app.set('mongooseClient', mongoose);
};
