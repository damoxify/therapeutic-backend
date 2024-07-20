import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyA0ZpjNCtna8zK2iuztkK-T3w2hKZOUwmU",
    authDomain: "therapeutic-backend.firebaseapp.com",
    projectId: "therapeutic-backend",
    storageBucket: "therapeutic-backend.appspot.com",
    messagingSenderId: "812185141911",
    appId: "1:812185141911:web:aaf87092c201cfc4075fd2",
    measurementId: "G-QWLE40WJCX"
  };
  

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export const signInWithGoogle = () => {
  return signInWithPopup(auth, provider)
    .then((result) => {
      return result.user.getIdToken();
    })
    .catch((error) => {
      console.error('Error signing in with Google:', error);
      throw error;
    });
};
