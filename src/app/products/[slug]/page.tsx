import { client } from "@/sanity/lib/client";
import Navbar from "@/components/navbar";
import Footer from "@/components/pages/footer";
import Image from "next/image";

interface Props {
  params: {
    slug: string;
  };
}

const ProductPage = async ({ params }: Props) => {
  console.log('params:', params); // Debugging the params object

  // If slug is missing, display an error message
  if (!params?.slug) {
    return (
      <div>
        <Navbar />
        <div className="w-screen bg-background py-10">
          <div className="max-w-[1500px] mx-auto px-4">
            <p className="text-center text-red-500">
              Invalid product request. Please check the URL.
            </p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Fetch the product data from Sanity based on the slug
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

  const product = await client.fetch(singlePageQuery, {
    slug: params.slug,
  });

  // If no product is found, show an error message
  if (!product) {
    return (
      <div>
        <Navbar />
        <div className="w-screen bg-background py-10">
          <div className="max-w-[1500px] mx-auto px-4">
            <p className="text-center text-red-500">
              Product not found. Please check the URL.
            </p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Render the product details
  return (
    <div>
      <Navbar />
      <div className="w-screen bg-background py-10">
        <div className="max-w-[1500px] mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center space-x-10">
            <div className="w-full lg:w-1/2">
              <Image
                src={product.imageUrl}
                alt={product.title}
                width={500}
                height={500}
                className="w-full h-auto object-cover rounded-lg"
              />
            </div>

            <div className="w-full lg:w-1/2">
              <h1 className="text-3xl font-semibold">{product.title}</h1>
              <p className="text-xl text-gray-600 my-4">{product.description}</p>

              <div className="my-6">
                <span className="text-2xl font-bold">${product.price}</span>
                {product.priceWithoutDiscount && (
                  <span className="text-lg line-through ml-4 text-gray-500">
                    ${product.priceWithoutDiscount}
                  </span>
                )}
              </div>

              <div className="space-x-4 my-6">
                <span
                  className={`text-sm px-3 py-1 rounded-md ${
                    product.inventory > 0 ? 'bg-green-200' : 'bg-red-200'
                  }`}>
                  {product.inventory > 0 ? 'In Stock' : 'Out of Stock'}
                </span>

                {product.badge && (
                  <span className="text-sm font-semibold px-3 py-1 bg-blue-200 rounded-md">
                    {product.badge}
                  </span>
                )}
              </div>

              <div className="my-4">
                <button
                  disabled={product.inventory === 0}
                  className={`py-2 px-4 text-white rounded-md ${
                    product.inventory > 0 ? 'bg-blue-600' : 'bg-gray-400 cursor-not-allowed'
                  }`}>
                  Add to Cart
                </button>
              </div>
            </div>
          </div>

          <div className="mt-12">
            <h2 className="text-2xl font-semibold">Tags</h2>
            <div className="flex flex-wrap mt-4 space-x-4">
              {product.tags?.map((tag: string, index: number) => (
                <span
                  key={index}
                  className="px-4 py-2 text-sm bg-gray-200 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductPage;
