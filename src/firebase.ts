import firebase from "firebase";
import "firebase/firestore";

const firebaseConfig = firebase.initializeApp({
  apiKey: "AIzaSyAVC-9c-DFqfddFiW_Q-C0SNWElN8lLzxo",
  authDomain: "groceries-9d12b.firebaseapp.com",
  databaseURL: "https://groceries-9d12b.firebaseio.com",
  projectId: "groceries-9d12b",
  storageBucket: "groceries-9d12b.appspot.com",
  messagingSenderId: "743547521985",
  appId: "1:743547521985:web:e064c84e6780e54255bd40",
});

export {firebaseConfig as firebase};
