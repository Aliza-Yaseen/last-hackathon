'use client';
import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export default function CheckoutButton({ cartItems }: { cartItems: CartItem[] }) {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    const response = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cartItems }),
    });

    const { sessionId } = await response.json();
    const stripe = await stripePromise;
    await stripe?.redirectToCheckout({ sessionId });

    setLoading(false);
  };

  return (
    <button
      onClick={handleCheckout}
      className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
      disabled={loading}
    >
      {loading ? 'Processing...' : 'Proceed to Checkout'}
    </button>
  );
}
