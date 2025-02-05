'use client'

import { useState } from 'react';

const ShippingPage = () => {
  const [addressFrom, setAddressFrom] = useState('');
  const [addressTo, setAddressTo] = useState('');
  const [parcel, setParcel] = useState('');
  const [shippingResult, setShippingResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const response = await fetch('/api/shipping', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        address_from: addressFrom,
        address_to: addressTo,
        parcel: parcel,
      }),
    });

    const data = await response.json();
    setShippingResult(data);
    setLoading(false);
  };

  return (
    <div>
      <h1>Shipping Calculator</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="addressFrom">Address From:</label>
          <input
            type="text"
            id="addressFrom"
            value={addressFrom}
            onChange={(e) => setAddressFrom(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="addressTo">Address To:</label>
          <input
            type="text"
            id="addressTo"
            value={addressTo}
            onChange={(e) => setAddressTo(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="parcel">Parcel Info:</label>
          <input
            type="text"
            id="parcel"
            value={parcel}
            onChange={(e) => setParcel(e.target.value)}
            required
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Calculate Shipping'}
        </button>
      </form>

      {shippingResult && (
        <div>
          <h3>Shipping Result</h3>
          <pre>{JSON.stringify(shippingResult, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default ShippingPage;