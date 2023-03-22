import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getPerformance } from 'firebase/performance'
import { getStorage } from 'firebase/storage'
const app = initializeApp({
  apiKey: import.meta.env.local.API_KEY,
  authDomain: import.meta.env.local.AUTH_DOMAIN,
  projectId: import.meta.env.local.PROJECT_ID,
  storageBucket: import.meta.env.local.STORAGE_BUCKET,
  messagingSenderId: import.meta.env.local.MESSAGIN_SENDER_ID,
  appId: import.meta.env.local.APP_ID,
  measurementId: import.meta.env.local.MEASUREMENT_ID,
})
const analytics = getAnalytics(app)
const auth = getAuth()
const firestore = getFirestore(app)
const performance = getPerformance(app)
const storage = getStorage(app)

export { analytics, auth, firestore, performance, storage }
