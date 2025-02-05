"use client";
import { useState } from "react";

export default function Checkout() {
  interface ShippingRate {
    amount: number;
  }

  const [shippingRate, setShippingRate] = useState<ShippingRate | null>(null);

  const getShippingRate = async () => {
    const res = await fetch("/api/shipping", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",  // ✅ Add this header
      },
      body: JSON.stringify({
        address_from: {
          city: "New York",
          state: "NY",
          zip: "10001",
          country: "US",
        },
        address_to: {
          city: "Los Angeles",
          state: "CA",
          zip: "90001",
          country: "US",
        },
        parcel: {
          length: "10",
          width: "5",
          height: "5",
          weight: "2",
        },
      }),
    });

    const data = await res.json();
    console.log("Shipping Response:", data); // ✅ Debugging

    if (data.error) {
      alert("Error fetching shipping rate: " + data.error);
      return;
    }

    setShippingRate(data);
  };

  return (
    <div>
      <h1>Checkout</h1>
      <button onClick={getShippingRate}>Calculate Shipping</button>
      {shippingRate && <p>Shipping Cost: ${shippingRate.amount}</p>}
    </div>
  );
}
