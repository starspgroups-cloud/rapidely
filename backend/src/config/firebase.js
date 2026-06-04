let admin = null;
function getFirebase() {
  if (admin) return admin;
  try {
    const firebaseAdmin = require('firebase-admin');
    if (process.env.FIREBASE_PROJECT_ID && process.env.FIREBASE_CLIENT_EMAIL && process.env.FIREBASE_PRIVATE_KEY) {
      firebaseAdmin.initializeApp({ credential: firebaseAdmin.credential.cert({ projectId: process.env.FIREBASE_PROJECT_ID, clientEmail: process.env.FIREBASE_CLIENT_EMAIL, privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n') }) });
      admin = firebaseAdmin;
    }
  } catch (error) { console.warn('Firebase not configured'); }
  return admin;
}
module.exports = getFirebase;
