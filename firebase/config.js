import * as firebase from "firebase";
import "firebase/auth";
import "firebase/storage";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBorgfkvbhvVuigudWW6GKe77dU4PnwZrg",
  authDomain: "react-native-app-3156e.firebaseapp.com",
  projectId: "react-native-app-3156e",
  storageBucket: "react-native-app-3156e.appspot.com",
  messagingSenderId: "1058307357948",
  appId: "1:1058307357948:web:ee3e049aa2f33f5567ab79",
  measurementId: "G-MM1SXW9VXR",
};

export default firebase.initializeApp(firebaseConfig);
