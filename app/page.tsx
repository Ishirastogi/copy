"use client";

import { useState } from "react";
import { useAuth } from "@/context/auth-context";
import LoginPage from "@/components/auth/login-page";
import PhoneNumberPage from "@/components/auth/phone-number-page";
import OtpVerificationPage from "@/components/auth/otp-verification-page";
import LandingPage from "@/components/landing/landing-page";
import RestaurantPage from "@/components/restaurant/restaurant-page";
import CartPage from "@/components/checkout/cart-page";
import CheckoutPage from "@/components/checkout/checkout-page";
import ThankYouPage from "@/components/checkout/thank-you-page";
import TrackOrderPage from "@/components/checkout/track-order-page";
import CategoryPage from "@/components/category/category";
import MainLandingView from "@/components/main/main-landing-view";

type AuthStep =
  | "login"
  | "phone"
  | "otp"
  | "landing"
  | "food-home"
  | "restaurant"
  | "cart"
  | "checkout"
  | "thank-you"
  | "track-order"
  | "category";

export default function Home() {
  const { login } = useAuth();

  // ✅ Start from login
  const [authStep, setAuthStep] = useState<AuthStep>("login");

  const [userPhone, setUserPhone] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [userName, setUserName] = useState({ firstName: "", lastName: "" });
  const [selectedRestaurant, setSelectedRestaurant] = useState<any>(null);

  // ---------------- NAVIGATION HANDLERS ----------------

  const handlePhoneSubmit = (
    phone: string,
    firstName: string,
    lastName: string
  ) => {
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
    setAuthStep("landing");
  };

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

  const handleBackToLanding = () => {
    setAuthStep("landing");
  };
 const handleBackToRestaurant = () => {
  setAuthStep("restaurant");
};
  const handleBackToFoodHome = () => {
    setAuthStep("food-home");
  };

  const handleGoToCart = () => setAuthStep("cart");
  const handleGoToCheckout = () => setAuthStep("checkout");
  const handleGoToThankYou = () => setAuthStep("thank-you");
  const handleGoToTrackOrder = () => setAuthStep("track-order");

  return (
    <main>
      {/* LOGIN */}
      {authStep === "login" && (
        <LoginPage onContinuePhone={() => setAuthStep("phone")} />
      )}

      {authStep === "phone" && (
        <PhoneNumberPage onSubmit={handlePhoneSubmit} />
      )}

      {authStep === "otp" && (
        <OtpVerificationPage phone={userPhone} onVerify={handleOtpVerify} />
      )}

      {/* MAIN LANDING */}
      {authStep === "landing" && (
        <MainLandingView
          onExplore={handleExploreFood}
          onSelectCategory={handleSelectCategory}
        />
      )}

      {/* FOOD HOME */}
      {authStep === "food-home" && (
        <LandingPage
          onSelectRestaurant={handleSelectRestaurant}
          onSelectCategory={handleSelectCategory}
          onBack={handleBackToLanding}
        />
      )}

      {/* CATEGORY */}
      {authStep === "category" && (
        <CategoryPage
          categoryName={selectedCategory}
          onBack={handleBackToFoodHome}
        />
      )}

      {/* RESTAURANT */}
      {authStep === "restaurant" && selectedRestaurant && (
        <RestaurantPage
          restaurant={selectedRestaurant}
          onBack={handleBackToFoodHome}
          onViewCart={handleGoToCart}
        />
      )}

      {/* CHECKOUT FLOW */}
      {authStep === "cart" && (
        <CartPage
          onCheckout={handleGoToCheckout}
          onBackToRestaurant={handleBackToRestaurant}
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
