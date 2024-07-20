const functions = require('firebase-functions');
const admin = require('firebase-admin');
const { OAuth2Client } = require('google-auth-library');
const { generateSecret, generateQRCode, verifyToken } = require('./utils/twoFactorAuth');

admin.initializeApp();

const db = admin.firestore();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

exports.googleSignIn = functions.https.onRequest(async (req, res) => {
  try {
    const { token } = req.body;
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const { name, email, picture, sub } = ticket.getPayload();
    let userRef = db.collection('users').doc(email);
    let userDoc = await userRef.get();
    if (!userDoc.exists) {
      await userRef.set({
        googleId: sub,
        email,
        name,
        profilePic: picture,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      });
      userDoc = await userRef.get();
    }
    const user = userDoc.data();
    res.json({ user });
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

exports.setup2FA = functions.https.onRequest(async (req, res) => {
  try {
    const { userId } = req.body;
    const userRef = db.collection('users').doc(userId);
    const userDoc = await userRef.get();
    if (!userDoc.exists) {
      return res.status(404).json({ message: 'User not found' });
    }
    const secret = generateSecret();
    const qrCode = await generateQRCode(secret);
    await userRef.update({ twoFASecret: secret.base32 });
    res.json({ qrCode, secret: secret.base32 });
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

exports.verify2FA = functions.https.onRequest(async (req, res) => {
  try {
    const { userId, code } = req.body;
    const userRef = db.collection('users').doc(userId);
    const userDoc = await userRef.get();
    if (!userDoc.exists) {
      return res.status(404).json({ message: 'User not found' });
    }
    const user = userDoc.data();
    const isValid = verifyToken(user.twoFASecret, code);
    if (isValid) {
      res.json({ success: true, message: '2FA verified' });
    } else {
      res.json({ success: false, message: 'Invalid 2FA code' });
    }
  } catch (error) {
    res.status(500).send(error.toString());
  }
});


