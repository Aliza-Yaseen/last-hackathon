import { createClient } from "next-sanity";

// Replace these values with your actual Sanity project credentials
export const sanityClient = createClient({
  projectId: "y8ktk6yi",  // Replace with your Sanity project ID
  dataset: "production",      // Replace with your Sanity dataset name
  apiVersion: "2023-01-01",    // Use the current date as the API version
  useCdn: process.env.NODE_ENV === "production", // Use CDN in production
});
