const Firestore = require('@google-cloud/firestore');
const store = new Firestore({
  projectId: 'tea-project-211819',
  keyFilename:
    '/home/thesinding/code/fun/tea_backend/tea-project-211819-4771b9cc4d26.json'
});
module.exports = store;
