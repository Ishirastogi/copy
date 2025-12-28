"use client";
import { useCart } from "@/context/cart-context";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Share2, MapPin } from "lucide-react";
import MenuSection from "./menu-section";

interface RestaurantPageProps {
  restaurant: any;
  onBack: () => void;
  onViewCart: () => void;
}

export default function RestaurantPage({
  restaurant,
  onBack,
  onViewCart,
}: RestaurantPageProps) {
  const { cart, addToCart, getTotalItems } = useCart();

  const handleAddItem = (item: any) => {
    addToCart({ ...item, quantity: 1 }, restaurant.id, restaurant.name);
  };

  const foodFilters = ["Non-Veg", "Veg", "Egg", "Beverage", "Alcohol", "Spicy"];
  const cartCount = getTotalItems();

  return (
    <div className="min-h-screen bg-white">
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <h1 className="text-lg font-bold text-gray-900 flex-1 text-center">
            {restaurant.name}
          </h1>

          <div className="w-6"></div>
        </div>
      </header>

      {/* Hero Image */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="rounded-2xl overflow-hidden h-64 md:h-80 bg-gray-200 mb-4">
          <img
            src={restaurant.image || "/placeholder.svg"}
            alt={restaurant.name}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex-1">
            <h1 className="text-xl sm:text-3xl font-serif text-gray-900 leading-tight">
              {restaurant.name}
            </h1>
            <p className="text-sm text-gray-600">{restaurant.cuisine}</p>
            <p className="text-sm text-gray-600">{restaurant.location}</p>
          </div>

          <div className="flex items-center gap-2 mt-1">
            <button className="flex items-center gap-1 bg-white px-3 py-1.5 rounded-full border border-gray-200 text-xs text-gray-700 shadow-sm">
              <MapPin className="w-4 h-4" />
              Get Direction
            </button>

            <button className="bg-white p-2 rounded-full border border-gray-200 shadow-sm">
              <Share2 className="w-4 h-4 text-gray-700" />
            </button>
          </div>
        </div>

        {/* </CHANGE> */}

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 pb-6 mb-8 border-b border-gray-200">
          {foodFilters.map((filter, index) => (
            <button
              key={index}
              className={`px-4 py-2 rounded-full font-medium whitespace-nowrap ${
                index === 1
                  ? "bg-orange-100 text-orange-600"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Menu Sections */}
        {/* Menu Sections */}
        {restaurant.items ? (
          <div className="space-y-8 mb-20">
            {restaurant.items.appetizers?.length > 0 && (
              <MenuSection
                title="Appetizers"
                items={restaurant.items.appetizers}
                onAddItem={handleAddItem}
              />
            )}

            {restaurant.items.mainCourse?.length > 0 && (
              <MenuSection
                title="Main Course"
                items={restaurant.items.mainCourse}
                onAddItem={handleAddItem}
              />
            )}
          </div>
        ) : (
          <div className="py-10 text-center text-gray-500">
            No menu items found.
          </div>
        )}
      </div>

      {/* View Cart Button */}
      {cartCount > 0 && (
        <div className="fixed bottom-6 right-6 z-50">
          <Button
            onClick={onViewCart}
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-6 rounded-full font-bold text-lg shadow-lg flex items-center gap-2"
          >
            View Cart ({cartCount})
          </Button>
        </div>
      )}

      <footer className="bg-gray-50 border-t border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4">
          {/* FSSAI */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center text-xs font-semibold">
              FSSAI
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-800">
                License No. 12724060000693
              </p>
              <p className="text-sm text-gray-600">{restaurant.name}</p>
              <p className="text-xs text-gray-500">
                17, Ganganagar, Rajasthan, 244001
              </p>
            </div>
          </div>

          {/* Brand */}
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-gray-900">LocalWallah</h2>
            <div className="flex justify-center gap-4 mt-3">
              <span className="text-xl">📘</span>
              <span className="text-xl">📸</span>
              <span className="text-xl">🔗</span>
            </div>
          </div>

          {/* Links */}
          <div className="flex justify-between text-sm text-gray-600 px-4">
            <div className="space-y-2">
              <p>Terms of Service</p>
              <p>Privacy Policy</p>
            </div>
            <div className="space-y-2 text-right">
              <p>Home</p>
              <p>About Us</p>
              <p>Contact Us</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
