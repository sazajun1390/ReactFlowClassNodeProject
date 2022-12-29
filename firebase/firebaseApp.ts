// Import the functions you need from the SDKs you need
import firebase,{ initializeApp, getApp, getApps } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore'
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: 'AIzaSyAE1L2MvT0KZRxNhDdeaMGBG4wLVIdUFgc',
  authDomain: 'reactumleditor.firebaseapp.com',
  projectId: 'reactumleditor',
  storageBucket: 'reactumleditor.appspot.com',
  messagingSenderId: '422500231282',
  appId: '1:422500231282:web:4cc756b1513d8f17193aeb',
  measurementId: 'G-36JPC6XE6V',
}

// Initialize Firebase
const fbConfig = initializeApp(firebaseConfig);
const firebaseApp = !getApps().length ? fbConfig : getApp()
export default firebaseApp


