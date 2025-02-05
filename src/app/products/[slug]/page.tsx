// import Image from "next/image";
// import { Button } from "@/components/ui/button";
// import ProductNotFound from "@/components/productnotfound";
// import { Badge } from "@/components/ui/badge";
// import { client } from "@/sanity/lib/client";
// import Navbar from "@/components/navbar";
// import Footer from "@/components/pages/footer";

// export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
//   try {
//     const singlePageQuery = `
//       *[_type == "products" && slug.current == $slug][0]{
//         _id,
//         title,
//         price,
//         price_id,
//         priceWithoutDiscount,
//         badge,
//         "imageUrl": image.asset->url,
//         category->{
//           _id,
//           title
//         },
//         description,
//         inventory,
//         tags
//       }
//     `;

//     const product = await client.fetch(singlePageQuery, {
//       slug: (await params).slug,
//     });

//     if (!product) {
//       return <ProductNotFound />;
//     }

//     return (
//       <div className="overflow-x-hidden">
//         <Navbar />
//         <div className="w-full bg-background py-10">
//           <div className="max-w-[1500px] mx-auto px-4">
//             <div className="grid md:grid-cols-2 gap-8">
//               {/* Product Image */}
//               {product.imageUrl ? (
//                 <div className="flex justify-center items-center w-full">
//                   <Image
//                     src={product.imageUrl}
//                     alt={product.title}
//                     layout="intrinsic"
//                     width={500}
//                     height={500}
//                     quality={100}
//                     className="object-contain rounded-md max-w-full h-auto"
//                   />
//                 </div>
//               ) : (
//                 <p className="text-gray-500 text-center md:text-left">Image not available</p>
//               )}

//               {/* Product Details */}
//               <div className="flex flex-col gap-6 md:gap-8 w-full lg:w-[90%] justify-center items-center md:items-start text-center md:text-left">
//                 <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold">
//                   {product.title}
//                 </h1>

//                 <div className="flex flex-wrap gap-4 justify-center md:justify-start">
//                   <Badge className="bg-second hover:bg-hover px-4 py-2 rounded-2xl text-black">
//                     ${product.price} USD
//                   </Badge>
//                   {product.inventory === 0 ? (
//                     <Badge className="bg-red-500 px-4 py-2 rounded-2xl text-white">
//                       Out of Stock
//                     </Badge>
//                   ) : (
//                     <Badge className="bg-green-500 px-4 py-2 rounded-2xl text-white">
//                       {product.inventory === 1 ? "Only 1 left!" : "In Stock"}
//                     </Badge>
//                   )}
//                 </div>

//                 <p className="text-gray-600">{product.description}</p>

//                 {/* Simplified Buttons */}
//                 <div className="flex flex-col md:flex-row gap-4 items-center">
//                   <Button variant="default">Add to Wishlist</Button>
//                   {product.inventory > 0 ? (
//                     <Button variant="secondary">Add to Cart</Button>
//                   ) : (
//                     <Button variant="secondary" disabled>
//                       Out of Stock
//                     </Button>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         <Footer />
//       </div>
//     );
//   } catch (error) {
//     console.error("Error fetching product:", error);
//     return (
//       <div className="w-full bg-background py-10">
//         <div className="max-w-[1500px] mx-auto px-4">
//           <p className="text-center text-red-500">
//             An error occurred while loading the product. Please try again later.
//           </p>
//         </div>
//       </div>
//     );
//   }
// }


// import Image from "next/image";
// import { Button } from "@/components/ui/button";
// import ProductNotFound from "@/components/productnotfound";
// import { Badge } from "@/components/ui/badge";
// import { client } from "@/sanity/lib/client";
// import Navbar from "@/components/navbar";
// import Footer from "@/components/pages/footer";

// export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
//   try {
//     // Query to fetch product based on slug
//     const singlePageQuery = `
//       *[_type == "products" && slug.current == $slug][0]{
//         _id,
//         title,
//         price,
//         price_id,
//         priceWithoutDiscount,
//         badge,
//         "imageUrl": image.asset->url,
//         category->{
//           _id,
//           title
//         },
//         description,
//         inventory,
//         tags
//       }
//     `;

//     // Fetch the product based on the slug
//     const product = await client.fetch(singlePageQuery, {
//       slug: (await params).slug,  // Extract the slug from the URL params
//     });

//     if (!product) {
//       return <ProductNotFound />;
//     }

//     return (
//       <div className="overflow-x-hidden">
//         <Navbar />
//         <div className="w-full bg-background py-10">
//           <div className="max-w-[1500px] mx-auto px-4">
//             <div className="grid md:grid-cols-2 gap-8">
//               {/* Product Image */}
//               {product.imageUrl ? (
//                 <div className="flex justify-center items-center w-full">
//                   <Image
//                     src={product.imageUrl}
//                     alt={product.title}
//                     layout="intrinsic"
//                     width={500}
//                     height={500}
//                     quality={100}
//                     className="object-contain rounded-md max-w-full h-auto"
//                   />
//                 </div>
//               ) : (
//                 <p className="text-gray-500 text-center md:text-left">Image not available</p>
//               )}

//               {/* Product Details */}
//               <div className="flex flex-col gap-6 md:gap-8 w-full lg:w-[90%] justify-center items-center md:items-start text-center md:text-left">
//                 <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold">
//                   {product.title}
//                 </h1>

//                 <div className="flex flex-wrap gap-4 justify-center md:justify-start">
//                   <Badge className="bg-second hover:bg-hover px-4 py-2 rounded-2xl text-black">
//                     ${product.price} USD
//                   </Badge>
//                   {product.inventory === 0 ? (
//                     <Badge className="bg-red-500 px-4 py-2 rounded-2xl text-white">
//                       Out of Stock
//                     </Badge>
//                   ) : (
//                     <Badge className="bg-green-500 px-4 py-2 rounded-2xl text-white">
//                       {product.inventory === 1 ? "Only 1 left!" : "In Stock"}
//                     </Badge>
//                   )}
//                 </div>

//                 <p className="text-gray-600">{product.description}</p>

//                 {/* Add to Cart Button */}
//                 <div className="flex flex-col md:flex-row gap-4 items-center">
//                   <Button variant="default">Add to Wishlist</Button>
//                   {product.inventory > 0 ? (
//                     <Button variant="secondary">Add to Cart</Button>
//                   ) : (
//                     <Button variant="secondary" disabled>
//                       Out of Stock
//                     </Button>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         <Footer />
//       </div>
//     );
//   } catch (error) {
//     console.error("Error fetching product:", error);
//     return (
//       <div className="w-full bg-background py-10">
//         <div className="max-w-[1500px] mx-auto px-4">
//           <p className="text-center text-red-500">
//             An error occurred while loading the product. Please try again later.
//           </p>
//         </div>
//       </div>
//     );
//   }
// }



// src/app/products/[slug]/page.tsx
"use client"; // Mark this file as a client component

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { client } from "@/sanity/lib/client";
import { useCart } from "@/components/cartcomponent/cart"; // Import the useCart hook
import Navbar from "@/components/navbar";
import Footer from "@/components/pages/footer";

// Using React.use() to unwrap the params promise
export default function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { addToCart } = useCart(); // Use the addToCart function from context

  interface Product {
    _id: string;
    title: string;
    price: number;
    price_id: string;
    priceWithoutDiscount: number;
    badge: string;
    imageUrl: string;
    category: {
      _id: string;
      title: string;
    };
    description: string;
    inventory: number;
    tags: string[];
  }

  const [product, setProduct] = React.useState<Product | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [slug, setSlug] = React.useState<string>("");

  // Unwrapping the params slug asynchronously
  React.useEffect(() => {
    const fetchParams = async () => {
      const resolvedParams = await params; // Resolve the promise to get the actual params object
      setSlug(resolvedParams.slug); // Extract slug from the resolved params
    };

    fetchParams();
  }, [params]);

  React.useEffect(() => {
    if (slug) {
      const fetchProduct = async () => {
        try {
          const singlePageQuery = `
            *[_type == "products" && slug.current == $slug][0]{
              _id,
              title,
              price,
              price_id,
              priceWithoutDiscount,
              badge,
              "imageUrl": image.asset->url,
              category->{
                _id,
                title
              },
              description,
              inventory,
              tags
            }
          `;

          const product = await client.fetch(singlePageQuery, {
            slug: slug,
          });

          if (!product) {
            setError("Product not found");
          } else {
            setProduct(product);
          }
        } catch (error) {
          console.error("Error fetching product:", error);
          setError("An error occurred while loading the product. Please try again later.");
        }
      };

      fetchProduct();
    }
  }, [slug]);

  const handleAddToCart = () => {
    if (product) {
      const cartItem = {
        id: product._id,
        name: product.title,
        price: product.price,
        quantity: 1,
        image: product.imageUrl,
      };
      addToCart(cartItem); // Add product to the cart
    }
  };

  if (error) {
    return (
      <div className="w-full bg-background py-10">
        <div className="max-w-[1500px] mx-auto px-4">
          <p className="text-center text-red-500">{error}</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <Navbar />
      <div className="overflow-x-hidden">
        <div className="w-full bg-background py-10">
          <div className="max-w-[1500px] mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Product Image */}
              {product.imageUrl ? (
                <div className="flex justify-center items-center w-full">
                  <Image
                    src={product.imageUrl}
                    alt={product.title}
                    layout="intrinsic"
                    width={500}
                    height={500}
                    quality={100}
                    className="object-contain rounded-md max-w-full h-auto"
                  />
                </div>
              ) : (
                <p className="text-gray-500 text-center md:text-left">Image not available</p>
              )}

              {/* Product Details */}
              <div className="flex flex-col gap-6 md:gap-8 w-full lg:w-[90%] justify-center items-center md:items-start text-center md:text-left">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold">
                  {product.title}
                </h1>

                <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                  <Badge className="bg-second hover:bg-hover px-4 py-2 rounded-2xl text-black">
                    ${product.price} USD
                  </Badge>
                  {product.inventory === 0 ? (
                    <Badge className="bg-red-500 px-4 py-2 rounded-2xl text-white">
                      Out of Stock
                    </Badge>
                  ) : (
                    <Badge className="bg-green-500 px-4 py-2 rounded-2xl text-white">
                      {product.inventory === 1 ? "Only 1 left!" : "In Stock"}
                    </Badge>
                  )}
                </div>

                <p className="text-gray-600">{product.description}</p>

                {/* Add to Cart Button */}
                <div className="flex flex-col md:flex-row gap-4 items-center">
                  <Button variant="default">Add to Wishlist</Button>
                  {product.inventory > 0 ? (
                    <Button variant="secondary" onClick={handleAddToCart}>
                      Add to Cart
                    </Button>
                  ) : (
                    <Button variant="secondary" disabled>
                      Out of Stock
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
