const speakeasy = require('speakeasy');
const qrcode = require('qrcode');

function generateSecret() {
  return speakeasy.generateSecret({ length: 20 });
}

function generateQRCode(secret) {
  return new Promise((resolve, reject) => {
    qrcode.toDataURL(secret.otpauth_url, (err, data_url) => {
      if (err) {
        reject(err);
      } else {
        resolve(data_url);
      }
    });
  });
}

function verifyToken(secret, token) {
  return speakeasy.totp.verify({
    secret,
    encoding: 'base32',
    token,
  });
}

module.exports = { generateSecret, generateQRCode, verifyToken };
