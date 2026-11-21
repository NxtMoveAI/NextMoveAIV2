import { initializeApp, getApps, getApp, type FirebaseApp, type FirebaseOptions } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";

/**
 * Firebase Web Configuration
 * Loaded securely via environment variables (NEXT_PUBLIC_ prefix makes them accessible in client bundles)
 */
export const firebaseConfig: FirebaseOptions = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

/**
 * Validates whether the required Firebase configuration environment variables are defined.
 */
export function isFirebaseConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_FIREBASE_API_KEY &&
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID &&
    process.env.NEXT_PUBLIC_FIREBASE_APP_ID
  );
}

/**
 * Initializes or retrieves the FirebaseApp singleton safely,
 * preventing duplicate initialization errors during Next.js Fast Refresh and hot reloads.
 */
export function getFirebaseApp(): FirebaseApp {
  if (getApps().length > 0) {
    return getApp();
  }
  return initializeApp(firebaseConfig);
}

/**
 * Primary Firebase App singleton instance
 */
export const app: FirebaseApp = getFirebaseApp();

/**
 * Primary Firebase Authentication service instance configured for client usage
 */
export const auth: Auth = getAuth(app);

/**
 * Primary Cloud Firestore database instance configured for client usage
 */
export const db: Firestore = getFirestore(app);

