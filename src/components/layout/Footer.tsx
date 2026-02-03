import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-border mt-20">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h4 className="text-micro mb-4">Shop</h4>
            <nav className="flex flex-col gap-2">
              <Link to="/shop" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                All Products
              </Link>
              <Link to="/shop?category=women" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Women
              </Link>
              <Link to="/shop?category=men" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Men
              </Link>
              <Link to="/shop?new=true" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                New Arrivals
              </Link>
            </nav>
          </div>
          
          <div>
            <h4 className="text-micro mb-4">Help</h4>
            <nav className="flex flex-col gap-2">
              <Link to="/help/shipping" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Shipping
              </Link>
              <Link to="/help/returns" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Returns
              </Link>
              <Link to="/help/sizing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Size Guide
              </Link>
              <Link to="/help/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Contact
              </Link>
            </nav>
          </div>

          <div>
            <h4 className="text-micro mb-4">About</h4>
            <nav className="flex flex-col gap-2">
              <Link to="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Our Story
              </Link>
              <Link to="/sustainability" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Sustainability
              </Link>
              <Link to="/careers" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Careers
              </Link>
            </nav>
          </div>

          <div>
            <h4 className="text-micro mb-4">Newsletter</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Be the first to know about new drops,
              <br />exclusive offers & sustainable stories.
            </p>
            <form className="flex border border-border">
              <input
                type="email"
                placeholder="Email"
                className="flex-1 px-3 py-2 text-sm bg-transparent outline-none"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-foreground text-background text-sm font-medium"
              >
                Join
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <span className="font-display text-xl font-medium tracking-tight">Ecoweft</span>
            <span className="text-xs text-muted-foreground">Sustainable Khadi</span>
          </div>
          <div className="flex items-center gap-6 text-xs text-muted-foreground">
            <Link to="/privacy" className="hover:text-foreground transition-colors">
              Privacy
            </Link>
            <Link to="/terms" className="hover:text-foreground transition-colors">
              Terms
            </Link>
            <span>© 2025 Ecoweft. All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
