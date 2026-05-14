// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFunctions, httpsCallable } from "firebase/functions";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDAtoMvuOEmSY1q6HbWdUKCpiLJBMigAzY",
    authDomain: "seewave-b7152.firebaseapp.com",
    projectId: "seewave-b7152",
    storageBucket: "seewave-b7152.firebasestorage.app",
    messagingSenderId: "526781726858",
    appId: "1:526781726858:web:86281581ac7b6ec40d2d73",
    measurementId: "G-LBTB35769Z"
};

export const app = initializeApp(firebaseConfig);

// Auth
export const auth = getAuth(app);

export function subscribeToAuth(callback) {
    return onAuthStateChanged(auth, callback);
}

// Firestore
export const db = getFirestore(app);

// Functions
export const functions = getFunctions(app, "us-central1");

export const createCheckoutSession = httpsCallable(
    functions,
    "createCheckoutSession"
);