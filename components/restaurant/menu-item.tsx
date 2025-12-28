"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { SizePopup } from "./size-popup"

export default function MenuItem({ item, onAddItem }: any) {
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [quantity, setQuantity] = useState(0)

  const handleAddClick = () => {
    setIsPopupOpen(true)
  }

  const handleSizeConfirm = (selectedSize: { label: string; price: number }) => {
    setQuantity(1)
    onAddItem({ 
      ...item, 
      id: `${item.id}-${selectedSize.label}`, // Unique ID for specific size
      price: selectedSize.price, 
      selectedSize: selectedSize.label,
      quantity: 1 
    })
    setIsPopupOpen(false)
  }

  return (
   <div className="flex justify-between items-start py-4 sm:py-6 border-b border-gray-100 last:border-0">
      <div className="flex-1 pr-6">
        <div className="flex items-start gap-3">
          {/* Veg/Non-Veg Icon */}
          <div className={`mt-1.5 w-4 h-4 border-2 flex items-center justify-center shrink-0 ${item.veg ? "border-green-600" : "border-red-600"}`}>
             <div className={`w-2 h-2 rounded-full ${item.veg ? "bg-green-600" : "bg-red-600"}`} />
          </div>
          <div>
           <h3 className="text-lg sm:text-2xl font-serif font-bold text-gray-800 leading-tight">
              {item.name}
              {item.isCustomizable && (
                <span className="ml-2 text-[10px] bg-orange-50 text-orange-500 border border-orange-100 px-2 py-0.5 rounded-sm uppercase font-black">Customize</span>
              )}
            </h3>
           <p className="text-xs sm:text-sm text-gray-400 mt-1 leading-snug">
              Serve 1. Grilled Bread with tomatoes, garlic basil and olive oil
            </p>
            <div className="mt-3">
              <p className="text-sm sm:text-lg font-bold text-gray-900 font-sans">
  Rs. {item.price}
</p>
              <p className="text-[11px] text-red-400 font-bold uppercase mt-1">Rs. 1000 for two</p>
            </div>
          </div>
        </div>
      </div>

      {/* Image Container with Overlapping Button */}
      <div className="relative w-28 h-28 sm:w-36 sm:h-36 shrink-0">
        <img 
          src={item.image || "https://via.placeholder.com/150"} 
          className="w-full h-full object-cover rounded-2xl shadow-sm border border-gray-50"
          alt={item.name}
        />
       <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-[90%]">
          {quantity === 0 ? (
            <Button
              onClick={handleAddClick}
              className="w-full bg-[#FFF1F0] hover:bg-[#FFE4E1] text-[#F97316] border border-orange-100 shadow-md font-bold py-2 rounded-xl h-auto transition-all"
            >
              Add
            </Button>
          ) : (
           <div className="flex items-center bg-white border border-[#F97316] rounded-xl shadow-md overflow-hidden h-9">
              <button onClick={() => setQuantity(q => q - 1)} className="flex-1 h-full text-[#F97316] font-black text-xl hover:bg-orange-50">−</button>
              <span className="flex-1 text-center text-[#F97316] font-bold text-lg">{quantity}</span>
              <button onClick={() => setQuantity(q => q + 1)} className="flex-1 h-full text-[#F97316] font-black text-xl hover:bg-orange-50">+</button>
            </div>
          )}
        </div>
      </div>

      {isPopupOpen && (
        <SizePopup 
          onClose={() => setIsPopupOpen(false)} 
          onConfirm={handleSizeConfirm} 
        />
      )}
    </div>
  )
}