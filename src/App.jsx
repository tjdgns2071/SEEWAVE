import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "./firebase";

import CategoryPage from "./pages/CategoryPage";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

import NavBar from "./components/Navbar";
import Hero from "./components/Hero";
import CategoryRow from "./components/Category";
import Pricing from "./components/Pricing";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";

// pages
function HomePage() {
  return (
    <>
      <Hero />
      <CategoryRow title="Browse by Category" items={HOME_CATEGORIES} />
      <Pricing />
      <FAQ />
    </>
  );
}

export default function App() {
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) return;

      const userRef = doc(db, "users", user.uid);
      const snap = await getDoc(userRef);

      if (!snap.exists()) {
        await setDoc(userRef, {
          uid: user.uid,
          email: user.email,
          createdAt: serverTimestamp(),
        });
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/start" element={<StartWatchingPage />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/category/:slug" element={<CategoryPage />} />
      </Routes>
      <Footer />
    </>
  );
}
