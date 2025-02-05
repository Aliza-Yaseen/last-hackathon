
// import Navbar from "@/components/navbar";
// import Footer from "@/components/pages/footer";
// import InstagramSection from "@/components/pages/insta";
// import Image from 'next/image';
// import { FaShoppingCart } from 'react-icons/fa'; // Import a cart icon from react-icons

// export default function AllProducts() {
//   // Updated Product Data with the additional row of products
//   const products = [
//     { id: 1, name: 'Library Stool Chair', price: '$25', originalPrice: '$30', image: '/images/white-pf.png' },
//     { id: 2, name: 'Library Stool Chair', price: '$30', originalPrice: '$40', image: '/images/pink-pf.jpg' },
//     { id: 3, name: 'Library Stool Chair', price: '$40', originalPrice: '$50', image: '/images/orange-pf.png' },
//     { id: 4, name: 'Library Stool Chair', price: '$35', originalPrice: '$45', image: '/images/sofa-pf.png' },
//     { id: 5, name: 'Library Stool Chair', price: '$20', originalPrice: '$25', image: '/images/cat-1.png' },
//     { id: 6, name: 'Library Stool Chair', price: '$28', originalPrice: '$35', image: '/images/exp-gray.png' },
//     { id: 7, name: 'Library Stool Chair', price: '$32', originalPrice: '$38', image: '/images/our-black.png' },
//     { id: 8, name: 'Library Stool Chair', price: '$45', originalPrice: '$50', image: '/images/white-pf.png' },

//     // Adding one more row with 4 products
//     { id: 9, name: 'Office Chair', price: '$50', originalPrice: '$60', image: '/images/cat-1.png' },
//     { id: 10, name: 'Armchair', price: '$70', originalPrice: '$80', image: '/images/pink-pf.jpg' },
//     { id: 11, name: 'Bean Bag', price: '$40', originalPrice: '$50', image: '/images/orange-pf.png' },
//     { id: 12, name: 'Coffee Table', price: '$45', originalPrice: '$55', image: '/images/cat-3.png' }
//   ];

//   return (
//     <div>
//       <Navbar />

//       {/* Products Section */}
//       <section className="container mx-auto px-6 py-16">
//         <h2 className="text-3xl font-bold text-center text-gray-800 mb-8 py-2">All Products</h2>

//         {/* Product Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
//           {products.map((product, index) => (
//             <div
//               key={product.id}
//               className="relative bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
//               style={{ height: '400px' }} // Set a fixed height for the product card
//             >
//               {/* Product Image */}
//               <div className="relative w-full" style={{ height: '280px' }}>
//                 <Image
//                   src={product.image}
//                   alt={product.name}
//                   layout="fill"
//                   objectFit="cover"
//                   className="rounded-t-lg"
//                 />
//               </div>

//               {/* Product Labels (New and Sales) */}
//               {index === 0 || index === 4 || index === 8 ? (
//                 <div className="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold py-1 px-2 rounded-lg">
//                   New
//                 </div>
//               ) : null}

//               {index === 1 || index === 5 || index === 9 ? (
//                 <div className="absolute top-2 left-2 bg-yellow-500 text-white text-xs font-bold py-1 px-2 rounded-lg">
//                   Sales
//                 </div>
//               ) : null}

//               {/* Product Details */}
//               <div className="p-4 flex flex-col justify-between h-full">
//                 {/* Left Side: Name and Price */}
//                 <div>
//                   <h3 className="text-lg font-semibold text-gray-800 mb-1">{product.name}</h3>
//                   <div className="flex items-center gap-2">
//                     <span className="text-sm text-red-500 line-through">{product.originalPrice}</span>
//                     <span className="text-sm font-bold text-gray-800">{product.price}</span>
//                   </div>
//                 </div>

//                 {/* Right Side: Cart Icon */}
//                 <div className="flex justify-end mt-auto">
//                   <button
//                     className="flex items-center justify-center w-12 h-12 bg-teal-500 text-white border border-gray-300 rounded-md hover:bg-teal-600 transition-colors"
//                     aria-label="Add to Cart"
//                   >
//                     <FaShoppingCart size={20} className="text-white" />
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>

//       <InstagramSection/>

//       <Footer />
//     </div>
//   );
// }
import AllProducts from "@/components/Allproducts";
import Navbar from "@/components/navbar";
import Footer from "@/components/pages/footer";
import InstagramSection from "@/components/pages/insta";
import Image from "next/image";
import { FaShoppingCart } from "react-icons/fa";
import { client } from "@/sanity/lib/client";

export default async function ProductPage({ params }: { params?: { slug?: string } }) {
  if (!params?.slug) {
    return (
      <div>
        <Navbar />
        {/* <div className="w-screen bg-background py-10">
          <div className="max-w-[1500px] mx-auto px-4">
            <p className="text-center text-red-500">
              Invalid product request. Please check the URL.
            </p>
          </div>
        </div> */}
        <AllProducts/>
        <Footer />
      </div>
    );
  }

  try {
    const singlePageQuery = `
      *[_type == "products" && slug.current == $slug][0]{
        _id,
        title,
        "slug": slug.current,
        price,
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

    const product = await client.fetch(singlePageQuery, { slug: params.slug });

    if (!product) {
      return (
        <div>
          <Navbar />
          <div className="w-screen bg-background py-10">
            <div className="max-w-[1500px] mx-auto px-4">
              <p className="text-center text-red-500">Product not found</p>
            </div>
          </div>
          <Footer />
        </div>
      );
    }

    return (
      <div>
        <Navbar />
        <div className="w-screen bg-background py-10">
          <div className="max-w-[1500px] mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8">
              {product.imageUrl ? (
                <div className="flex justify-center items-center relative w-full">
                  <Image
                    src={product.imageUrl}
                    alt={product.title}
                    width={500}
                    height={500}
                    quality={100}
                    className="object-contain rounded-md"
                  />
                </div>
              ) : (
                <p className="text-gray-500">Image not available</p>
              )}

              <div className="flex flex-col gap-6 md:gap-8 w-full lg:w-[90%] justify-center items-center md:items-start">
                <h1 className="text-center md:text-left text-5xl md:text-6xl font-semibold">
                  {product.title}
                </h1>
                <div className="flex flex-row gap-4 md:gap-8 items-center md:items-start justify-center md:justify-start">
                  <span className="bg-second hover:bg-hover px-4 py-2 rounded-2xl text-white">
                    ${product.price} USD
                  </span>
                  {product.inventory === 0 ? (
                    <span className="bg-red-500 px-4 py-2 rounded-2xl text-white">
                      Out of Stock
                    </span>
                  ) : (
                    <span className="bg-green-500 px-4 py-2 rounded-2xl text-white">
                      {product.inventory === 1 ? "Only 1 left!" : "In Stock"}
                    </span>
                  )}
                </div>
                <p className="text-gray-600 mt-4 md:text-left text-center">
                  {product.description}
                </p>
                <div className="flex gap-5 flex-col md:flex-row items-center justify-center">
                  <button
                    className="flex items-center justify-center w-12 h-12 bg-teal-500 text-white border border-gray-300 rounded-md hover:bg-teal-600 transition-colors"
                    aria-label="Add to Cart"
                  >
                    <FaShoppingCart size={20} className="text-white" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <InstagramSection />
        <Footer />
      </div>
    );
  } catch (error) {
    console.error("Error fetching product:", error);
    return (
      <div>
        <Navbar />
        <div className="w-screen bg-background py-10">
          <div className="max-w-[1500px] mx-auto px-4">
            <p className="text-center text-red-500">
              An error occurred while loading the product. Please try again later.
            </p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
