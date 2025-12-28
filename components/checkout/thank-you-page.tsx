"use client"

import { CheckCircle, ShoppingCart } from "lucide-react"
import Image from "next/image"

interface ThankYouPageProps {
  onContinue: () => void
}

export default function ThankYouPage({ onContinue }: ThankYouPageProps) {
  const orderNumber = "FD9866G"
  const estimatedArrival = "25-30 Mins"
  const totalPaid = 490.3

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">

      {/* HEADER */}
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-3 flex items-center">
          <Image
            src="/logo.png"
            alt="LocalWallah"
            width={120}
            height={40}
            className="object-contain h-10 w-auto"
            priority
          />
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-8">

        {/* Success Icon */}
        <div className="mb-6">
          <div className="h-20 w-20 rounded-full bg-orange-500 flex items-center justify-center">
            <CheckCircle className="text-white w-12 h-12" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-900 text-center mb-2">
          Thank you for placing your order!
        </h1>

        <p className="text-gray-600 text-center mb-6">
          Your order has been confirmed.
        </p>

        {/* Order Info Card */}
        <div className="w-full max-w-md bg-white border border-orange-400 rounded-2xl p-6 mb-6">
          <div className="flex justify-between mb-4">
            <div>
              <p className="text-sm text-gray-500">Estimated Arrival</p>
              <p className="font-semibold">{estimatedArrival}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Order Number</p>
              <p className="font-semibold">#{orderNumber}</p>
            </div>
          </div>

          <div className="border-t pt-4">
            <p className="text-sm text-gray-500">Total Paid</p>
            <p className="text-xl font-bold">₹{totalPaid.toFixed(2)}</p>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="w-full max-w-md space-y-4">
          <button
            onClick={onContinue}
            className="w-full flex items-center justify-center gap-2 rounded-full bg-orange-500 py-4 font-bold text-white hover:bg-orange-600"
          >
            <ShoppingCart size={20} />
            Track My Order!
          </button>

          <button
            onClick={onContinue}
            className="w-full rounded-full bg-green-100 py-4 font-semibold text-green-700 hover:bg-green-200"
          >
            Get instant updates on WhatsApp
          </button>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="mt-10 bg-gray-50 border-t border-gray-200 py-6 text-center">
        <Image
          src="/logo.png"
          alt="LocalWallah"
          width={140}
          height={45}
          className="mx-auto mb-4"
        />

        <div className="flex justify-center gap-6 mb-4">
          <span className="text-xl">📘</span>
          <span className="text-xl">📸</span>
          <span className="text-xl">🔗</span>
        </div>

        <div className="flex justify-center gap-10 text-sm text-gray-600">
          <span>Terms of Service</span>
          <span>Privacy Policy</span>
        </div>
      </footer>
    </div>
  )
}
