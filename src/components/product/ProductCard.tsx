import { Link } from "react-router-dom";
import { Product } from "@/types/product";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  index?: number;
}

const ProductCard = ({ product, index = 0 }: ProductCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <Link
      to={`/product/${product.id}`}
      className="group block"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="product-image-hover aspect-product bg-muted relative overflow-hidden">
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
    </Link>
  );
};

export default ProductCard;
