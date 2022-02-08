import * as firebase from 'firebase/app'
import * as auth from 'firebase/auth'
import * as store from 'firebase/firestore'
import * as storage from 'firebase/storage'

//PASTE OR SET HERE YOUR FIREBASE CONFIG APP
firebase.initializeApp({
  apiKey: "YOUR API KEY",
  authDomain: "YOUR AUTH DOMAIN",
  projectId: "YOUR PROJECT ID",
  storageBucket: "YOUR STORAGE BUCKET",
  messagingSenderId: "YOUR MESSAGGING ID",
  appId: "YOUR APP ID"
})

export { auth } 

export { store }

const firestore = store.getFirestore()
export { firestore }

export { storage }
