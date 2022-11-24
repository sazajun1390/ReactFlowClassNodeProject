// Import the functions you need from the SDKs you need
import { initializeApp, apps, app } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
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
const analytics = getAnalytics(app)
if (!apps.length) {
  initializeApp(firebaseConfig)
}
