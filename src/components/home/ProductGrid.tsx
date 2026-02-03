import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import ProductCard from "@/components/product/ProductCard";
import { useShopifyProducts } from "@/hooks/useShopifyProducts";
import { motion, useReducedMotion } from "framer-motion";
interface ProductGridProps {
  title: string;
  subtitle?: string;
  limit?: number;
  showViewAll?: boolean;
  viewAllLink?: string;
  searchQuery?: string;
}
const ProductGrid = ({
  title,
  subtitle,
  limit = 4,
  showViewAll = true,
  viewAllLink = "/shop",
  searchQuery
}: ProductGridProps) => {
  const reduceMotion = useReducedMotion();
  const {
    data: products,
    isLoading,
    error
  } = useShopifyProducts(limit, searchQuery);
  const containerVariants = {
    hidden: {
      opacity: 1
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06,
        delayChildren: 0.04
      }
    }
  } as const;
  return <section className="container py-12 md:py-20 text-stone-600">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          {subtitle && <span className="text-micro text-muted-foreground">{subtitle}</span>}
          <h2 className="text-display-md mt-1">{title}</h2>
        </div>
        {showViewAll && <Link to={viewAllLink} className="group flex items-center gap-2 text-sm font-medium hover-underline">
            View All
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>}
      </div>

      {isLoading ? <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {Array.from({
        length: limit
      }).map((_, idx) => <div key={idx} className="space-y-3">
              <div className="aspect-product skeleton-shimmer bg-muted" />
              <div className="space-y-2">
                <div className="h-4 w-3/4 skeleton-shimmer bg-muted rounded" />
                <div className="h-3 w-1/2 skeleton-shimmer bg-muted rounded" />
              </div>
            </div>)}
        </div> : error ? <div className="text-center py-20">
          <p className="text-muted-foreground">Failed to load products</p>
        </div> : !products || products.length === 0 ? <div className="text-center py-20">
          <p className="text-muted-foreground">No products found</p>
          <p className="text-sm text-muted-foreground mt-2">
            Add products to your store to see them here.
          </p>
        </div> : reduceMotion ? <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {products.map((product, index) => <ProductCard key={product.node.id} product={product} index={index} />)}
          </div> : <motion.div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{
      once: true,
      amount: 0.2
    }}>
            {products.map((product, index) => <ProductCard key={product.node.id} product={product} index={index} />)}
          </motion.div>}
    </section>;
};
export default ProductGrid;