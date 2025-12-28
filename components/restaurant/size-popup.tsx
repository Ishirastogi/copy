"use client"
import { useState } from "react"
import { X } from "lucide-react"

interface SizePopupProps {
  onClose: () => void
  onConfirm: (selectedSize: { label: string; price: number }) => void
}

export function SizePopup({ onClose, onConfirm }: SizePopupProps) {
  const [selectedSize, setSelectedSize] = useState("Small")
  
  const sizes = [
    { label: "Small", price: 123 },
    { label: "Medium", price: 234 },
    { label: "Large", price: 345 },
  ]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
      <div className="bg-white w-full max-w-md rounded-2xl overflow-hidden shadow-2xl">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-5xl font-serif text-[#374151]">Size</h2>
          <button onClick={onClose} className="p-1 bg-gray-100 rounded-full hover:bg-gray-200">
            <X size={20} className="text-gray-600" />
          </button>
        </div>
        
        <div className="p-4 space-y-3">
          {sizes.map((size) => (
            <label 
              key={size.label} 
              className="flex items-center justify-between p-5 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors"
            >
              <span className="text-xl font-serif text-gray-700">{size.label}</span>
              <div className="flex items-center gap-4">
                <span className="text-lg font-sans text-gray-600">₹{size.price}</span>
                <input
                  type="radio"
                  name="size"
                  checked={selectedSize === size.label}
                  onChange={() => setSelectedSize(size.label)}
                  className="w-6 h-6 accent-[#F97316]"
                />
              </div>
            </label>
          ))}
        </div>

        <div className="p-4 pt-0">
          <button 
            onClick={() => onConfirm(sizes.find(s => s.label === selectedSize)!)}
            className="w-full bg-[#1AA369] text-white py-4 rounded-xl font-bold text-xl hover:bg-[#168a58] transition-colors mt-2"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  )
}