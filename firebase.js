const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json'); // Adjust the path to your service account key

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://therapeutic-backend.firebaseio.com' // Use your database URL
});

const auth = admin.auth();
const firestore = admin.firestore();

module.exports = { admin, auth, firestore };

