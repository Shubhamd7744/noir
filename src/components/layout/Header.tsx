import { Link } from "react-router-dom";
import { Heart, Menu, Search, ShoppingBag, X, User } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { cn } from "@/lib/utils";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { totalItems, openCart } = useCart();
  const { total: wishlistTotal } = useWishlist();

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container flex items-center justify-between h-14 md:h-16">
          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 -ml-2"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              to="/shop?category=women"
              className="text-caption hover-underline"
            >
              Women
            </Link>
            <Link
              to="/shop?category=men"
              className="text-caption hover-underline"
            >
              Men
            </Link>
            <Link to="/shop" className="text-caption hover-underline">
              All
            </Link>
          </nav>

          {/* Logo */}
          <Link
            to="/"
            className="absolute left-1/2 -translate-x-1/2 text-xl md:text-2xl font-medium tracking-tight"
          >
            NOIR
          </Link>

          {/* Right actions */}
          <div className="flex items-center gap-1 md:gap-4">
            <button className="p-2" aria-label="Search">
              <Search className="w-5 h-5" />
            </button>
            <Link
              to="/wishlist"
              className="p-2 relative"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistTotal > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-foreground text-background text-[10px] font-medium flex items-center justify-center">
                  {wishlistTotal}
                </span>
              )}
            </Link>
            <button className="hidden md:block p-2" aria-label="Account">
              <User className="w-5 h-5" />
            </button>
            <button
              className="p-2 relative"
              onClick={openCart}
              aria-label="Open cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-foreground text-background text-[10px] font-medium flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay */}
      <div
        className={cn(
          "fixed inset-0 z-50 bg-background transition-transform duration-300 md:hidden",
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between h-14 px-4 border-b border-border">
          <span className="text-xl font-medium tracking-tight">NOIR</span>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="p-2"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <nav className="flex flex-col p-6 gap-6">
          <Link
            to="/shop?category=women"
            className="text-2xl font-medium"
            onClick={() => setMobileMenuOpen(false)}
          >
            Women
          </Link>
          <Link
            to="/shop?category=men"
            className="text-2xl font-medium"
            onClick={() => setMobileMenuOpen(false)}
          >
            Men
          </Link>
          <Link
            to="/shop"
            className="text-2xl font-medium"
            onClick={() => setMobileMenuOpen(false)}
          >
            All Products
          </Link>
          <div className="h-px bg-border my-4" />
          <Link
            to="/wishlist"
            className="text-2xl font-medium"
            onClick={() => setMobileMenuOpen(false)}
          >
            Wishlist
          </Link>
          <div className="h-px bg-border" />
          <Link
            to="/account"
            className="text-lg text-muted-foreground"
            onClick={() => setMobileMenuOpen(false)}
          >
            Account
          </Link>
          <Link
            to="/help"
            className="text-lg text-muted-foreground"
            onClick={() => setMobileMenuOpen(false)}
          >
            Help
          </Link>
        </nav>
      </div>
    </>
  );
};

export default Header;
