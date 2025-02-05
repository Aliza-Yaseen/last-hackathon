import { client } from "@/sanity/lib/client";

export const fetchAllProducts = async () => {
  const query = `
    *[_type == "products"]{
      _id,
      title,
      "slug": slug.current,
      price,
      priceWithoutDiscount,
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

  const products = await client.fetch(query);
  return products;
};
