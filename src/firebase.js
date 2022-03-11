import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDXJsoMzKHeZKxzYPbaq2midjkxrLd0ap8",
  authDomain: "clone-d766c.firebaseapp.com",
  databaseURL: "https://clone-d766c.firebaseio.com",
  projectId: "clone-d766c",
  storageBucket: "clone-d766c.appspot.com",
  messagingSenderId: "968444586146",
  appId: "1:968444586146:web:11460afda16caefbd7cffb",
  measurementId: "G-086VBY3FBZ"
};


const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();




export { db, auth };













