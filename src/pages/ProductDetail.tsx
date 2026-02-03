import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { ChevronLeft, Truck, RotateCcw, Shield, Loader2, ShoppingBag } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/cart/CartDrawer";
import { Button } from "@/components/ui/button";
import { useShopifyProduct, useShopifyProducts } from "@/hooks/useShopifyProducts";
import { useCartStore } from "@/stores/cartStore";
import ProductCard from "@/components/product/ProductCard";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import PageTransition from "@/components/motion/PageTransition";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { toast } from "sonner";

const ShopifyProductDetail = () => {
  const { handle } = useParams();
  const { data: product, isLoading: productLoading, error } = useShopifyProduct(handle);
  const { data: relatedProducts } = useShopifyProducts(4);
  const { addItem, isLoading: cartLoading } = useCartStore();
  
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [mainImageLoaded, setMainImageLoaded] = useState(false);
  const reduceMotion = useReducedMotion();

  // Reset image loading state when image changes
  const handleImageChange = (index: number) => {
    setMainImageLoaded(false);
    setCurrentImageIndex(index);
  };

  if (productLoading) {
    return (
      <PageTransition className="min-h-screen bg-background">
        <Header />
        <CartDrawer />
        <main className="pt-14 md:pt-16">
          <div className="container py-8">
            <div className="grid md:grid-cols-2 gap-8 md:gap-12">
              <div className="aspect-product skeleton-shimmer bg-muted" />
              <div className="space-y-6">
                <div className="h-8 w-3/4 skeleton-shimmer bg-muted rounded" />
                <div className="h-6 w-1/4 skeleton-shimmer bg-muted rounded" />
                <div className="h-32 skeleton-shimmer bg-muted rounded" />
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </PageTransition>
    );
  }

  if (error || !product) {
    return (
      <PageTransition className="min-h-screen bg-background flex items-center justify-center">
        <Header />
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Product not found</p>
          <Button variant="outline" asChild>
            <Link to="/shop">Back to Shop</Link>
          </Button>
        </div>
        <Footer />
      </PageTransition>
    );
  }

  const images = product.images.edges;
  const variants = product.variants.edges;
  const options = product.options;
  const currentImage = images[currentImageIndex]?.node;
  
  const selectedVariantData = selectedVariant 
    ? variants.find(v => v.node.id === selectedVariant)?.node
    : variants[0]?.node;

  const handleAddToCart = async () => {
    if (!selectedVariantData) {
      toast.error("Please select options");
      return;
    }

    await addItem({
      product: { node: product },
      variantId: selectedVariantData.id,
      variantTitle: selectedVariantData.title,
      price: selectedVariantData.price,
      quantity: 1,
      selectedOptions: selectedVariantData.selectedOptions || [],
    });

    toast.success("Added to bag", {
      description: product.title,
    });
  };

  const filteredRelated = relatedProducts?.filter(p => p.node.handle !== handle).slice(0, 4) || [];

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
              <div className="aspect-product bg-muted overflow-hidden relative">
                {!mainImageLoaded && (
                  <motion.div
                    className="absolute inset-0 skeleton-shimmer"
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 1 }}
                  />
                )}
                {currentImage ? (
                  reduceMotion ? (
                    <img
                      src={currentImage.url}
                      alt={currentImage.altText || product.title}
                      className={cn(
                        "w-full h-full object-cover transition-opacity duration-500",
                        mainImageLoaded ? "opacity-100" : "opacity-0"
                      )}
                      onLoad={() => setMainImageLoaded(true)}
                    />
                  ) : (
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.img
                        key={currentImage.url}
                        src={currentImage.url}
                        alt={currentImage.altText || product.title}
                        className="w-full h-full object-cover"
                        initial={{ opacity: 0, scale: 1.01 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                        onLoad={() => setMainImageLoaded(true)}
                      />
                    </AnimatePresence>
                  )
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                    No Image
                  </div>
                )}
              </div>
              
              {images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {images.map((img, idx) => (
                    <motion.button
                      key={idx}
                      onClick={() => handleImageChange(idx)}
                      className={cn(
                        "w-16 h-20 bg-muted overflow-hidden border-2 transition-colors flex-shrink-0",
                        currentImageIndex === idx
                          ? "border-foreground"
                          : "border-transparent"
                      )}
                      whileHover={reduceMotion ? undefined : { scale: 1.03 }}
                      whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                    >
                      <img
                        src={img.node.url}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </motion.button>
                  ))}
                </div>
              )}
            </div>

            {/* Details */}
            <div className="md:sticky md:top-24 md:self-start">
              <div className="space-y-6">
                {/* Title & Price */}
                <div>
                  {product.tags?.includes('new') && (
                    <span className="text-micro text-muted-foreground">New</span>
                  )}
                  <h1 className="text-display-md mt-1">{product.title}</h1>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="text-xl">
                      {selectedVariantData?.price.currencyCode} {parseFloat(selectedVariantData?.price.amount || '0').toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Vendor */}
                {product.vendor && (
                  <div>
                    <p className="text-sm">
                      <span className="text-muted-foreground">By:</span>{" "}
                      {product.vendor}
                    </p>
                  </div>
                )}

                {/* Variant selector */}
                {options.length > 0 && options[0].name !== 'Title' && (
                  <div className="space-y-4">
                    {options.map((option) => (
                      <div key={option.name}>
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-sm font-medium">Select {option.name}</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {option.values.map((value) => {
                            // Find variant with this option value
                            const variantWithOption = variants.find(v => 
                              v.node.selectedOptions?.some(opt => 
                                opt.name === option.name && opt.value === value
                              )
                            );
                            const isAvailable = variantWithOption?.node.availableForSale;
                            const isSelected = selectedVariantData?.selectedOptions?.some(
                              opt => opt.name === option.name && opt.value === value
                            );

                            return (
                              <motion.button
                                key={value}
                                onClick={() => {
                                  if (variantWithOption && isAvailable) {
                                    setSelectedVariant(variantWithOption.node.id);
                                  }
                                }}
                                disabled={!isAvailable}
                                className={cn(
                                  "size-option",
                                  isSelected && "selected",
                                  !isAvailable && "out-of-stock"
                                )}
                                whileHover={
                                  reduceMotion || !isAvailable
                                    ? undefined
                                    : { scale: 1.03, y: -1 }
                                }
                                whileTap={
                                  reduceMotion || !isAvailable
                                    ? undefined
                                    : { scale: 0.98 }
                                }
                              >
                                {value}
                              </motion.button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Availability */}
                {!selectedVariantData?.availableForSale && (
                  <p className="text-destructive text-sm font-medium">Currently out of stock</p>
                )}

                {/* Add to cart */}
                <Button
                  variant="cart"
                  size="full"
                  onClick={handleAddToCart}
                  disabled={!selectedVariantData?.availableForSale || cartLoading}
                >
                  {cartLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4 mr-2" />
                      {selectedVariantData?.availableForSale ? "Add to Bag" : "Out of Stock"}
                    </>
                  )}
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
                      {product.description || "No description available."}
                    </AccordionContent>
                  </AccordionItem>
                  {product.productType && (
                    <AccordionItem value="details">
                      <AccordionTrigger className="text-sm font-medium">
                        Product Details
                      </AccordionTrigger>
                      <AccordionContent className="text-sm text-muted-foreground">
                        <p><strong>Type:</strong> {product.productType}</p>
                        {product.vendor && <p className="mt-1"><strong>Vendor:</strong> {product.vendor}</p>}
                        {product.tags?.length > 0 && (
                          <p className="mt-1"><strong>Tags:</strong> {product.tags.join(', ')}</p>
                        )}
                      </AccordionContent>
                    </AccordionItem>
                  )}
                </Accordion>
              </div>
            </div>
          </div>
        </div>

        {/* Related products */}
        {filteredRelated.length > 0 && (
          <section className="container py-12 border-t border-border">
            <h2 className="text-headline mb-8">You May Also Like</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {filteredRelated.map((p, idx) => (
                <ProductCard key={p.node.id} product={p} index={idx} />
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </PageTransition>
  );
};

export default ShopifyProductDetail;
