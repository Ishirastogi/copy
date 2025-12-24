"use client";

import { useState, useRef } from "react";
import { Search, MapPin, ChevronDown, Instagram, Facebook, Linkedin, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from "next/image";

interface MainLandingViewProps {
  onExplore: () => void;
  onSelectCategory: (category: string) => void;
}

const foodOptions = [
  { name: "Pizzas", image: "/pizza.jpg" },
  { name: "Rolls", image: "/rolls.jpg" },
  { name: "Momos", image: "/momos.jpg" },
  { name: "Noodles", image: "/noodles.jpg" },
  { name: "Cakes", image: "/cake.jpg" },
  { name: "Burgers", image: "/burger.jpg" },
  { name: "Shakes", image: "/shakes.jpg" },
  { name: "Biryani", image: "/biryani.jpg" },
  { name: "Sandwiches", image: "/sandwich.jpg" },
  { name: "Pasta", image: "/pasta.jpg" },
  { name: "Desserts", image: "/cake.jpg" },
  { name: "Salad", image: "/pasta.jpg" },
  { name: "Chole Bhature", image: "/rolls.jpg" },
  { name: "Ice Cream", image: "/shakes.jpg" },
  { name: "North Indian", image: "/biryani.jpg" },
  { name: "South Indian", image: "/pizza.jpg" },
];

export default function MainLandingView({ onExplore, onSelectCategory }: MainLandingViewProps) {
  const [activePage, setActivePage] = useState(0);
  const categoryScrollRef = useRef<HTMLDivElement>(null);

  const rows: any[][] = [];
  for (let i = 0; i < foodOptions.length; i += 2) {
    rows.push(foodOptions.slice(i, i + 2));
  }

  const totalPages = Math.ceil(rows.length / 4);

  const scrollToPage = (pageIndex: number) => {
    if (categoryScrollRef.current) {
      const containerWidth = categoryScrollRef.current.offsetWidth;
      categoryScrollRef.current.scrollTo({
        left: pageIndex * containerWidth,
        behavior: "smooth",
      });
      setActivePage(pageIndex);
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-4 border-b bg-white">
        <div className="text-3xl font-serif italic font-bold text-orange-950">LocalWallah</div>
        <div className="flex items-center gap-2 border rounded-md px-3 py-1.5 text-sm text-gray-600 bg-gray-50">
          <MapPin size={16} className="text-orange-600" />
          <span>Rajasthan, Jaipur, India...</span>
          <ChevronDown size={14} />
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative w-full h-[520px] overflow-hidden bg-[#F26522]">
        <div 
          className="absolute inset-0 bg-black" 
          style={{ clipPath: 'polygon(0 0, 45% 0, 75% 100%, 0% 100%)' }}
        ></div>

        <div className="relative z-20 flex flex-col items-center pt-16 px-4">
          {/* FIXED WHITE SEARCH BAR */}
          <div className="w-full max-w-2xl relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange-500 transition-colors" size={22} />
            <input 
              type="text" 
              placeholder="Search for restaurant, food item or more"
              className="w-full py-5 pl-14 pr-4 rounded-xl text-lg shadow-2xl bg-white border-none focus:outline-none focus:ring-2 focus:ring-orange-300 text-gray-800 placeholder:text-gray-400"
            />
          </div>

          <div className="flex flex-col md:flex-row gap-8 mt-16 w-full max-w-5xl justify-center items-center">
            {/* Localwallah Card */}
            <div className="bg-white rounded-2xl p-8 shadow-2xl flex items-center gap-6 w-full max-w-md h-52 relative overflow-hidden">
              <div className="z-10">
                <h2 className="text-4xl font-bold tracking-tight">Localwallah</h2>
                <p className="text-gray-500 text-lg mb-6">From Local Businesses</p>
                <button className="bg-black text-white px-8 py-2 rounded-full text-sm font-semibold hover:bg-gray-800 transition-all">
                  Explore →
                </button>
              </div>
              <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-black rounded-full flex items-center justify-center text-white p-4">
                <div className="text-center">
                  <div className="text-2xl font-bold border-b border-white mb-1">LW</div>
                  <div className="text-[8px] uppercase font-bold leading-tight">Local Wallah</div>
                </div>
              </div>
            </div>

            {/* Food Delivery Card */}
            <div className="bg-white rounded-2xl p-8 shadow-2xl flex items-center gap-6 w-full max-w-md h-52 relative overflow-hidden">
              <div className="z-10">
                <h2 className="text-4xl font-bold tracking-tight">Food Delivery</h2>
                <p className="text-gray-500 text-lg mb-6">From Restaurants</p>
                <button 
                  onClick={onExplore}
                  className="bg-[#F26522] text-white px-8 py-2 rounded-full text-sm font-semibold hover:opacity-90 transition-all"
                >
                  Explore →
                </button>
              </div>
              <div className="absolute -right-4 -bottom-4 w-36 h-36">
                 <img src="/images/food-circle-large.png" alt="Food" className="w-full h-full object-contain" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Food Carousel Section */}
      <section className="max-w-7xl mx-auto py-16 px-6">
        <div className="flex items-center justify-between mb-10">
          <h3 className="text-3xl font-serif font-bold text-gray-900">Order our best food options</h3>
          
          {/* RESTORED ORANGE ARROWS */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => scrollToPage(Math.max(0, activePage - 1))}
              disabled={activePage === 0}
              className={`w-11 h-11 rounded-full flex items-center justify-center transition-all ${
                activePage === 0 ? "bg-orange-200 cursor-not-allowed" : "bg-orange-500 hover:bg-orange-600 shadow-lg"
              }`}
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
            <button
              onClick={() => scrollToPage(Math.min(totalPages - 1, activePage + 1))}
              disabled={activePage === totalPages - 1}
              className={`w-11 h-11 rounded-full flex items-center justify-center transition-all ${
                activePage === totalPages - 1 ? "bg-orange-200 cursor-not-allowed" : "bg-orange-500 hover:bg-orange-600 shadow-lg"
              }`}
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>

        <div className="relative">
          <div
            ref={categoryScrollRef}
            className="flex gap-12 overflow-x-auto pb-8 scrollbar-hide scroll-smooth"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {rows.map((column, colIndex) => (
              <div key={colIndex} className="flex flex-col gap-10 flex-shrink-0">
                {column.map((item, itemIndex) => (
                  <div 
                    key={itemIndex} 
                    className="flex flex-col items-center group cursor-pointer w-28 md:w-32"
                    onClick={() => onSelectCategory(item.name)}
                  >
                    <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-gray-100 group-hover:border-orange-400 transition-all shadow-md relative mb-3">
                      <Image 
                        src={item.image} 
                        alt={item.name} 
                        fill 
                        className="object-cover group-hover:scale-110 transition-transform duration-500" 
                      />
                    </div>
                    <span className="text-sm font-bold text-gray-700 text-center group-hover:text-orange-600 transition-colors">
                      {item.name}
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-16 px-8 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div>
            <h4 className="text-2xl font-serif italic font-bold mb-4 text-orange-950">FoodWallah</h4>
            <p className="text-sm text-gray-400">© 2025 Dine Order. All Rights Reserved</p>
          </div>
          <div>
            <h5 className="font-bold text-gray-900 mb-6 uppercase text-xs tracking-widest">Legal</h5>
            <ul className="space-y-3 text-sm text-gray-600">
              <li className="hover:text-orange-600 cursor-pointer transition-colors">Privacy Policy</li>
              <li className="hover:text-orange-600 cursor-pointer transition-colors">Terms of Service</li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold text-gray-900 mb-6 uppercase text-xs tracking-widest">Company</h5>
            <ul className="space-y-3 text-sm text-gray-600">
              <li className="hover:text-orange-600 cursor-pointer transition-colors">About Us</li>
              <li className="hover:text-orange-600 cursor-pointer transition-colors">Contact</li>
              <li className="hover:text-orange-600 cursor-pointer transition-colors">Careers</li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold text-gray-900 mb-6 uppercase text-xs tracking-widest">Social</h5>
            <div className="flex gap-5">
              <Instagram size={22} className="text-gray-800 hover:text-orange-600 cursor-pointer transition-all" />
              <Facebook size={22} className="text-gray-800 hover:text-orange-600 cursor-pointer transition-all" />
              <Linkedin size={22} className="text-gray-800 hover:text-orange-600 cursor-pointer transition-all" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}