import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDufM1cAckuYLfgn81lTCmg2wVUiSDyM3U",
  authDomain: "chatbox-b9fba-6267d.firebaseapp.com",
  databaseURL: "https://chatbox-b9fba-default-rtdb.firebaseio.com",
  projectId: "chatbox-b9fba",
  storageBucket: "chatbox-b9fba.appspot.com",
  messagingSenderId: "831904839153",
  appId: "1:831904839153:web:c9a8f642557d71fdc80050",
  measurementId: "G-2CT93SLJ5C"
};

export const firebaseApp = firebase.initializeApp(firebaseConfig)
export const auth = firebase.auth()
export const firestore = firebase.firestore()
