"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useAuth } from "@/context/auth-context";
import {
  ShoppingCart,
  LogOut,
  Search,
  ChevronLeft,
  ChevronRight,
  ArrowUp,
} from "lucide-react";
import RestaurantCard from "./restaurant-card";

interface LandingPageProps {
  onSelectRestaurant: (restaurant: any) => void;
  onSelectCategory: (categoryName: string) => void;
  onBack: () => void;
}

const categories = [
  { name: "Pizzas", image: "/pizza.jpg" },
  { name: "Rolls", image: "/rolls.jpg" },
  { name: "Momos", image: "/momos.jpg" },
  { name: "Noodles", image: "/noodles.jpg" },
  { name: "Cakes", image: "/cake.jpg" },
  { name: "Burgers", image: "/burger.jpg" },
  { name: "Shakes", image: "/shakes.jpg" },
  { name: "Biryani", image: "/biryani.jpg" },
  { name: "Pasta", image: "/pasta.jpg" },
  { name: "Sandwich", image: "/sandwich.jpg" },
];

const restaurants = [
  {
    id: 1,
    name: "Paneer Tikka",
    cuisine: "Punjabi, Home Food",
    location: "Raj Nagar",
    price: "Rs. 1000 for two",
    image:
      "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400&h=300&fit=crop",
  },
  {
    id: 2,
    name: "Pizza Hut",
    cuisine: "Italian, Fast Food",
    location: "Ganga Nagar",
    price: "Rs. 600 for two",
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop",
  },
  {
    id: 3,
    name: "Theobroma",
    cuisine: "Bakery, Desserts",
    location: "Mall Road",
    price: "Rs. 500 for two",
    image:
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop",
  },
  {
    id: 4,
    name: "Burger King",
    cuisine: "American, Fast Food",
    location: "Civil Lines",
    price: "Rs. 400 for two",
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop",
  },
];
const restaurantMenus: Record<number, any> = {
  1: {
    appetizers: [
      {
        id: "a1",
        name: "Bruschetta",
        price: 450,
        veg: true,
        image: "/pizza.jpg",
      },
      {
        id: "a2",
        name: "Garlic Bread",
        price: 450,
        veg: true,
        image: "/rolls.jpg",
      },
    ],
    mainCourse: [
      {
        id: "m1",
        name: "Margherita Pizza",
        price: 450,
        veg: true,
        image: "/pizza.jpg",
      },
      {
        id: "m2",
        name: "Spaghetti Carbonara",
        price: 450,
        veg: false,
        image: "/biryani.jpg",
      },
    ],
  },
};

export default function LandingPage({
  onSelectRestaurant,
  onSelectCategory,
  onBack,
}: LandingPageProps) {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const { isLoggedIn, user, logout } = useAuth();
  const categoryScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (categoryScrollRef.current) {
      const container = categoryScrollRef.current;
      const scrollAmount = container.clientWidth * 0.8; // Scroll by 80% of width
      container.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="min-h-screen bg-white relative overflow-x-hidden">
      {/* 1. FIXED NAVBAR: Added padding and flex-1 for better spacing */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-[60] w-full">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 md:gap-4">
            <button
              onClick={onBack}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ChevronLeft className="w-6 h-6 text-gray-700" />
            </button>
            <h1 className="text-xl md:text-2xl font-bold text-gray-900">
              FoodWallah
            </h1>
          </div>

          <div className="flex items-center gap-3 md:gap-6">
            <Search className="w-5 h-5 text-gray-600 cursor-pointer" />

            {/* Location hidden on small mobile to save space */}
            <button className="hidden sm:flex text-gray-600 hover:text-gray-900 text-sm font-medium items-center gap-1">
              Ganganagar <span className="text-xs">▼</span>
            </button>

            {isLoggedIn && user ? (
              <div className="flex items-center gap-2">
                <span className="hidden md:inline text-sm font-medium text-gray-700">
                  Hi, {user.firstName}
                </span>
                <button
                  onClick={logout}
                  className="text-gray-600 hover:text-red-500"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button className="text-gray-900 hover:text-orange-500 text-sm font-bold md:font-medium">
                SignIn
              </button>
            )}

            <div className="relative">
              <ShoppingCart className="w-6 h-6 text-gray-900 cursor-pointer" />
            </div>
          </div>
        </div>
      </header>

      {/* 2. FULL BANNER */}
      <div className="w-full h-44 md:h-64 lg:h-80 bg-orange-50 relative overflow-hidden">
        <Image
          src="/banner.png"
          alt="Food banner"
          fill
          priority
          className="object-cover"
        />
      </div>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* 3. CATEGORY SECTION: Fixed "Slide into nothing" issue */}
        <div className="mb-12 overflow-hidden">
          <div className="flex items-center justify-between mb-8">
            <p className="text-lg md:text-2xl font-bold text-gray-900">
              Hey! What's on your mind
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => scroll("left")}
                className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => scroll("right")}
                className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-500"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div
            ref={categoryScrollRef}
            className="overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {/* grid-flow-col ensures it slides sideways rather than wrapping down */}
            <div className="grid grid-rows-2 grid-flow-col gap-x-6 gap-y-6 md:flex md:flex-row md:gap-8 w-max md:w-full">
              {categories.map((category, index) => (
                <div
                  key={index}
                  onClick={() => onSelectCategory(category.name)}
                  className="flex flex-col items-center gap-3 w-20 md:w-24 flex-shrink-0 cursor-pointer group snap-start"
                >
                  <div className="w-16 h-16 md:w-24 md:h-24 rounded-full overflow-hidden border-2 md:border-4 border-gray-100 group-hover:border-orange-400 transition-all shadow-md">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                    />
                  </div>
                  <span className="text-[10px] md:text-sm font-bold md:font-medium text-gray-700">
                    {category.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Heading locked to one line */}
        <h2 className="text-lg md:text-2xl font-bold text-gray-900 mb-6 whitespace-nowrap overflow-hidden text-ellipsis">
          Restaurant with online food delivery in Ganga Nagar
        </h2>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2 no-scrollbar whitespace-nowrap">
          <button className="flex items-center gap-1 px-4 py-2 border border-gray-200 rounded-full text-xs font-medium bg-white shadow-sm">
            <span className="w-4 h-4 bg-orange-500 rounded-full text-white text-[8px] flex items-center justify-center font-bold">
              Rs
            </span>
            Price Range ▼
          </button>
          <button className="px-4 py-2 border border-gray-200 rounded-full text-xs font-medium bg-white shadow-sm">
            Restaurant Type ▼
          </button>
          <button className="px-4 py-2 border border-gray-200 rounded-full text-xs font-medium bg-white shadow-sm flex items-center gap-1">
            Sort ≡
          </button>
        </div>

        {/* RESTAURANT CARDS: 2 columns on mobile, 4 on desktop */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12">
          {restaurants.map((restaurant) => (
            <RestaurantCard
              key={restaurant.id}
              restaurant={restaurant}
              onClick={() =>
                onSelectRestaurant({
                  ...restaurant,
                  items: restaurantMenus[restaurant.id] || {
                    appetizers: [],
                    mainCourse: [],
                  },
                })
              }
            />
          ))}
        </div>

        <div className="text-center py-8">
          <p className="text-gray-500 text-xs md:text-sm animate-pulse">
            Loading More Restaurants.....
          </p>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="bg-gray-50 border-t border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">FoodWallah</h3>
            <p className="text-sm text-gray-600">
              © 2025 Dine Order. All Rights Reserved
            </p>
          </div>
          {/* Footer Links (Original Logic) */}
          <div className="grid grid-cols-2 md:contents gap-8">
            <div>
              <h4 className="font-bold mb-4">Policies</h4>
              <ul className="text-sm space-y-2 text-gray-600">
                <li>Terms of Service</li>
                <li>Privacy Policy</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="text-sm space-y-2 text-gray-600">
                <li>Home</li>
                <li>About Us</li>
              </ul>
            </div>
          </div>
        </div>
      </footer>

      {/* ORANGE BACK TO TOP BUTTON */}
      {showBackToTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 w-12 h-12 bg-orange-500 text-white rounded-full flex items-center justify-center shadow-lg z-50 animate-bounce active:scale-90 transition-transform"
        >
          <ArrowUp className="w-6 h-6" />
        </button>
      )}
    </div>
  );
}
