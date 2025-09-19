import { useState } from "react";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { ServiceCategories } from "./components/ServiceCategories";
import { FeaturedBusinesses } from "./components/FeaturedBusinesses";
import { HowItWorks } from "./components/HowItWorks";
import { Footer } from "./components/Footer";
import { UserProfile } from "./components/UserProfile";
import { BookingHistory } from "./components/BookingHistory";
import { BusinessProfile } from "./components/BusinessProfile";
import  Login  from "./components/Login";      // 👈 add login component
import { Register } from "./components/Register"; // 👈 add register component
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";  // 👈 use auth context
import { RegisterBusiness } from "./components/RegisterBusiness";

export default function App() {
  const { user, loading, logoutUser } = useAuth();

  if (loading) return <div>Loading...</div>;

  return (
    <div className="min-h-screen">
      <Header user={user} onLogout={logoutUser} />
      
      <Routes>
        {/* Public pages */}
        <Route path="/" element={
          <>
            <Hero />
            <ServiceCategories />
            <FeaturedBusinesses />
            <HowItWorks />
          </>
        } />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route path="/register" element={user ? <Navigate to="/" /> : <Register />} />
        <Route path="/register-business" element={user ? <Navigate to="/" /> : <RegisterBusiness />} />
        {/* Protected pages */}
        <Route path="/profile" element={user ? <UserProfile user={user}/> : <Navigate to="/login" />} />
        <Route path="/bookings" element={user ? <BookingHistory /> : <Navigate to="/login" />} />
        <Route path="/business" element={user?.role == "business" ? <BusinessProfile /> : <Navigate to="/" />} />

        {/* Catch-all redirect */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      <Footer />
    </div>
  );
}