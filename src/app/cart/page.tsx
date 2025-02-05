'use client'
// src/app/cart/page.tsx

import React from 'react';
import { useCart } from '@/components/cartcomponent/cart'; // Import the useCart hook
import Image from 'next/image';
import Link from 'next/link';  // Import the Link component for navigation

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity } = useCart(); // Get cart items and functions

  if (cartItems.length === 0) {
    return <h1 className="text-2xl text-center mt-10">Your cart is empty!</h1>;
  }

  // Calculate total price
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleRemoveItem = (id: string) => {
    removeFromCart(id);  // Remove the item by its ID
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    if (quantity > 0) {
      updateQuantity(id, quantity);  // Update quantity
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-6 text-center">Your Cart</h1>
      <div className="space-y-6">
        {cartItems.map((item) => (
          <div key={item.id} className="flex items-center justify-between border-b pb-6">
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 relative">
                <Image
                  src={item.image.startsWith('http') ? item.image : `/images/${item.image}`}
                  alt={item.name}
                  width={96}
                  height={96}
                  className="rounded-lg object-cover"
                  onError={(e) => (e.currentTarget.src = '/images/placeholder.jpg')}
                />
              </div>
              <div>
                <h2 className="text-lg font-semibold">{item.name}</h2>
                <p className="text-gray-600">Price: ${item.price}</p>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)} // Decrease quantity
                    className="px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600"
                  >
                    -
                  </button>
                  <span className="text-lg">{item.quantity}</span>
                  <button
                    onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)} // Increase quantity
                    className="px-4 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <button
              onClick={() => handleRemoveItem(item.id)} // Remove item completely
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
            >
              Remove Item
            </button>
          </div>
        ))}
      </div>

      {/* Display the Total Price at the bottom */}
      <div className="flex justify-between text-xl font-semibold mt-6">
        <p>Total Price: </p>
        <p className="text-green-600">${totalPrice.toFixed(2)}</p>
      </div>

      {/* Proceed to Checkout Button */}
      <div className="flex justify-center mt-6">
        <Link href="/checkout">
          <button className="px-6 py-3 bg-teal-600 text-white text-lg font-semibold rounded-lg hover:bg-teal-700 transition">
            Proceed to Checkout
          </button>
        </Link>
      </div>
    </div>
  );
}
