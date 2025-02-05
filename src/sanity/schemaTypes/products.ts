
// import { defineType } from "sanity";

// export const productSchema = defineType({
//   name: "products",
//   title: "Products",
//   type: "document",
//   fields: [
//     {
//       name: "title",
//       title: "Product Title",
//       type: "string",
//       validation: (Rule) => Rule.required(),
//     },
//     {
//       name: "slug",
//       title: "Slug",
//       type: "slug",
//       options: {
//         source: "title", // Generates slug from title
//         maxLength: 200,
//       },
//       validation: (Rule) => Rule.required(),
//     },
//     {
//       name: "price",
//       title: "Price",
//       type: "number",
//       validation: (Rule) => Rule.required().min(0),
//     },
//     {
//       title: "Price without Discount",
//       name: "priceWithoutDiscount",
//       type: "number",
//     },
//     {
//       name: "badge",
//       title: "Badge",
//       type: "string",
//     },
//     {
//       name: "image",
//       title: "Product Image",
//       type: "image",
//       options: { hotspot: true },
//       validation: (Rule) => Rule.required(),
//     },
//     {
//       name: "category",
//       title: "Category",
//       type: "reference",
//       to: [{ type: "categories" }],
//       validation: (Rule) => Rule.required(),
//     },
//     {
//       name: "description",
//       title: "Product Description",
//       type: "text",
//     },
//     {
//       name: "inventory",
//       title: "Inventory Management",
//       type: "number",
//       validation: (Rule) => Rule.required().min(0),
//     },
//     {
//       name: "tags",
//       title: "Tags",
//       type: "array",
//       of: [{ type: "string" }],
//       options: {
//         list: [
//           { title: "Featured", value: "featured" },
//           { title: "Follow products and discounts on Instagram", value: "instagram" },
//           { title: "Gallery", value: "gallery" },
//           { name: 'stripePriceId', title: 'Stripe Price ID', type: 'string' }, // Store Stripe price ID
//         ],
//       },
//     },
//   ],
// });


import { defineType } from "sanity";

export const productSchema = defineType({
  name: "products",
  title: "Products",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Product Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title", // Generates slug from title
        maxLength: 200,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "price",
      title: "Price",
      type: "number",
      validation: (Rule) => Rule.required().min(0),
    },
    {
      title: "Price without Discount",
      name: "priceWithoutDiscount",
      type: "number",
    },
    {
      name: "badge",
      title: "Badge",
      type: "string",
    },
    {
      name: "image",
      title: "Product Image",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "categories" }],
      validation: (Rule) => Rule.required(),
    },
    {
      name: "description",
      title: "Product Description",
      type: "text",
    },
    {
      name: "inventory",
      title: "Inventory Management",
      type: "number",
      validation: (Rule) => Rule.required().min(0),
    },
    {
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Featured", value: "featured" },
          { title: "Follow products and discounts on Instagram", value: "instagram" },
          { title: "Gallery", value: "gallery" },
        ],
      },
    },
    {
      name: "stripePriceId",
      title: "Stripe Price ID",
      type: "string", // This was incorrectly inside tags, now fixed
    },
  ],
});
