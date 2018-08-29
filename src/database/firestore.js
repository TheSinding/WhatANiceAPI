const Firestore = require('@google-cloud/firestore');
if (
  process.env.GOOGLE_APPLICATION_CREDENTIALS === null ||
  process.env.GOOGLE_APPLICATION_CREDENTIALS === undefined
) {
  throw new Error('Google credentials is missing from env!');
}
const store = new Firestore({
  projectId: process.env.GOOGLE_APPLICATION_CREDENTIALS.project_id,
  keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
  timestampsInSnapshots: true
});
module.exports = store;
