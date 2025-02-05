import { NextResponse } from "next/server";
import axios from "axios";

const SHIPPO_API_KEY = process.env.SHIPPO_API_KEY; // Ensure this is loaded

export async function POST(req: Request) {
  try {
    const { address_from, address_to, parcel } = await req.json();

    if (!SHIPPO_API_KEY) {
      return NextResponse.json({ error: "Missing API Key" }, { status: 500 });
    }

    const response = await axios.post(
      "https://api.goshippo.com/shipments/",
      {
        address_from,
        address_to,
        parcels: [parcel],
        carrier_accounts: [], // Remove this or provide a real carrier ID
        async: false,
      },
      {
        headers: {
          Authorization: `ShippoToken ${SHIPPO_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Shippo API Error:", error);
    return NextResponse.json({ error: "Shipping request failed" }, { status: 500 });
  }
}
