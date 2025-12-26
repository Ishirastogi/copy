"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { useAuth } from "@/context/auth-context";
import {
  ShoppingCart,
  LogOut,
  Search,
  X,
  ChevronLeft,
  ChevronRight,
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

// ... (restaurants data remains exactly same as your code)
const restaurants = [
  {
    id: 1,
    name: "Paneer Tikka",
    cuisine: "Punjabi, Home Food",
    location: "Raj Nagar",
    price: "Rs. 1000 for two",
    image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400&h=300&fit=crop",
    items: [],
  },
  {
    id: 2,
    name: "Pizza Hut",
    cuisine: "Punjabi, Home Food",
    location: "Raj Nagar",
    price: "Rs. 1000 for two",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop",
    items: [],
  },
  {
    id: 3,
    name: "Theobroma",
    cuisine: "Punjabi, Home Food",
    location: "Raj Nagar",
    price: "Rs. 1000 for two",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop",
    items: [],
  },
  {
    id: 4,
    name: "Burger King",
    cuisine: "Punjabi, Home Food",
    location: "Raj Nagar",
    price: "Rs. 1000 for two",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop",
    items: [],
  },
];

export default function LandingPage({
  onSelectRestaurant,
  onSelectCategory,
  onBack,
}: LandingPageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const { isLoggedIn, user, logout } = useAuth();
  
  // Ref for the category container
  const categoryScrollRef = useRef<HTMLDivElement>(null);

  // Function to make orange arrows work
  const scroll = (direction: "left" | "right") => {
    if (categoryScrollRef.current) {
      const { scrollLeft, clientWidth } = categoryScrollRef.current;
      const scrollTo = direction === "left" 
        ? scrollLeft - clientWidth 
        : scrollLeft + clientWidth;
      
      categoryScrollRef.current.scrollTo({
        left: scrollTo,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header - No changes */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button onClick={onBack} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
                <ChevronLeft className="w-6 h-6 text-gray-700" />
              </button>
              <h1 className="text-2xl font-bold text-gray-900">FoodWallah</h1>
            </div>
            <div className="flex items-center gap-4">
              <button onClick={() => setShowSearch(true)} className="text-gray-600 hover:text-gray-900"><Search className="w-5 h-5" /></button>
              <button className="text-gray-600 hover:text-gray-900 text-sm font-medium flex items-center gap-1">Ganganagar <span className="text-xs">▼</span></button>
              {isLoggedIn && user ? (
                <>
                  <span className="text-sm font-medium text-gray-700">Hi, {user.firstName}</span>
                  <button onClick={logout} className="text-gray-600 hover:text-red-500 text-sm font-medium flex items-center gap-1"><LogOut className="w-4 h-4" /> Logout</button>
                </>
              ) : (
                <button className="text-gray-900 hover:text-orange-500 text-sm font-medium">SignIn</button>
              )}
              <ShoppingCart className="w-6 h-6 text-gray-900 cursor-pointer" />
            </div>
          </div>
        </div>
      </header>

      <div className="w-full h-48 md:h-64 lg:h-80 bg-orange-50 relative overflow-hidden">
        <Image src="/banner.png" alt="Food banner" fill priority className="object-cover" />
      </div>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <p className="text-2xl font-semibold text-gray-900">Hey! What's on your mind</p>
            {/* Orange arrows now have onClick functions */}
            <div className="flex items-center gap-2">
               <button 
                 onClick={() => scroll("left")}
                 className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white hover:bg-orange-600 transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
               </button>
               <button 
                 onClick={() => scroll("right")}
                 className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-500 hover:bg-orange-200 transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
               </button>
            </div>
          </div>

          {/* Categories - scrollbar-hide used here to remove the "weird sidebar/scrollbar" */}
          <div 
            ref={categoryScrollRef}
            className="grid grid-cols-4 md:flex md:flex-row md:gap-8 gap-y-6 justify-items-center md:overflow-x-auto scroll-smooth no-scrollbar"
            style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }} // Inline CSS fallback for hiding scrollbar
          >
            {categories.map((category, index) => (
              <div key={index} onClick={() => onSelectCategory(category.name)} className="flex flex-col items-center gap-3 flex-shrink-0 cursor-pointer group">
                <div className="w-16 h-16 md:w-24 md:h-24 rounded-full overflow-hidden border-4 border-gray-100 group-hover:border-orange-400 transition-all shadow-md">
                  <img src={category.image} alt={category.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                </div>
                <span className="text-[10px] md:text-sm font-medium text-gray-700">{category.name}</span>
              </div>
            ))}
          </div>
        </div>

        <h2 className="text-lg md:text-2xl font-semibold text-gray-900 mb-6 whitespace-nowrap overflow-hidden text-ellipsis">
          Restaurant with online food delivery in Ganga Nagar
        </h2>

        {/* Filters - Original design preserved */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2 no-scrollbar" style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}>
          <button className="flex items-center gap-1 px-4 py-2 border border-gray-200 rounded-full text-xs font-medium hover:bg-gray-50 bg-white shadow-sm whitespace-nowrap">
            <span className="w-4 h-4 bg-orange-500 rounded-full text-white text-[8px] flex items-center justify-center font-bold">Rs</span>
            Price Range <span className="text-[8px]">▼</span>
          </button>
          <button className="px-4 py-2 border border-gray-200 rounded-full text-xs font-medium hover:bg-gray-50 bg-white shadow-sm whitespace-nowrap">
            Restaurant Type <span className="text-[8px]">▼</span>
          </button>
          <button className="px-4 py-2 border border-gray-200 rounded-full text-xs font-medium hover:bg-gray-50 bg-white shadow-sm flex items-center gap-1 whitespace-nowrap">
            Sort <span className="text-[10px]">≡</span>
          </button>
        </div>

        {/* Restaurant Cards - original logic preserved */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {restaurants.map((restaurant) => (
            <RestaurantCard
              key={restaurant.id}
              restaurant={restaurant}
              onClick={() => onSelectRestaurant(restaurant)}
            />
          ))}
        </div>

        <div className="text-center py-8">
          <p className="text-gray-500 text-sm">Loading More Restaurants.....</p>
        </div>
      </main>

      {/* Footer - No changes */}
      <footer className="bg-gray-50 border-t border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">FoodWallah</h3>
              <p className="text-sm text-gray-600">© 2025 Dine Order. All Rights Reserved</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Legal</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-orange-500 font-medium">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-orange-500 font-medium">Terms of Service</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-orange-500 font-medium">About Us</a></li>
                <li><a href="#" className="hover:text-orange-500 font-medium">Contact</a></li>
                <li><a href="#" className="hover:text-orange-500 font-medium">Careers</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Social</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-orange-500 font-medium">LinkedIn</a></li>
                <li><a href="#" className="hover:text-orange-500 font-medium">Twitter</a></li>
                <li><a href="#" className="hover:text-orange-500 font-medium">Facebook</a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}