// users-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function(app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const ranks = app.get('ranks');
  const users = new Schema(
    {
      email: { type: String, required: true, unique: true },
      password: String,
      photos: [],
      providerMetadata: Map,
      permissions: { type: [String], defualt: ['USER'] },
      rank: {
        type: String,
        default: ranks.default,
        enum: ranks.types
      },
      githubId: String,
      verified: { type: Boolean, default: false }
    },
    {
      timestamps: true
    }
  );

  return mongooseClient.model('users', users);
};
