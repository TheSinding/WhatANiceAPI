// aggregations-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function(app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const aggregations = new Schema(
    {
      type: { type: String, required: true },
      last5: Map,
      count: Number
    },
    {
      timestamps: true
    }
  );

  return mongooseClient.model('aggregations', aggregations);
};
