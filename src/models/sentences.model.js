// sentences-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function(app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const sentences = new Schema(
    {
      sentence: { type: String, required: true },
      metadata: { addedBy: String },
      sentiment: {
        magnitude: { type: Number, required: true },
        score: { type: Number, required: true }
      }
    },
    {
      timestamps: true
    }
  );

  return mongooseClient.model('sentences', sentences);
};
