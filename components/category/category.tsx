"use client";

import { Search, ShoppingCart, ArrowLeft } from "lucide-react";
import Image from "next/image";


interface CategoryPageProps {
  categoryName: string;
  onBack: () => void;
}

// Mock data based on PDF content [cite: 18-59]
const categoryRestaurants = [
  {
    id: 1,
    name: "Paneer Tikka",
    cuisine: "Punjat Home Food",
    location: "RaNagar",
    price: "Rs. 1000 for two",
    img: "/momos.jpg",
  },
  {
    id: 2,
    name: "Pizza Hut",
    cuisine: "Punjabi Home Read",
    location: "Nigar",
    price: "Rs. 1000 for two",
    img: "/pizza.jpg",
  },
  {
    id: 3,
    name: "Theobroma",
    cuisine: "Puna Hime Foo",
    location: "Nagel",
    price: "Rs. 1000 for two",
    img: "/pizza.jpg",
  },
  {
    id: 4,
    name: "Burger King",
    cuisine: "Home Food",
    location: "Ra Nagar",
    price: "Rs. 1000 for two",
    img: "/burger.jpg",
  },
  {
    id: 5,
    name: "Pizza Hut",
    cuisine: "Purgas Home Food",
    location: "Raj Nagm",
    price: "Rs 1000 for two",
    img: "/pizza.jpg",
  },
  {
    id: 6,
    name: "Burger King",
    cuisine: "Punjabi, Home Food",
    location: "Rayag",
    price: "Rs. 1000 for twa",
    img: "/burger.jpg",
  },
];

export default function CategoryPage({
  categoryName,
  onBack,
}: CategoryPageProps) {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      {/* Header - Matching Landing Page style */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <Image
              src="/logo.png"
              alt="FoodWallah"
              width={110}
              height={40}
              className="object-contain h-9 sm:h-10 w-auto"
              priority
            />{" "}
            [cite: 10]
          </div>
          <div className="flex items-center gap-6">
            <button className="text-gray-600 hover:text-gray-900 flex items-center gap-2">
              <Search className="w-5 h-5" /> Search
            </button>
            <button className="text-sm font-medium">Signin</button>
            <ShoppingCart className="w-6 h-6 cursor-pointer" />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Category Header [cite: 11, 12] */}
        <section className="mb-8">
          <h2 className="text-3xl font-extrabold mb-2">{categoryName}</h2>
          <p className="text-gray-500 font-medium">
            159 Restaurants to explore
          </p>
        </section>

        {/* Filters Bar [cite: 13-16] */}
        <section className="flex flex-wrap gap-3 mb-10 border-b pb-6">
          <button className="px-5 py-2 border border-gray-300 rounded-full text-sm font-medium hover:bg-gray-50">
            Price Range
          </button>
          <button className="px-5 py-2 border border-gray-300 rounded-full text-sm font-medium hover:bg-gray-50">
            Restaurant Type
          </button>
          <button className="px-5 py-2 border border-gray-300 rounded-full text-sm font-medium hover:bg-gray-50">
            Filters ✓
          </button>
          <button className="px-5 py-2 border border-gray-300 rounded-full text-sm font-medium hover:bg-gray-50">
            Sort
          </button>
        </section>

        {/* Restaurants Grid [cite: 18-59] */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {categoryRestaurants.map((res) => (
            <div
              key={res.id}
              className="group cursor-pointer transition-transform duration-200 hover:scale-[0.98]"
            >
              <div className="relative aspect-[4/3] w-full mb-4 rounded-2xl overflow-hidden shadow-sm border border-gray-100">
                <img
                  src={res.img}
                  alt={res.name}
                  className="object-cover w-full h-full"
                />
              </div>
              <h3 className="text-lg font-bold text-gray-800 truncate">
                {res.name}
              </h3>
              <p className="text-sm text-gray-500 font-medium truncate">
                {res.cuisine}
              </p>
              <p className="text-sm text-gray-400">{res.location}</p>
              <p className="text-sm font-bold text-red-700 mt-2">{res.price}</p>
            </div>
          ))}
        </div>

        {/* Loading Message [cite: 60] */}
        <div className="text-center py-16">
          <p className="text-gray-400 font-medium animate-pulse">
            Loading More Restaurants.....
          </p>
        </div>
      </main>

      {/* Footer [cite: 61-71] */}
      <footer className="bg-gray-50 border-t border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h4 className="font-bold text-xl mb-4 text-gray-900">FoodWallah</h4>
            <p className="text-sm text-gray-500">
              © 2025 Dine Order. All Rights Reserved
            </p>
          </div>
          <div>
            <h5 className="font-bold text-gray-900 mb-4 uppercase text-xs tracking-widest">
              Company
            </h5>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="hover:text-orange-500 cursor-pointer">About Us</li>
              <li className="hover:text-orange-500 cursor-pointer">Careers</li>
              <li className="hover:text-orange-500 cursor-pointer">Contact</li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold text-gray-900 mb-4 uppercase text-xs tracking-widest">
              Legal
            </h5>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="hover:text-orange-500 cursor-pointer">
                Privacy Policy
              </li>
              <li className="hover:text-orange-500 cursor-pointer">
                Terms of Service
              </li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold text-gray-900 mb-4 uppercase text-xs tracking-widest">
              Social
            </h5>
            <div className="flex gap-4">
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-orange-100 cursor-pointer">
                f
              </div>
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-orange-100 cursor-pointer">
                ig
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
