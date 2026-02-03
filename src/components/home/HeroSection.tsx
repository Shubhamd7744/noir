import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroKhadi from "@/assets/hero-khadi.jpg";
const HeroSection = () => {
  return <section className="relative min-h-[85vh] flex items-center bg-khadi">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center py-20 lg:py-0">
          {/* Content */}
          <div className="order-2 lg:order-1 stagger-children">
            <span className="text-micro text-sage tracking-[0.2em]">Sustainable Essentials</span>
            <h1 className="font-display text-display-xl mt-4">
              Woven with
              <br />
              <span className="italic">intention</span>
            </h1>
            <p className="text-body-lg text-muted-foreground mt-6 max-w-md leading-relaxed">
              Premium khadi fabric meets modern design. Handcrafted essentials 
              that feel as good as they look—built for comfort, made to last.
            </p>
            <div className="flex flex-wrap gap-4 mt-10">
              <Button variant="default" size="lg" asChild className="rounded-sm">
                <Link to="/shop">
                  Shop Collection
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="rounded-sm" asChild>
                <Link to="/about">Our Story</Link>
              </Button>
            </div>
            
            {/* Trust badges */}
            <div className="flex flex-wrap gap-6 mt-12 pt-8 border-t border-border">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="w-2 h-2 rounded-full bg-sage" />
                100% Natural Khadi
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="w-2 h-2 rounded-full bg-sage" />
                Ethically Made
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="w-2 h-2 rounded-full bg-sage" />
                Free Returns
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="order-1 lg:order-2 aspect-[3/4] max-h-[70vh] overflow-hidden">
            <img src={heroKhadi} alt="Model wearing premium khadi clothing" className="w-full h-full object-cover rounded-2xl" />
          </div>
        </div>
      </div>
    </section>;
};
export default HeroSection;