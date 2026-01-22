import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Filter, X } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/cart/CartDrawer";
import ProductCard from "@/components/product/ProductCard";
import { Button } from "@/components/ui/button";
import { products } from "@/data/products";
import { cn } from "@/lib/utils";
import PageTransition from "@/components/motion/PageTransition";

const categories = ["All", "Tops", "Bottoms", "Outerwear", "Footwear"];
const colors = ["All", "Black", "Cream", "Olive", "White"];
const sortOptions = [
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
];

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filtersOpen, setFiltersOpen] = useState(false);
  
  const selectedCategory = searchParams.get("category") || "All";
  const selectedColor = searchParams.get("color") || "All";
  const sortBy = searchParams.get("sort") || "newest";
  const showNew = searchParams.get("new") === "true";
  const showTrending = searchParams.get("trending") === "true";

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Apply filters
    if (selectedCategory !== "All") {
      result = result.filter((p) => p.category === selectedCategory);
    }
    if (selectedColor !== "All") {
      result = result.filter((p) => p.color === selectedColor);
    }
    if (showNew) {
      result = result.filter((p) => p.isNew);
    }
    if (showTrending) {
      result = result.filter((p) => p.isTrending);
    }

    // Apply sorting
    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      default:
        // newest - already sorted by default
        break;
    }

    return result;
  }, [selectedCategory, selectedColor, sortBy, showNew, showTrending]);

  const updateFilter = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (value === "All" || value === "") {
      newParams.delete(key);
    } else {
      newParams.set(key, value);
    }
    setSearchParams(newParams);
  };

  const clearFilters = () => {
    setSearchParams({});
  };

  const hasActiveFilters =
    selectedCategory !== "All" ||
    selectedColor !== "All" ||
    showNew ||
    showTrending;

  return (
    <PageTransition className="min-h-screen bg-background">
      <Header />
      <CartDrawer />

      <main className="pt-14 md:pt-16">
        {/* Page header */}
        <div className="container py-8 md:py-12">
          <h1 className="text-display-lg">
            {showNew ? "New Arrivals" : showTrending ? "Trending" : "All Products"}
          </h1>
          <p className="text-muted-foreground mt-2">
            {filteredProducts.length} {filteredProducts.length === 1 ? "product" : "products"}
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
                  {selectedCategory !== "All" && (
                    <span className="text-xs bg-secondary px-2 py-1 flex items-center gap-1">
                      {selectedCategory}
                      <button onClick={() => updateFilter("category", "All")}>
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}
                  {selectedColor !== "All" && (
                    <span className="text-xs bg-secondary px-2 py-1 flex items-center gap-1">
                      {selectedColor}
                      <button onClick={() => updateFilter("color", "All")}>
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
              "grid grid-cols-2 md:grid-cols-4 gap-6 overflow-hidden transition-all duration-300",
              filtersOpen ? "max-h-40 mt-6" : "max-h-0"
            )}
          >
            <div>
              <h4 className="text-micro mb-2">Category</h4>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => updateFilter("category", cat)}
                    className={cn(
                      "text-sm px-3 py-1 border transition-colors",
                      selectedCategory === cat
                        ? "border-foreground bg-foreground text-background"
                        : "border-border hover:border-foreground"
                    )}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-micro mb-2">Color</h4>
              <div className="flex flex-wrap gap-2">
                {colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => updateFilter("color", color)}
                    className={cn(
                      "text-sm px-3 py-1 border transition-colors",
                      selectedColor === color
                        ? "border-foreground bg-foreground text-background"
                        : "border-border hover:border-foreground"
                    )}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Product grid */}
        <div className="container py-8">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground">No products found</p>
              <Button variant="outline" onClick={clearFilters} className="mt-4">
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {filteredProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </PageTransition>
  );
};

export default Shop;
