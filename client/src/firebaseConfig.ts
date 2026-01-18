// @ts-ignore
import { initializeApp } from 'firebase/app';
// @ts-ignore
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID
};

console.log("Firebase config loaded:", !!firebaseConfig.apiKey);

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Messaging disabled temporarily to debug white screen crash
export const messaging = null;
/*
try {
    if (typeof window !== 'undefined') {
        import('firebase/messaging').then(({ getMessaging, isSupported }) => {
            isSupported().then(supported => {
                if (supported) {
                    messaging = getMessaging(app);
                }
            });
        });
    }
} catch (e) {
    console.warn("Firebase Messaging not supported in this environment");
}
*/
