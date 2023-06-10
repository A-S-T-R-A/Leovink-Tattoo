import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
    apiKey: import.meta.env.PUBLIC_FIREBASE_API_KEY,
    authDomain: import.meta.env.PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.PUBLIC_FIREBASE_APP_ID,
}
/* const firebaseConfig = {
    apiKey: "AIzaSyDOm3cIIX2REj94_4KSY-oU-BTEfbMBkBE",
    authDomain: "leovink-tattoo.firebaseapp.com",
    projectId: "leovink-tattoo",
    storageBucket: "leovink-tattoo.appspot.com",
    messagingSenderId: "969237374614",
    appId: "1:969237374614:web:1f64ff0baef003378cc4b7",
} */

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app)
