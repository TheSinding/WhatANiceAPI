// apikeys-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function(app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const apikeys = new Schema(
    {
      userId: { type: Schema.Types.ObjectId, required: true },
      apikey: { type: String, required: true },
      scopes: [],
      valid: { type: Boolean, default: true }
    },
    {
      timestamps: true
    }
  );

  return mongooseClient.model('apikeys', apikeys);
};
