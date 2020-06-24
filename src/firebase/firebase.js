import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyB_0VuYaXEKeA7C81mMt7_cQnRF9HSJu3k",
  authDomain: "chatbox-02.firebaseapp.com",
  databaseURL: "https://chatbox-02.firebaseio.com",
  projectId: "chatbox-02",
  storageBucket: "chatbox-02.appspot.com",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth;
const db = firebase.database();

export { auth, db, firebase as default }