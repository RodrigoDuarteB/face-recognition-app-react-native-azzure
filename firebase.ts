import * as firebase from 'firebase/app'
import * as firebaseAuth from 'firebase/auth'
import * as firebaseStore from 'firebase/firestore'
import * as firebaseStorage from 'firebase/storage'
import { FIREBASE_API_KEY, FIREBASE_AUTH_DOMAIN, FIREBASE_PROJECT_ID, FIREBASE_STORAGE_BUCKET, FIREBASE_MESSAGING_SENDER_ID, FIREBASE_APP_ID } from '@env'

//SET HERE YOUR FIREBASE CONFIG APP
export const app = firebase.initializeApp({
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
  appId: FIREBASE_APP_ID
})

const auth = firebaseAuth.getAuth(app)
export { auth } 

const store = firebaseStore.getFirestore(app)
export { store }

var storage = firebaseStorage.getStorage(app)
export { storage }
