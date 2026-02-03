import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import categoryWomen from "@/assets/category-women.jpg";
import categoryMen from "@/assets/category-men.jpg";
const CategorySection = () => {
  return <section className="container py-12 md:py-20">
      <div className="grid md:grid-cols-2 gap-4 md:gap-6">
        <Link to="/shop?category=women" className="group relative aspect-[4/5] md:aspect-[3/4] overflow-hidden bg-muted">
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 to-transparent z-10 shadow-none rounded-none" />
          <img src={categoryWomen} alt="Women's collection" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
          <div className="absolute bottom-6 left-6 z-20">
            <h3 className="text-display-md text-background">Women</h3>
            <Button variant="minimal" className="mt-2 text-background after:bg-background">
              Shop Now
            </Button>
          </div>
        </Link>

        <Link to="/shop?category=men" className="group relative aspect-[4/5] md:aspect-[3/4] overflow-hidden bg-muted">
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 to-transparent z-10 rounded-none" />
          <img src={categoryMen} alt="Men's collection" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
          <div className="absolute bottom-6 left-6 z-20">
            <h3 className="text-display-md text-background">Men</h3>
            <Button variant="minimal" className="mt-2 text-background after:bg-background">
              Shop Now
            </Button>
          </div>
        </Link>
      </div>
    </section>;
};
export default CategorySection;