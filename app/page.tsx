"use client";

import { useState } from "react";
import { useAuth } from "@/context/auth-context";
import LoginPage from "@/components/auth/login-page";
import PhoneNumberPage from "@/components/auth/phone-number-page";
import OtpVerificationPage from "@/components/auth/otp-verification-page";
import LandingPage from "@/components/landing/landing-page"; // Internal "What's on your mind" page
import RestaurantPage from "@/components/restaurant/restaurant-page";
import CartPage from "@/components/checkout/cart-page";
import CheckoutPage from "@/components/checkout/checkout-page";
import ThankYouPage from "@/components/checkout/thank-you-page";
import TrackOrderPage from "@/components/checkout/track-order-page";
import CategoryPage from "@/components/category/category";
import MainLandingView from "@/components/main/main-landing-view"; // Split design hero page

export default function Home() {
  const { login } = useAuth();
  
  // Added "food-home" to the authStep type
  const [authStep, setAuthStep] = useState<
    | "login"
    | "phone"
    | "otp"
    | "landing"      // The Hero split design
    | "food-home"    // The "What's on your mind" design
    | "restaurant"
    | "cart"
    | "checkout"
    | "thank-you"
    | "track-order"
    | "category"
  >("login");

  const [userPhone, setUserPhone] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [userName, setUserName] = useState({ firstName: "", lastName: "" });
  const [selectedRestaurant, setSelectedRestaurant] = useState<any>(null);

  // --- NAVIGATION HANDLERS ---

  const handlePhoneSubmit = (phone: string, firstName: string, lastName: string) => {
    setUserPhone(phone);
    setUserName({ firstName, lastName });
    setAuthStep("otp");
  };

  const handleOtpVerify = () => {
    login({
      id: Math.random().toString(),
      firstName: userName.firstName,
      lastName: userName.lastName,
      phone: userPhone,
      defaultAddress: "201, Ganga nagar, 344042",
    });
    setAuthStep("landing"); // First show the Split Hero Page after login
  };

  // Triggered by "Explore" button on the MainLandingView
  const handleExploreFood = () => {
    setAuthStep("food-home"); 
  };

  const handleSelectRestaurant = (restaurant: any) => {
    setSelectedRestaurant(restaurant);
    setAuthStep("restaurant");
  };

  const handleSelectCategory = (categoryName: string) => {
    setSelectedCategory(categoryName);
    setAuthStep("category");
  };

  const handleBackToFoodHome = () => {
    setAuthStep("food-home");
  };

  // Added logic to go back to the very first Hero screen if needed
  const handleBackToHero = () => {
    setAuthStep("landing");
  };

  const handleGoToCart = () => setAuthStep("cart");
  const handleGoToCheckout = () => setAuthStep("checkout");
  const handleGoToThankYou = () => setAuthStep("thank-you");
  const handleGoToTrackOrder = () => setAuthStep("track-order");

  return (
    <main>
      {/* 1. AUTHENTICATION */}
      {authStep === "login" && (
        <LoginPage onContinuePhone={() => setAuthStep("phone")} />
      )}
      {authStep === "phone" && <PhoneNumberPage onSubmit={handlePhoneSubmit} />}
      {authStep === "otp" && (
        <OtpVerificationPage phone={userPhone} onVerify={handleOtpVerify} />
      )}

      {/* 2. MAIN HERO DESIGN (Split Orange/Black) */}
      {authStep === "landing" && (
        <MainLandingView 
          onExplore={handleExploreFood} 
          onSelectCategory={handleSelectCategory} 
        />
      )}

      {/* 3. INTERNAL FOOD PAGE ("Hey! What's on your mind") */}
      {authStep === "food-home" && (
        <LandingPage
          onSelectRestaurant={handleSelectRestaurant}
          onSelectCategory={handleSelectCategory}
        />
      )}

      {/* 4. CONTENT PAGES */}
      {authStep === "category" && (
        <CategoryPage
          categoryName={selectedCategory}
          onBack={handleBackToFoodHome}
        />
      )}
      
      {authStep === "restaurant" && selectedRestaurant && (
        <RestaurantPage
          restaurant={selectedRestaurant}
          onBack={handleBackToFoodHome}
          onViewCart={handleGoToCart}
        />
      )}

      {/* 5. CHECKOUT FLOW */}
      {authStep === "cart" && (
        <CartPage
          onCheckout={handleGoToCheckout}
          onBackToLanding={handleBackToFoodHome}
          onLogin={() => setAuthStep("login")}
        />
      )}
      {authStep === "checkout" && (
        <CheckoutPage
          onThankYou={handleGoToThankYou}
          onLogin={() => setAuthStep("login")}
          onBackToCart={handleGoToCart}
        />
      )}
      {authStep === "thank-you" && (
        <ThankYouPage onContinue={handleGoToTrackOrder} />
      )}
      {authStep === "track-order" && (
        <TrackOrderPage onBack={handleBackToFoodHome} />
      )}
    </main>
  );
}