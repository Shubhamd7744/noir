import { Link } from "react-router-dom";
import { Product } from "@/types/product";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "framer-motion";
import { Heart } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";

interface ProductCardProps {
  product: Product;
  index?: number;
}

const ProductCard = ({ product, index = 0 }: ProductCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const reduceMotion = useReducedMotion();
  const { isWishlisted, toggle } = useWishlist();

  const wishlisted = isWishlisted(product.id);

  const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.38, ease: [0.22, 1, 0.36, 1] },
    },
  } as const;

  const MotionLink = motion(Link);

  return (
    <MotionLink
      to={`/product/${product.id}`}
      className="group block"
      variants={reduceMotion ? undefined : itemVariants}
      initial={reduceMotion ? undefined : "hidden"}
      animate={reduceMotion ? undefined : "visible"}
      whileHover={reduceMotion ? undefined : { y: -2 }}
      whileTap={reduceMotion ? undefined : { scale: 0.99 }}
    >
      <div className="product-image-hover aspect-product bg-muted relative overflow-hidden">
        {/* Wishlist toggle */}
        <motion.button
          type="button"
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggle(product.id);
          }}
          className={cn(
            "absolute top-3 right-3 z-20 p-2 border border-border bg-background/80 backdrop-blur-sm transition-colors",
            "hover:bg-background"
          )}
          whileHover={reduceMotion ? undefined : { scale: 1.06 }}
          whileTap={reduceMotion ? undefined : { scale: 0.96 }}
        >
          <Heart
            className={cn(
              "w-4 h-4 text-foreground",
              wishlisted && "fill-current"
            )}
          />
        </motion.button>

        <img
          src={product.images[0]}
          alt={product.name}
          className={cn(
            "w-full h-full object-cover transition-all duration-500",
            imageLoaded ? "opacity-100" : "opacity-0"
          )}
          onLoad={() => setImageLoaded(true)}
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1">
          {product.isNew && (
            <span className="text-micro bg-background px-2 py-1">New</span>
          )}
          {product.originalPrice && (
            <span className="text-micro bg-foreground text-background px-2 py-1">
              Sale
            </span>
          )}
        </div>

        {/* Quick add hint on hover */}
        <div className="absolute bottom-0 left-0 right-0 bg-background/90 backdrop-blur-sm p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 hidden md:block">
          <p className="text-xs text-center">Quick Add +</p>
        </div>
      </div>

      <div className="mt-3 space-y-1">
        <h3 className="text-sm font-medium truncate">{product.name}</h3>
        <div className="flex items-center gap-2">
          <span className="text-sm">${product.price}</span>
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              ${product.originalPrice}
            </span>
          )}
        </div>
        <p className="text-xs text-muted-foreground">{product.color}</p>
        
        {/* Low stock indicator */}
        {product.stock <= 10 && product.stock > 0 && (
          <p className="scarcity-badge">Only {product.stock} left</p>
        )}
      </div>
    </MotionLink>
  );
};

export default ProductCard;
