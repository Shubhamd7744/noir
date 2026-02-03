import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Filter, X, Loader2 } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/cart/CartDrawer";
import ProductCard from "@/components/product/ProductCard";
import { Button } from "@/components/ui/button";
import { useShopifyProducts } from "@/hooks/useShopifyProducts";
import { cn } from "@/lib/utils";
import PageTransition from "@/components/motion/PageTransition";
import { motion, useReducedMotion } from "framer-motion";

const sortOptions = [
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "title-asc", label: "A-Z" },
];

const ShopifyShop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filtersOpen, setFiltersOpen] = useState(false);
  const reduceMotion = useReducedMotion();
  
  const sortBy = searchParams.get("sort") || "newest";
  const searchQuery = searchParams.get("q") || "";

  const { data: products, isLoading, error } = useShopifyProducts(100);

  const filteredAndSortedProducts = useMemo(() => {
    if (!products) return [];
    
    let result = [...products];

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.node.title.toLowerCase().includes(query) ||
        p.node.description?.toLowerCase().includes(query) ||
        p.node.productType?.toLowerCase().includes(query) ||
        p.node.vendor?.toLowerCase().includes(query)
      );
    }

    // Apply sorting
    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => 
          parseFloat(a.node.priceRange.minVariantPrice.amount) - 
          parseFloat(b.node.priceRange.minVariantPrice.amount)
        );
        break;
      case "price-desc":
        result.sort((a, b) => 
          parseFloat(b.node.priceRange.minVariantPrice.amount) - 
          parseFloat(a.node.priceRange.minVariantPrice.amount)
        );
        break;
      case "title-asc":
        result.sort((a, b) => a.node.title.localeCompare(b.node.title));
        break;
      default:
        // newest - sort by createdAt
        result.sort((a, b) => 
          new Date(b.node.createdAt).getTime() - new Date(a.node.createdAt).getTime()
        );
        break;
    }

    return result;
  }, [products, sortBy, searchQuery]);

  // Get unique product types and vendors for filters
  const productTypes = useMemo(() => {
    if (!products) return [];
    const types = new Set(products.map(p => p.node.productType).filter(Boolean));
    return Array.from(types);
  }, [products]);

  const vendors = useMemo(() => {
    if (!products) return [];
    const v = new Set(products.map(p => p.node.vendor).filter(Boolean));
    return Array.from(v);
  }, [products]);

  const updateFilter = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (value === "" || value === "All") {
      newParams.delete(key);
    } else {
      newParams.set(key, value);
    }
    setSearchParams(newParams);
  };

  const clearFilters = () => {
    setSearchParams({});
  };

  const hasActiveFilters = searchQuery !== "";

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.04, delayChildren: 0.02 },
    },
  } as const;

  return (
    <PageTransition className="min-h-screen bg-background">
      <Header />
      <CartDrawer />

      <main className="pt-14 md:pt-16">
        {/* Page header */}
        <div className="container py-8 md:py-12">
          <h1 className="text-display-lg">Shop All</h1>
          <p className="text-muted-foreground mt-2">
            {isLoading ? (
              "Loading products..."
            ) : (
              `${filteredAndSortedProducts.length} ${filteredAndSortedProducts.length === 1 ? "product" : "products"}`
            )}
          </p>
        </div>

        {/* Filters bar */}
        <div className="container sticky top-14 md:top-16 z-30 bg-background border-b border-border py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setFiltersOpen(!filtersOpen)}
                className="gap-2"
              >
                <Filter className="w-4 h-4" />
                Filters
              </Button>

              {/* Active filters badges */}
              {hasActiveFilters && (
                <div className="hidden md:flex items-center gap-2">
                  {searchQuery && (
                    <span className="text-xs bg-secondary px-2 py-1 flex items-center gap-1">
                      "{searchQuery}"
                      <button onClick={() => updateFilter("q", "")}>
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}
                  <button
                    onClick={clearFilters}
                    className="text-xs text-muted-foreground hover:text-foreground"
                  >
                    Clear all
                  </button>
                </div>
              )}
            </div>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => updateFilter("sort", e.target.value)}
              className="text-sm bg-transparent border border-border px-3 py-2 outline-none"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Expandable filters */}
          <div
            className={cn(
              "overflow-hidden transition-all duration-300",
              filtersOpen ? "max-h-40 mt-6" : "max-h-0"
            )}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Search */}
              <div>
                <h4 className="text-micro mb-2">Search</h4>
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => updateFilter("q", e.target.value)}
                  className="w-full text-sm border border-border px-3 py-2 bg-transparent outline-none focus:border-foreground transition-colors"
                />
              </div>

              {/* Product Types */}
              {productTypes.length > 0 && (
                <div>
                  <h4 className="text-micro mb-2">Type</h4>
                  <div className="flex flex-wrap gap-2">
                    {productTypes.slice(0, 5).map((type) => (
                      <button
                        key={type}
                        onClick={() => updateFilter("q", type)}
                        className="text-xs px-3 py-1 border border-border hover:border-foreground transition-colors"
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Vendors */}
              {vendors.length > 0 && (
                <div>
                  <h4 className="text-micro mb-2">Brand</h4>
                  <div className="flex flex-wrap gap-2">
                    {vendors.slice(0, 5).map((vendor) => (
                      <button
                        key={vendor}
                        onClick={() => updateFilter("q", vendor)}
                        className="text-xs px-3 py-1 border border-border hover:border-foreground transition-colors"
                      >
                        {vendor}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Product grid */}
        <div className="container py-8">
          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {Array.from({ length: 8 }).map((_, idx) => (
                <div key={idx} className="space-y-3">
                  <div className="aspect-product skeleton-shimmer bg-muted" />
                  <div className="space-y-2">
                    <div className="h-4 w-3/4 skeleton-shimmer bg-muted rounded" />
                    <div className="h-3 w-1/2 skeleton-shimmer bg-muted rounded" />
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground">Failed to load products</p>
              <Button variant="outline" onClick={() => window.location.reload()} className="mt-4">
                Try Again
              </Button>
            </div>
          ) : filteredAndSortedProducts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground">No products found</p>
              {hasActiveFilters ? (
                <Button variant="outline" onClick={clearFilters} className="mt-4">
                  Clear Filters
                </Button>
              ) : (
                <p className="text-sm text-muted-foreground mt-2">
                  Add products to your store to see them here.
                </p>
              )}
            </div>
          ) : (
            reduceMotion ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {filteredAndSortedProducts.map((product, index) => (
                  <ProductCard key={product.node.id} product={product} index={index} />
                ))}
              </div>
            ) : (
              <motion.div
                className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {filteredAndSortedProducts.map((product, index) => (
                  <ProductCard key={product.node.id} product={product} index={index} />
                ))}
              </motion.div>
            )
          )}
        </div>
      </main>

      <Footer />
    </PageTransition>
  );
};

export default ShopifyShop;
