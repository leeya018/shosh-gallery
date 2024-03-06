// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

const firebaseDevConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY_DEV,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN_DEV,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID_DEV,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET_DEV,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID_DEV,
  appId: process.env.NEXT_PUBLIC_APP_ID_DEV,
}
const firebaseProdConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY_PROD,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN_PROD,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID_PROD,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET_PROD,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID_PROD,
  appId: process.env.NEXT_PUBLIC_APP_ID_PROD,
}

const firebaseConfig =
  process.env.NODE_ENV === "development"
    ? firebaseDevConfig
    : firebaseProdConfig

console.log({ firebaseConfig })
const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const auth = getAuth(app)
export const storage = getStorage(app)
