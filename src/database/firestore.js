const Firestore = require('@google-cloud/firestore');
if (process.env.GOOGLE_APPLICATION_CREDENTIALS === null) {
  throw new Error('Google credentials is missing from env!');
}
const store = new Firestore({
  projectId: 'tea-project-211819',
  keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS
});
module.exports = store;
