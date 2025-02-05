import { NextResponse } from 'next/server';

const SHIPPO_API_KEY = 'your-shippo-api-key';  // Replace with your Shippo API key

// POST method to create a shipment using the Shippo API
export async function POST(request: Request) {
  try {
    // Parse the incoming JSON request body
    const { address_from, address_to, parcel } = await request.json();

    // Make a request to the Shippo API to create a shipment
    const response = await fetch('https://api.goshippo.com/shipments/', {
      method: 'POST',
      headers: {
        'Authorization': `ShippoToken ${SHIPPO_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        address_from,
        address_to,
        parcel,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      // Return the successful response from Shippo API
      return NextResponse.json(data);
    } else {
      // If the response is not okay, send an error message
      return NextResponse.json({ error: data.error_message || 'Failed to create shipment' }, { status: 400 });
    }
  } catch {
    // If any errors occur, return a 500 status code
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
