import { Link } from "react-router-dom";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "framer-motion";
import { Heart, ShoppingBag, Loader2 } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";
import { ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";
interface ProductCardProps {
  product: ShopifyProduct;
  index?: number;
}
const ProductCard = ({
  product,
  index = 0
}: ProductCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const reduceMotion = useReducedMotion();
  const {
    isWishlisted,
    toggle
  } = useWishlist();
  const {
    addItem,
    isLoading
  } = useCartStore();
  const productNode = product.node;
  const wishlisted = isWishlisted(productNode.id);
  const firstImage = productNode.images.edges[0]?.node;
  const price = productNode.priceRange.minVariantPrice;
  const firstVariant = productNode.variants.edges[0]?.node;
  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 12
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.38,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  } as const;
  const handleQuickAdd = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!firstVariant) {
      toast.error("No variants available");
      return;
    }
    await addItem({
      product,
      variantId: firstVariant.id,
      variantTitle: firstVariant.title,
      price: firstVariant.price,
      quantity: 1,
      selectedOptions: firstVariant.selectedOptions || []
    });
    toast.success("Added to bag", {
      description: productNode.title
    });
  };
  const MotionLink = motion(Link);
  return <MotionLink to={`/product/${productNode.handle}`} className="group block" variants={reduceMotion ? undefined : itemVariants} initial={reduceMotion ? undefined : "hidden"} animate={reduceMotion ? undefined : "visible"} whileHover={reduceMotion ? undefined : {
    y: -2
  }} whileTap={reduceMotion ? undefined : {
    scale: 0.99
  }}>
      <div className="product-image-hover aspect-product bg-muted relative overflow-hidden">
        {/* Wishlist toggle */}
        <motion.button type="button" aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"} onClick={e => {
        e.preventDefault();
        e.stopPropagation();
        toggle(productNode.id);
      }} className={cn("absolute top-3 right-3 z-20 p-2 border border-border bg-background/80 backdrop-blur-sm transition-colors hover:bg-background px-[6px] py-[6px] rounded-full shadow-none")} whileHover={reduceMotion ? undefined : {
        scale: 1.06
      }} whileTap={reduceMotion ? undefined : {
        scale: 0.96
      }}>
          <Heart className={cn("text-foreground h-[15px] w-[14px] border-0 border-none", wishlisted && "fill-current")} />
        </motion.button>

        {/* Skeleton */}
        {!imageLoaded && <motion.div className="absolute inset-0 skeleton-shimmer" initial={{
        opacity: 1
      }} animate={{
        opacity: 1
      }} />}

        {firstImage ? reduceMotion ? <img src={firstImage.url} alt={firstImage.altText || productNode.title} className={cn("w-full h-full object-cover transition-opacity duration-500 rounded-xl shadow-none", imageLoaded ? "opacity-100" : "opacity-0")} onLoad={() => setImageLoaded(true)} loading="lazy" /> : <motion.img src={firstImage.url} alt={firstImage.altText || productNode.title} className="w-full h-full object-cover" initial={{
        opacity: 0,
        scale: 1.01
      }} animate={{
        opacity: imageLoaded ? 1 : 0,
        scale: imageLoaded ? 1 : 1.01
      }} transition={{
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1]
      }} onLoad={() => setImageLoaded(true)} loading="lazy" /> : <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            No Image
          </div>}

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1">
          {productNode.tags?.includes('new') && <span className="text-micro text-xs font-thin my-0 mx-0 py-[2px] px-[5px] text-right font-mono bg-white/[0.54]">New</span>}
          {productNode.tags?.includes('sale') && <span className="text-micro bg-foreground text-background px-2 py-1">
              Sale
            </span>}
        </div>

        {/* Quick add button on hover */}
        <div className="absolute bottom-0 left-0 right-0 bg-background/90 backdrop-blur-sm p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 hidden md:block">
          <button onClick={handleQuickAdd} disabled={isLoading || !firstVariant?.availableForSale} className="w-full text-xs text-center flex items-center justify-center gap-2 disabled:opacity-50">
            {isLoading ? <Loader2 className="w-3 h-3 animate-spin" /> : <>
                <ShoppingBag className="w-3 h-3" />
                {firstVariant?.availableForSale ? 'Quick Add' : 'Out of Stock'}
              </>}
          </button>
        </div>
      </div>

      <div className="mt-3 space-y-1">
        <h3 className="text-sm font-medium truncate">{productNode.title}</h3>
        <div className="flex items-center gap-2">
          <span className="text-sm">
            {price.currencyCode} {parseFloat(price.amount).toFixed(2)}
          </span>
        </div>
        {productNode.productType && <p className="text-xs text-muted-foreground">{productNode.productType}</p>}

        {/* Sold out indicator */}
        {!firstVariant?.availableForSale && <p className="text-xs text-destructive">Sold Out</p>}
      </div>
    </MotionLink>;
};
export default ProductCard;