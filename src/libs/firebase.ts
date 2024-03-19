import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyAlWaCDcPGmPQ7cx2b4jY059glmkVQNcSM',
  authDomain: 'chat-application-56c11.firebaseapp.com',
  projectId: 'chat-application-56c11',
  storageBucket: 'chat-application-56c11.appspot.com',
  messagingSenderId: '1065471895110',
  appId: '1:1065471895110:web:d49cbf8d21e5e3a9014c47'
}

export const firebaseApp = firebase.initializeApp(firebaseConfig)
export const auth = firebase.auth()
export const firestore = firebase.firestore()
