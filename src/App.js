import React from "react";
// 1. Import BrowserRouter and other necessary components
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import ActivitiesSection from "./components/ActivitiesSection";
import WhyChooseUs from "./components/WhyChooseUs";
import ShopByCollection from "./components/Shopbycollection";
import Testimonials from "./components/Testimonals";
import CtaSection from "./components/ctaSection";
import Footer from "./components/Footer";
import ActivitiesPage from "./pages/ActivitiesPage";
import AboutUs from "./pages/AboutusPage";
import ContactUs from "./pages/ContactusPage";
import Shop from "./pages/ShopPage";

function App() {
  return (
    // 2. Wrap everything in the Router
    <Router>
      <Navbar />
      
      {/* 3. Define your Routes */}
      <Routes>
        {/* This is your Main Landing Page */}
        <Route path="/" element={
          <>
            <HeroSection/>
            <ActivitiesSection/>
            <WhyChooseUs/>
            <ShopByCollection/>
            <Testimonials/>
            <CtaSection/>
          </>
        } />

                <Route path="/shop" element={<Shop/>} />

        <Route path="/activitypage" element={<ActivitiesPage/>} />
        <Route path="/about" element={<AboutUs/>} />
                <Route path="/contact" element={<ContactUs/>} />

      </Routes>

      <Footer />
    </Router>
  );
}

export default App;