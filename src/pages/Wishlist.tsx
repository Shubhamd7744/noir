import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/cart/CartDrawer";
import PageTransition from "@/components/motion/PageTransition";
import ProductCard from "@/components/product/ProductCard";
import { Button } from "@/components/ui/button";
import { useWishlist } from "@/context/WishlistContext";
import { useShopifyProducts } from "@/hooks/useShopifyProducts";
import { Link } from "react-router-dom";

const Wishlist = () => {
  const { ids, clear } = useWishlist();
  const { data: products, isLoading } = useShopifyProducts(100);

  // Filter products that are in the wishlist
  const wishlistedProducts = products?.filter((p) => ids.includes(p.node.id)) || [];

  return (
    <PageTransition className="min-h-screen bg-background">
      <Header />
      <CartDrawer />

      <main className="pt-14 md:pt-16">
        <div className="container py-8 md:py-12">
          <div className="flex items-start justify-between gap-6">
            <div>
              <h1 className="text-display-lg">Wishlist</h1>
              <p className="text-muted-foreground mt-2">
                {ids.length} {ids.length === 1 ? "item" : "items"} saved
              </p>
            </div>
            {ids.length > 0 && (
              <Button variant="outline" onClick={clear}>
                Clear
              </Button>
            )}
          </div>
        </div>

        <div className="container pb-16">
          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {Array.from({ length: 4 }).map((_, idx) => (
                <div key={idx} className="space-y-3">
                  <div className="aspect-product skeleton-shimmer bg-muted" />
                  <div className="space-y-2">
                    <div className="h-4 w-3/4 skeleton-shimmer bg-muted rounded" />
                    <div className="h-3 w-1/2 skeleton-shimmer bg-muted rounded" />
                  </div>
                </div>
              ))}
            </div>
          ) : wishlistedProducts.length === 0 ? (
            <div className="border border-border p-8 md:p-12 text-center">
              <p className="text-muted-foreground">No favorites yet.</p>
              <Button asChild variant="cart" size="lg" className="mt-6">
                <Link to="/shop">Explore the collection</Link>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {wishlistedProducts.map((product, index) => (
                <ProductCard key={product.node.id} product={product} index={index} />
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </PageTransition>
  );
};

export default Wishlist;
