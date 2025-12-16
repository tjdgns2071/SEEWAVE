// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// 필요하면 나중에 analytics도 다시 쓸 수 있음
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyDAtoMvuOEmSY1q6HbWdUKCpiLJBMigAzY",
    authDomain: "seewave-b7152.firebaseapp.com",
    projectId: "seewave-b7152",
    storageBucket: "seewave-b7152.firebasestorage.app",
    messagingSenderId: "526781726858",
    appId: "1:526781726858:web:86281581ac7b6ec40d2d73",
    measurementId: "G-LBTB35769Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ 우리가 로그인/회원가입에서 쓸 auth 객체
export const auth = getAuth(app);

// 나중에 필요하면 다시 활성화
// const analytics = getAnalytics(app);

import { onAuthStateChanged } from "firebase/auth";

export function subscribeToAuth(callback) {
    return onAuthStateChanged(auth, callback);
}
