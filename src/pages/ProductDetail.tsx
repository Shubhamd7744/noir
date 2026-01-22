import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { ChevronLeft, Minus, Plus, Truck, RotateCcw, Shield } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/cart/CartDrawer";
import { Button } from "@/components/ui/button";
import { getProductById, products } from "@/data/products";
import { useCart } from "@/context/CartContext";
import ProductCard from "@/components/product/ProductCard";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import PageTransition from "@/components/motion/PageTransition";

const ProductDetail = () => {
  const { id } = useParams();
  const product = getProductById(id || "");
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!product) {
    return (
      <PageTransition className="min-h-screen flex items-center justify-center">
        <p>Product not found</p>
      </PageTransition>
    );
  }

  const handleAddToCart = () => {
    if (selectedSize) {
      addItem(product, selectedSize);
    }
  };

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <PageTransition className="min-h-screen bg-background">
      <Header />
      <CartDrawer />

      <main className="pt-14 md:pt-16">
        {/* Breadcrumb */}
        <div className="container py-4">
          <Link
            to="/shop"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Shop
          </Link>
        </div>

        <div className="container pb-12">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            {/* Images */}
            <div className="space-y-4">
              <div className="aspect-product bg-muted overflow-hidden">
                <img
                  src={product.images[currentImageIndex]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {product.images.length > 1 && (
                <div className="flex gap-2">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      className={cn(
                        "w-16 h-20 bg-muted overflow-hidden border-2 transition-colors",
                        currentImageIndex === idx
                          ? "border-foreground"
                          : "border-transparent"
                      )}
                    >
                      <img
                        src={img}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Details */}
            <div className="md:sticky md:top-24 md:self-start">
              <div className="space-y-6">
                {/* Title & Price */}
                <div>
                  {product.isNew && (
                    <span className="text-micro text-muted-foreground">New</span>
                  )}
                  <h1 className="text-display-md mt-1">{product.name}</h1>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="text-xl">${product.price}</span>
                    {product.originalPrice && (
                      <span className="text-xl text-muted-foreground line-through">
                        ${product.originalPrice}
                      </span>
                    )}
                  </div>
                </div>

                {/* Color */}
                <div>
                  <p className="text-sm">
                    <span className="text-muted-foreground">Color:</span>{" "}
                    {product.color}
                  </p>
                </div>

                {/* Size selector */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium">Select Size</span>
                    <button className="text-sm text-muted-foreground hover:text-foreground transition-colors underline">
                      Size Guide
                    </button>
                  </div>
                  <div className="grid grid-cols-5 gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size.name}
                        onClick={() => size.inStock && setSelectedSize(size.name)}
                        disabled={!size.inStock}
                        className={cn(
                          "size-option",
                          selectedSize === size.name && "selected",
                          !size.inStock && "out-of-stock"
                        )}
                      >
                        {size.name}
                      </button>
                    ))}
                  </div>
                  {product.mostBoughtSize && (
                    <p className="text-xs text-muted-foreground mt-2">
                      Most bought size: {product.mostBoughtSize}
                    </p>
                  )}
                </div>

                {/* Stock indicator */}
                {product.stock <= 10 && product.stock > 0 && (
                  <p className="scarcity-badge">Only {product.stock} left in stock</p>
                )}

                {/* Add to cart */}
                <Button
                  variant="cart"
                  size="full"
                  onClick={handleAddToCart}
                  disabled={!selectedSize}
                >
                  {selectedSize ? "Add to Bag" : "Select a Size"}
                </Button>

                {/* Trust signals */}
                <div className="grid grid-cols-3 gap-4 py-4 border-y border-border">
                  <div className="text-center">
                    <Truck className="w-5 h-5 mx-auto mb-1" />
                    <p className="text-xs text-muted-foreground">Free Shipping</p>
                  </div>
                  <div className="text-center">
                    <RotateCcw className="w-5 h-5 mx-auto mb-1" />
                    <p className="text-xs text-muted-foreground">Easy Returns</p>
                  </div>
                  <div className="text-center">
                    <Shield className="w-5 h-5 mx-auto mb-1" />
                    <p className="text-xs text-muted-foreground">Secure Payment</p>
                  </div>
                </div>

                {/* Accordion details */}
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="description">
                    <AccordionTrigger className="text-sm font-medium">
                      Description
                    </AccordionTrigger>
                    <AccordionContent className="text-sm text-muted-foreground">
                      {product.description}
                    </AccordionContent>
                  </AccordionItem>
                  {product.fabric && (
                    <AccordionItem value="fabric">
                      <AccordionTrigger className="text-sm font-medium">
                        Fabric & Fit
                      </AccordionTrigger>
                      <AccordionContent className="text-sm text-muted-foreground">
                        <p>
                          <strong>Fabric:</strong> {product.fabric}
                        </p>
                        {product.fit && (
                          <p className="mt-1">
                            <strong>Fit:</strong> {product.fit}
                          </p>
                        )}
                      </AccordionContent>
                    </AccordionItem>
                  )}
                  {product.care && (
                    <AccordionItem value="care">
                      <AccordionTrigger className="text-sm font-medium">
                        Care Instructions
                      </AccordionTrigger>
                      <AccordionContent className="text-sm text-muted-foreground">
                        <ul className="list-disc list-inside space-y-1">
                          {product.care.map((instruction, idx) => (
                            <li key={idx}>{instruction}</li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  )}
                </Accordion>
              </div>
            </div>
          </div>
        </div>

        {/* Related products */}
        {relatedProducts.length > 0 && (
          <section className="container py-12 border-t border-border">
            <h2 className="text-headline mb-8">You May Also Like</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {relatedProducts.map((p, idx) => (
                <ProductCard key={p.id} product={p} index={idx} />
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </PageTransition>
  );
};

export default ProductDetail;
