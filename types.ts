
// hero Section types
export interface HeroData {
    Smallheading: string;
    title: string;
    image: string;
  }
  
  // categories type
  export interface CategoryType {
      _id: string;
      title: string;
      imageUrl: string;
      products: number;
    }
  
  
  
  // companies logos
  export interface LogoType {
      title: string;
      logos: string;
      slug: {
        current: string;
      };
    }
    
  
  export interface ProductsType {
      _id: string;
      title: string;
      slug: {
        current: string;
      };
      price: number;
      price_id?: string;
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
    
  
    
    export interface IBlog {
      imageUrl: string;
      Category: string;
      date: string;
      tittle: string;
      slug: {
        current: string;
      };
      description: string;
    }


    // src/types/index.ts

export interface CartItem {
  id: string;      // Unique identifier for the cart item
  name: string;    // Name of the product
  price: number;   // Price of the product
  quantity: number; // Quantity of the item in the cart
  image: string;   // URL to the product image
}
