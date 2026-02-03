import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/cart/CartDrawer";
import HeroSection from "@/components/home/HeroSection";
import ProductGrid from "@/components/home/ProductGrid";
import CategorySection from "@/components/home/CategorySection";
import PageTransition from "@/components/motion/PageTransition";
import { useCartSync } from "@/hooks/useCartSync";

const Index = () => {
  // Sync cart with Shopify when user returns from checkout
  useCartSync();

  return (
    <PageTransition className="min-h-screen bg-background">
      <Header />
      <CartDrawer />

      <main>
        <HeroSection />

        <ProductGrid
          title="New Arrivals"
          subtitle="Just Dropped"
          limit={4}
          viewAllLink="/shop"
        />

        <CategorySection />

        <ProductGrid
          title="Featured Collection"
          subtitle="Editor's Picks"
          limit={4}
          viewAllLink="/shop"
        />

        {/* Editorial strip - brand story */}
        <section className="py-16 md:py-24 bg-secondary">
          <div className="container text-center max-w-2xl mx-auto">
            <span className="text-micro text-sage tracking-[0.2em]">The Philosophy</span>
            <h2 className="font-display text-display-md mt-4 italic">
              Slow fashion,
              <br />
              lasting comfort.
            </h2>
            <p className="text-body-lg text-muted-foreground mt-6 leading-relaxed">
              Every piece is handwoven by artisan communities, using traditional 
              khadi techniques. Better for you, better for the planet—no shortcuts, 
              no compromise.
            </p>
          </div>
        </section>

        <ProductGrid
          title="Shop All"
          limit={8}
          showViewAll={true}
          viewAllLink="/shop"
        />
      </main>

      <Footer />
    </PageTransition>
  );
};

export default Index;
