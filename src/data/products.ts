import hoodieBlack from "@/assets/products/hoodie-black.jpg";
import teeCream from "@/assets/products/tee-cream.jpg";
import cargoOlive from "@/assets/products/cargo-olive.jpg";
import bomberBlack from "@/assets/products/bomber-black.jpg";
import sneakersWhite from "@/assets/products/sneakers-white.jpg";
import { Product } from "@/types/product";

export const products: Product[] = [
  {
    id: "1",
    name: "Essential Oversized Hoodie",
    price: 89,
    category: "Tops",
    subcategory: "Hoodies",
    color: "Black",
    sizes: [
      { name: "XS", inStock: true, quantity: 5 },
      { name: "S", inStock: true, quantity: 12 },
      { name: "M", inStock: true, quantity: 8 },
      { name: "L", inStock: true, quantity: 3 },
      { name: "XL", inStock: false, quantity: 0 },
    ],
    images: [hoodieBlack],
    description: "Premium heavyweight cotton hoodie with dropped shoulders and relaxed silhouette. Designed for everyday layering.",
    fabric: "100% Organic Cotton, 400gsm",
    fit: "Oversized",
    care: ["Machine wash cold", "Do not bleach", "Tumble dry low", "Iron on low heat"],
    isNew: true,
    isTrending: true,
    stock: 28,
    mostBoughtSize: "M",
  },
  {
    id: "2",
    name: "Relaxed Tee",
    price: 45,
    category: "Tops",
    subcategory: "T-Shirts",
    color: "Cream",
    sizes: [
      { name: "XS", inStock: true, quantity: 15 },
      { name: "S", inStock: true, quantity: 20 },
      { name: "M", inStock: true, quantity: 18 },
      { name: "L", inStock: true, quantity: 10 },
      { name: "XL", inStock: true, quantity: 8 },
    ],
    images: [teeCream],
    description: "Essential relaxed-fit tee in premium organic cotton. Clean lines, minimal branding.",
    fabric: "100% Organic Cotton, 180gsm",
    fit: "Relaxed",
    care: ["Machine wash cold", "Do not bleach", "Hang dry", "Iron on low heat"],
    isNew: true,
    stock: 71,
    mostBoughtSize: "M",
  },
  {
    id: "3",
    name: "Utility Cargo Pant",
    price: 125,
    category: "Bottoms",
    subcategory: "Pants",
    color: "Olive",
    sizes: [
      { name: "28", inStock: true, quantity: 6 },
      { name: "30", inStock: true, quantity: 10 },
      { name: "32", inStock: true, quantity: 12 },
      { name: "34", inStock: true, quantity: 8 },
      { name: "36", inStock: true, quantity: 4 },
    ],
    images: [cargoOlive],
    description: "Technical cargo pant with articulated knee construction and adjustable cuffs. Built for movement.",
    fabric: "98% Cotton, 2% Elastane",
    fit: "Regular Tapered",
    care: ["Machine wash cold", "Do not bleach", "Tumble dry low"],
    isTrending: true,
    stock: 40,
    mostBoughtSize: "32",
  },
  {
    id: "4",
    name: "MA-1 Bomber Jacket",
    price: 195,
    originalPrice: 245,
    category: "Outerwear",
    subcategory: "Jackets",
    color: "Black",
    sizes: [
      { name: "S", inStock: true, quantity: 4 },
      { name: "M", inStock: true, quantity: 2 },
      { name: "L", inStock: true, quantity: 5 },
      { name: "XL", inStock: false, quantity: 0 },
    ],
    images: [bomberBlack],
    description: "Classic MA-1 silhouette reimagined in premium water-resistant nylon. Quilted lining for warmth.",
    fabric: "100% Nylon, Quilted Polyester Lining",
    fit: "Regular",
    care: ["Dry clean only"],
    isNew: true,
    stock: 11,
    mostBoughtSize: "M",
  },
  {
    id: "5",
    name: "Volume Sneaker",
    price: 165,
    category: "Footwear",
    subcategory: "Sneakers",
    color: "White",
    sizes: [
      { name: "40", inStock: true, quantity: 6 },
      { name: "41", inStock: true, quantity: 8 },
      { name: "42", inStock: true, quantity: 10 },
      { name: "43", inStock: true, quantity: 7 },
      { name: "44", inStock: true, quantity: 5 },
      { name: "45", inStock: true, quantity: 3 },
    ],
    images: [sneakersWhite],
    description: "Chunky sole sneaker with premium leather upper. Minimal design, maximum comfort.",
    fabric: "Premium Leather Upper, Rubber Sole",
    fit: "True to Size",
    care: ["Wipe clean with damp cloth", "Use leather conditioner"],
    isTrending: true,
    stock: 39,
    mostBoughtSize: "42",
  },
];

export const getProductById = (id: string): Product | undefined => {
  return products.find((p) => p.id === id);
};

export const getNewProducts = (): Product[] => {
  return products.filter((p) => p.isNew);
};

export const getTrendingProducts = (): Product[] => {
  return products.filter((p) => p.isTrending);
};
