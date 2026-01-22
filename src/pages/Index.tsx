import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/cart/CartDrawer";
import HeroSection from "@/components/home/HeroSection";
import ProductGrid from "@/components/home/ProductGrid";
import CategorySection from "@/components/home/CategorySection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <CartDrawer />
      
      <main>
        <HeroSection />
        
        <ProductGrid
          title="New Arrivals"
          subtitle="Just Dropped"
          filter="new"
          limit={4}
          viewAllLink="/shop?new=true"
        />

        <CategorySection />

        <ProductGrid
          title="Trending Now"
          subtitle="Most Wanted"
          filter="trending"
          limit={4}
          viewAllLink="/shop?trending=true"
        />

        {/* Editorial strip */}
        <section className="py-16 md:py-24 bg-secondary">
          <div className="container text-center max-w-2xl mx-auto">
            <span className="text-micro text-muted-foreground">The Approach</span>
            <h2 className="text-display-md mt-2">
              Less noise.
              <br />
              More intention.
            </h2>
            <p className="text-body-lg text-muted-foreground mt-4">
              Every piece is designed to work harder, last longer, and look better with age. No fast fashion, no disposable trends.
            </p>
          </div>
        </section>

        <ProductGrid
          title="Shop All"
          filter="all"
          limit={8}
          showViewAll={true}
          viewAllLink="/shop"
        />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
