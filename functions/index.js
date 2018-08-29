// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require("firebase-functions");

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require("firebase-admin");
admin.initializeApp();
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.addSentenceIdToCatalogue = functions.firestore
  .document("sentences/{sentenceId}")
  .onCreate((snap, context) => {
    const docRef = admin
      .firestore()
      .collection("catalogue")
      .doc("catalogue/sentencesIds");

    docRef
      .get()
      .then(catSnap => {
        const data = result.data();
        if (!result.exists) {
          docRef.set(ids);
          return;
        }
        data.ids.push(snap.id);
        return docRef.update(data);
      })
      .then(updated => {
        console.log("updated");
        return;
      })
      .catch(error => {
        console.log(error);
      });
  });
