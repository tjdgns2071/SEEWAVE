import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";

import HomePage from "./pages/HomePage";
import CategoryPage from "./pages/CategoryPage";
import CoursesPage from "./pages/CoursesPage";
import PricingPage from "./pages/PricingPage";
import FaqPage from "./pages/FaqPage";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import StartWatchingPage from "./pages/StartWatchingPage";
import PaymentSuccessPage from "./pages/PaymentSuccessPage";
import PaymentCancelPage from "./pages/PaymentCancelPage";

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/category/:slug" element={<CategoryPage />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/start" element={<StartWatchingPage />} />
        <Route path="/payment-success" element={<PaymentSuccessPage />} />
        <Route path="/payment-cancel" element={<PaymentCancelPage />} />
      </Routes>
    </Layout>
  );
}