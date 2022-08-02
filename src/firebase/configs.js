
import firebase from "firebase/compat/app"
import "firebase/compat/analytics"
import "firebase/compat/auth"
import "firebase/compat/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyDNYax-tfKo9u5_wQ5gPLn-4-R6TKkRpMA",
  authDomain: "fire-base-21890.firebaseapp.com",
  projectId: "fire-base-21890",
  storageBucket: "fire-base-21890.appspot.com",
  messagingSenderId: "1035457991420",
  appId: "1:1035457991420:web:d4115536c541b1a570bd79",
  measurementId: "G-G6EENEKJBY",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig)
firebase.analytics();

const db = firebase.firestore()
const auth = firebase.auth()

// auth.useEmulator("http://localhost:9099")
// if(window.location.hostname == "localhost") {
//   db.useEmulator("localhost","8080")
// }

export {db, auth };
export default firebase;
