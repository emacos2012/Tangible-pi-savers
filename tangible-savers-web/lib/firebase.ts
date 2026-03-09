import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

// Firebase config (use env vars in production). These values were provided
// — you can replace them with environment variables as needed.
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyCLrxThe1gWXFMhqcbGv7Lo-UVqmBjcm7c",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "tangible-savers-web.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "tangible-savers-web",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "tangible-savers-web.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "797116760234",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:797116760234:web:fda956a16fedcce66bd0d3",
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "G-1P2H00J8LV",
};

// Initialize Firebase Client Apps - prevent duplicate initialization
let app;
try {
  app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
} catch (error) {
  console.error('Firebase initialization error:', error);
  // Create a fallback app with minimal config
  app = initializeApp(firebaseConfig);
}

export const auth = getAuth(app);
export const db = getFirestore(app);

// Initialize analytics only in the browser (guard for SSR)
// and handle errors gracefully
let analytics: ReturnType<typeof getAnalytics> | null = null;
if (typeof window !== 'undefined') {
  try {
    // Delay analytics initialization to not block the main thread
    setTimeout(() => {
      try {
        analytics = getAnalytics(app);
      } catch (_err) {
        // Analytics may fail in some environments; ignore silently
        console.warn('Analytics initialization failed:', _err);
      }
    }, 2000);
  } catch (_err) {
    // Analytics may fail in some environments; ignore silently
  }
}

export { analytics };
export default app;

