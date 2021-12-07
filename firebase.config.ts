import * as firebase from 'firebase/app'
import * as auth from 'firebase/auth'
import * as store from 'firebase/firestore'
import * as storage from 'firebase/storage'

firebase.initializeApp({
  apiKey: "AIzaSyC1nEDv3gPNpXy5ixU1xZ1_lZkVTpRfozU",
  authDomain: "events-photos-574f5.firebaseapp.com",
  projectId: "events-photos-574f5",
  storageBucket: "events-photos-574f5.appspot.com",
  messagingSenderId: "223588365438",
  appId: "1:223588365438:web:43898dbb1e064a6599942f"
})

export { auth } 

export { store }

const firestore = store.getFirestore()
export  { firestore }

export { storage }

/* const fieldValue = firebase.firestore.FieldValue
export { fieldValue } */