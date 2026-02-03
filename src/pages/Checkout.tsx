import { Link } from "react-router-dom";
import { ChevronLeft, ExternalLink, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/cartStore";
import PageTransition from "@/components/motion/PageTransition";
import { useEffect } from "react";

const Checkout = () => {
  const { items, subtotal, getCheckoutUrl, isLoading } = useCartStore();
  const total = subtotal();
  const checkoutUrl = getCheckoutUrl();
  const currencyCode = items[0]?.price.currencyCode || 'INR';

  // Auto-redirect to Shopify checkout if we have items
  useEffect(() => {
    if (checkoutUrl && items.length > 0) {
      // Give user a moment to see the page before redirect
      const timer = setTimeout(() => {
        window.open(checkoutUrl, '_blank');
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [checkoutUrl, items.length]);

  if (items.length === 0) {
    return (
      <PageTransition className="min-h-screen flex flex-col items-center justify-center gap-4 px-4">
        <p className="text-muted-foreground">Your bag is empty</p>
        <Button variant="outline" asChild>
          <Link to="/shop">Continue Shopping</Link>
        </Button>
      </PageTransition>
    );
  }

  const handleCheckout = () => {
    if (checkoutUrl) {
      window.open(checkoutUrl, '_blank');
    }
  };

  return (
    <PageTransition className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container flex items-center justify-between h-14">
          <Link
            to="/"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Store
          </Link>
          <span className="text-xl font-medium tracking-tight">NOIR</span>
          <div className="w-24" />
        </div>
      </header>

      <div className="container py-12">
        <div className="max-w-lg mx-auto">
          {/* Order summary */}
          <div className="bg-secondary p-6 mb-8">
            <h3 className="text-headline mb-6">Order Summary</h3>
            <div className="space-y-4 mb-6">
              {items.map((item) => {
                const firstImage = item.product.node.images.edges[0]?.node;
                return (
                  <div key={item.variantId} className="flex gap-4">
                    <div className="w-16 h-20 bg-muted overflow-hidden relative flex-shrink-0">
                      {firstImage ? (
                        <img
                          src={firstImage.url}
                          alt={item.product.node.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">
                          No Image
                        </div>
                      )}
                      <span className="absolute -top-1 -right-1 w-5 h-5 bg-foreground text-background text-xs flex items-center justify-center">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium truncate">{item.product.node.title}</h4>
                      {item.selectedOptions.length > 0 && (
                        <p className="text-sm text-muted-foreground">
                          {item.selectedOptions.map(opt => opt.value).join(' / ')}
                        </p>
                      )}
                    </div>
                    <span className="text-sm font-medium flex-shrink-0">
                      {item.price.currencyCode} {(parseFloat(item.price.amount) * item.quantity).toFixed(2)}
                    </span>
                  </div>
                );
              })}
            </div>
            <div className="space-y-2 py-4 border-t border-border">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>{currencyCode} {total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>
            </div>
            <div className="flex justify-between py-4 border-t border-border">
              <span className="font-medium">Total</span>
              <span className="font-medium">{currencyCode} {total.toFixed(2)}</span>
            </div>
          </div>

          {/* Checkout button */}
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground text-center">
              You'll be redirected to our secure Shopify checkout to complete your purchase.
            </p>
            <Button 
              variant="cart" 
              size="full" 
              onClick={handleCheckout}
              disabled={isLoading || !checkoutUrl}
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Proceed to Checkout
                </>
              )}
            </Button>
            <Button variant="outline" size="full" asChild>
              <Link to="/shop">Continue Shopping</Link>
            </Button>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Checkout;
