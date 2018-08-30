const mongoose = require('mongoose');

module.exports = function(app) {
  mongoose
    .connect(
      app.get('mongodb').url,
      { useNewUrlParser: true }
    )
    .catch(error => {
      console.log(error);
    });
  mongoose.Promise = global.Promise;

  app.set('mongooseClient', mongoose);
};
