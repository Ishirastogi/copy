import React from "react";

type SizeOption = {
  size: string;
  price: number;
};

type SizeModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onContinue: () => void;
  selectedSize: string;
  setSelectedSize: (size: string) => void;
};

const sizeOptions: SizeOption[] = [
  { size: "Small", price: 123 },
  { size: "Medium", price: 234 },
  { size: "Large", price: 345 },
];

const SizeModal: React.FC<SizeModalProps> = ({
  isOpen,
  onClose,
  onContinue,
  selectedSize,
  setSelectedSize,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white w-[90%] max-w-md rounded-xl shadow-lg p-6 relative">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl"
        >
          ✕
        </button>

        <h2 className="text-2xl font-semibold mb-4">Size</h2>

        {/* Size options */}
        <div className="space-y-3">
          {sizeOptions.map((item) => (
            <label
              key={item.size}
              className="flex items-center justify-between border rounded-lg px-4 py-3 cursor-pointer hover:bg-gray-50"
            >
              <span className="text-lg">{item.size}</span>

              <div className="flex items-center gap-3">
                <span className="font-semibold">₹{item.price}</span>
                <input
                  type="radio"
                  name="size"
                  checked={selectedSize === item.size}
                  onChange={() => setSelectedSize(item.size)}
                  className="accent-orange-500"
                />
              </div>
            </label>
          ))}
        </div>

        {/* Continue */}
        <button
          onClick={onContinue}
          className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg text-lg font-semibold"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default SizeModal;
