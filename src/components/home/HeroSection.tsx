import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroDrop from "@/assets/hero-drop.jpg";

const HeroSection = () => {
  return (
    <section className="relative h-screen min-h-[600px] max-h-[900px] flex items-end">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={heroDrop}
          alt="Drop 001 Collection"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-foreground/20 to-transparent" />
      </div>

      {/* Content */}
      <div className="container relative z-10 pb-16 md:pb-24">
        <div className="max-w-xl stagger-children">
          <span className="text-micro text-background/80">Drop 001</span>
          <h1 className="text-display-xl text-background mt-2">
            Silent
            <br />
            Motion
          </h1>
          <p className="text-body-lg text-background/80 mt-4 max-w-md">
            Elevated essentials for the modern uniform. Designed for movement, built to last.
          </p>
          <div className="flex flex-wrap gap-3 mt-8">
            <Button variant="hero" size="lg" asChild>
              <Link to="/shop">
                Shop Collection
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-background/50 text-background hover:bg-background hover:text-foreground"
              asChild
            >
              <Link to="/lookbook">View Lookbook</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
