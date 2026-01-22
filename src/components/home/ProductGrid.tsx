import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import ProductCard from "@/components/product/ProductCard";
import { products } from "@/data/products";
import { motion, useReducedMotion } from "framer-motion";

interface ProductGridProps {
  title: string;
  subtitle?: string;
  filter?: "new" | "trending" | "all";
  limit?: number;
  showViewAll?: boolean;
  viewAllLink?: string;
}

const ProductGrid = ({
  title,
  subtitle,
  filter = "all",
  limit = 4,
  showViewAll = true,
  viewAllLink = "/shop",
}: ProductGridProps) => {
  const reduceMotion = useReducedMotion();

  const filteredProducts = products
    .filter((p) => {
      if (filter === "new") return p.isNew;
      if (filter === "trending") return p.isTrending;
      return true;
    })
    .slice(0, limit);

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.06, delayChildren: 0.04 },
    },
  } as const;

  return (
    <section className="container py-12 md:py-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          {subtitle && (
            <span className="text-micro text-muted-foreground">{subtitle}</span>
          )}
          <h2 className="text-display-md mt-1">{title}</h2>
        </div>
        {showViewAll && (
          <Link
            to={viewAllLink}
            className="group flex items-center gap-2 text-sm font-medium hover-underline"
          >
            View All
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        )}
      </div>

      {reduceMotion ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {filteredProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      ) : (
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {filteredProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </motion.div>
      )}
    </section>
  );
};

export default ProductGrid;
