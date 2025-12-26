"use client";

import { useState, useRef } from "react";
import {
  Search,
  MapPin,
  ChevronDown,
  Instagram,
  Facebook,
  Linkedin,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
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

export default function MainLandingView({
  onExplore,
  onSelectCategory,
}: MainLandingViewProps) {
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
      <nav className="flex items-center justify-between px-4 md:px-8 py-4 border-b bg-white">
        <div className="text-2xl md:text-3xl font-serif italic font-bold text-orange-950">
          LocalWallah
        </div>
        <div className="flex items-center gap-1 md:gap-2 border rounded-md px-2 py-1 md:px-3 md:py-1.5 text-xs md:text-sm text-gray-600 bg-gray-50">
          <MapPin size={14} className="text-orange-600 md:w-4 md:h-4" />
          <span className="truncate max-w-[100px] md:max-w-none">Rajasthan, Jaipur, India...</span>
          <ChevronDown size={14} />
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative w-full md:h-[520px] overflow-hidden bg-[#F26522] pb-10 md:pb-0">
        <div
          className="absolute inset-0 bg-black"
          style={{ clipPath: "polygon(0 0, 45% 0, 75% 100%, 0% 100%)" }}
        ></div>

        <div className="relative z-20 flex flex-col items-center pt-6 md:pt-16 px-4">
          {/* SEARCH BAR - DECREASED PADDING ON MOBILE */}
          <div className="w-full max-w-2xl relative group mb-8 md:mb-0">
            <Search 
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" 
                size={18} 
            />
            <input
              type="text"
              placeholder="Search for restaurant, food item..."
              className="w-full py-2.5 md:py-5 pl-11 md:pl-14 pr-4 rounded-xl text-sm md:text-lg shadow-2xl bg-white border-none focus:outline-none"
            />
          </div>

          <div className="flex flex-col md:flex-row gap-6 md:gap-8 md:mt-16 w-full max-w-5xl justify-center items-center">
            {/* Food Delivery Card */}
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-2xl flex items-center md:gap-6 w-full max-w-md h-44 md:h-52 relative overflow-hidden">
              <div className="z-10">
                <h2 className="text-2xl md:text-4xl font-bold tracking-tight">Food Delivery</h2>
                <p className="text-gray-500 text-sm md:text-lg mb-4 md:mb-6">From Restaurants</p>
                <button
                  onClick={onExplore}
                  className="bg-[#F26522] text-white px-6 md:px-8 py-2 rounded-full text-xs md:text-sm font-semibold hover:opacity-90"
                >
                  Explore →
                </button>
              </div>
              <div className="absolute -right-4 -bottom-4 w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden flex items-center justify-center">
                <Image src="/main.jpg" alt="Food" fill className="object-cover" />
              </div>
            </div>

            {/* Localwallah Card */}
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-2xl flex items-center md:gap-6 w-full max-w-md h-44 md:h-52 relative overflow-hidden">
              <div className="z-10">
                <h2 className="text-2xl md:text-4xl font-bold tracking-tight">Localwallah</h2>
                <p className="text-gray-500 text-sm md:text-lg mb-4 md:mb-6">From Local Businesses</p>
                <button className="bg-black text-white px-6 md:px-8 py-2 rounded-full text-xs md:text-sm font-semibold hover:bg-gray-800">
                  Explore →
                </button>
              </div>
              <div className="absolute -right-4 -bottom-4 w-28 h-28 md:w-32 md:h-32 bg-black rounded-full flex items-center justify-center text-white">
                <div className="text-center">
                  <div className="text-xl md:text-2xl font-bold border-b border-white mb-1">LW</div>
                  <div className="text-[7px] md:text-[8px] uppercase font-bold">LOCAL WALLAH</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Food Section */}
      <section className="max-w-7xl mx-auto py-10 md:py-16 px-4 md:px-6">
        <div className="flex items-center justify-between mb-8 md:mb-10">
          <h3 className="text-xl md:text-3xl font-serif font-bold text-gray-900 leading-tight">
            Order our best food options
          </h3>
          <div className="flex items-center gap-2">
            <button
              onClick={() => scrollToPage(Math.max(0, activePage - 1))}
              className={`w-9 h-9 md:w-11 md:h-11 rounded-full flex items-center justify-center bg-orange-500 text-white shadow-lg ${
                activePage === 0 ? "opacity-50" : ""
              }`}
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => scrollToPage(Math.min(totalPages - 1, activePage + 1))}
              className={`w-9 h-9 md:w-11 md:h-11 rounded-full flex items-center justify-center bg-orange-100 text-orange-600 md:bg-orange-500 md:text-white ${
                activePage === totalPages - 1 ? "opacity-50" : ""
              }`}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div className="relative">
          <div
            ref={categoryScrollRef}
            className="grid grid-cols-4 md:flex md:gap-12 md:overflow-x-auto pb-4 md:pb-8 scrollbar-hide scroll-smooth"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {/* DESKTOP VIEW: 16 items in 2 rows per column */}
            {rows.map((column, colIndex) => (
              <div key={colIndex} className="hidden md:flex flex-col gap-10 flex-shrink-0">
                {column.map((item, itemIndex) => (
                  <div key={itemIndex} className="flex flex-col items-center group cursor-pointer w-32" onClick={() => onSelectCategory(item.name)}>
                    <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-100 group-hover:border-orange-400 transition-all relative mb-3">
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    </div>
                    <span className="text-sm font-bold text-gray-700 text-center">{item.name}</span>
                  </div>
                ))}
              </div>
            ))}

            {/* MOBILE VIEW: 8 items in 4x2 grid */}
            {foodOptions.slice(0, 8).map((item, index) => (
              <div key={`mob-${index}`} className="flex md:hidden flex-col items-center mb-6 cursor-pointer" onClick={() => onSelectCategory(item.name)}>
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gray-100 relative mb-2">
                  <Image src={item.image} alt={item.name} fill className="object-cover" />
                </div>
                <span className="text-[10px] font-bold text-gray-700 text-center">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 md:py-16 px-6 md:px-8 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col md:grid md:grid-cols-4 gap-10 md:gap-12">
          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-4xl md:text-2xl font-serif italic font-bold mb-6 md:mb-4 text-orange-950">LocalWallah</h4>
            <div className="flex gap-6 md:hidden mb-10">
              <Facebook className="text-blue-600 fill-blue-600" size={32} />
              <Instagram className="text-black" size={32} />
              <Linkedin className="text-blue-500 fill-blue-500" size={32} />
            </div>
            <p className="hidden md:block text-sm text-gray-400">© 2025 Dine Order. All Rights Reserved</p>
          </div>

          <div className="grid grid-cols-2 gap-8 md:contents">
             <div className="text-left">
                <h5 className="font-bold text-xl md:text-xs md:uppercase md:tracking-widest mb-4">Policies</h5>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>Terms of Service</li>
                  <li>Privacy Policy</li>
                </ul>
             </div>
             <div className="text-left">
                <h5 className="font-bold text-xl md:text-xs md:uppercase md:tracking-widest mb-4">Quick Links</h5>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>Home</li>
                  <li>About Us</li>
                  <li>Contact Us</li>
                </ul>
             </div>
          </div>

          <div className="hidden md:block">
            <h5 className="font-bold text-gray-900 mb-6 uppercase text-xs tracking-widest">Social</h5>
            <div className="flex gap-5">
              <Instagram size={22} className="text-gray-800 hover:text-orange-600 transition-colors cursor-pointer" />
              <Facebook size={22} className="text-gray-800 hover:text-orange-600 transition-colors cursor-pointer" />
              <Linkedin size={22} className="text-gray-800 hover:text-orange-600 transition-colors cursor-pointer" />
            </div>
          </div>

          <div className="md:hidden text-center">
            <p className="text-[10px] text-gray-500">© 2024 Brand Name www.brandname.com</p>
          </div>
        </div>
      </footer>
    </div>
  );
}