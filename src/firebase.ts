import firebase from "firebase/app";
import "firebase/firestore";
let config = {
  apiKey: "",
  authDomain: "esports-firebase.firebaseapp.com",
  databaseURL: "https://bezkoder-firebase.firebaseio.com",
  projectId: "esports-firebase",
  storageBucket: "esports-firebase.appspot.com",
  messagingSenderId: "",
  appId: "",
};
firebase.initializeApp(config);
export default firebase.firestore();
