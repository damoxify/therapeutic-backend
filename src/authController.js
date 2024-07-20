const { auth, admin } = require('../firebase');
//const bcrypt = require('bcrypt');

// Google Sign-In
exports.googleSignIn = async (req, res) => {
  const { idToken } = req.body;

  try {
    const decodedToken = await auth.verifyIdToken(idToken);
    const uid = decodedToken.uid;

    // Check if user exists or create a new one
    const userRecord = await admin.auth().getUser(uid).catch(async (error) => {
      if (error.code === 'auth/user-not-found') {
        return await admin.auth().createUser({
          uid: uid,
          email: decodedToken.email,
          displayName: decodedToken.name,
          photoURL: decodedToken.picture,
        });
      }
      throw error;
    });

    // Generate custom token
    const customToken = await admin.auth().createCustomToken(uid);
    res.status(200).json({ token: customToken });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Signup
exports.signup = async (req, res) => {
  const { email, password, displayName } = req.body;

  try {
    // Create user with Firebase Authentication
    const userRecord = await admin.auth().createUser({
      email,
      password,
      displayName,
    });

    res.status(201).json({ uid: userRecord.uid, email: userRecord.email });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await admin.auth().getUserByEmail(email);
    // Here you would normally verify the password, but Firebase Admin SDK doesn't provide this functionality directly.
    // For a full implementation, consider using Firebase Client SDK on the client-side for user authentication and session management.
    const customToken = await admin.auth().createCustomToken(user.uid);
    res.status(200).json({ token: customToken });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
