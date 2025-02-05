import { fetchAllProducts } from "@/sanity/lib/queries";
import Image from "next/image";
import Link from "next/link";

const AllProducts = async () => {
  const products = await fetchAllProducts();

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center mb-6">Our Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product: { _id: string; slug: string; imageUrl: string; title: string; price: number; priceWithoutDiscount?: number }) => (
          <div key={product._id} className="border rounded-lg p-4 shadow-lg">
            <Link href={`/products/${product.slug}`}>
              <Image
                src={product.imageUrl}
                alt={product.title}
                width={300}
                height={300}
                className="w-full h-64 object-cover rounded-md"
              />
              <h3 className="text-xl font-semibold mt-2">{product.title}</h3>
              <p className="text-lg font-bold text-blue-600">${product.price}</p>
              {product.priceWithoutDiscount && (
                <p className="text-sm line-through text-gray-500">
                  ${product.priceWithoutDiscount}
                </p>
              )}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
