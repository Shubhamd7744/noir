import { X, Minus, Plus, ArrowRight, ExternalLink, Loader2 } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useEffect } from "react";

const ShopifyCartDrawer = () => {
  const {
    items,
    isOpen,
    isLoading,
    isSyncing,
    closeCart,
    removeItem,
    updateQuantity,
    getCheckoutUrl,
    totalItems,
    subtotal,
    syncCart,
  } = useCartStore();

  const itemCount = totalItems();
  const total = subtotal();
  const currencyCode = items[0]?.price.currencyCode || 'INR';

  // Sync cart with Shopify when drawer opens
  useEffect(() => {
    if (isOpen) {
      syncCart();
    }
  }, [isOpen, syncCart]);

  const handleCheckout = () => {
    const checkoutUrl = getCheckoutUrl();
    if (checkoutUrl) {
      window.open(checkoutUrl, '_blank');
      closeCart();
    }
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={cn(
          "fixed inset-0 z-50 bg-foreground/20 transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={closeCart}
      />

      {/* Drawer */}
      <div
        className={cn(
          "fixed top-0 right-0 bottom-0 z-50 w-full max-w-md bg-background cart-drawer transition-transform duration-300 flex flex-col",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between h-14 px-4 border-b border-border">
          <span className="text-caption flex items-center gap-2">
            Your Bag ({itemCount} {itemCount === 1 ? "item" : "items"})
            {(isLoading || isSyncing) && <Loader2 className="w-3 h-3 animate-spin" />}
          </span>
          <button onClick={closeCart} className="p-2" aria-label="Close cart">
            <X className="w-5 h-5" />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 px-6">
            <p className="text-muted-foreground">Your bag is empty</p>
            <Button variant="outline" onClick={closeCart}>
              Continue Shopping
            </Button>
          </div>
        ) : (
          <>
            {/* Items */}
            <div className="flex-1 overflow-y-auto">
              {items.map((item) => {
                const firstImage = item.product.node.images.edges[0]?.node;
                return (
                  <div
                    key={item.variantId}
                    className="flex gap-4 p-4 border-b border-border"
                  >
                    <div className="w-20 h-28 bg-muted overflow-hidden flex-shrink-0">
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
                    </div>
                    <div className="flex-1 flex flex-col min-w-0">
                      <div className="flex justify-between items-start gap-2">
                        <div className="min-w-0">
                          <h4 className="text-sm font-medium truncate">{item.product.node.title}</h4>
                          {item.selectedOptions.length > 0 && (
                            <p className="text-sm text-muted-foreground mt-0.5">
                              {item.selectedOptions.map(opt => opt.value).join(' / ')}
                            </p>
                          )}
                          <p className="text-xs text-muted-foreground mt-1">
                            Est. delivery: 3-5 days
                          </p>
                        </div>
                        <button
                          onClick={() => removeItem(item.variantId)}
                          disabled={isLoading}
                          className="text-muted-foreground hover:text-foreground p-1 disabled:opacity-50"
                          aria-label="Remove item"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="mt-auto flex justify-between items-center">
                        <div className="flex items-center border border-border">
                          <button
                            className="p-2 disabled:opacity-50"
                            onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                            disabled={isLoading}
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-8 text-center text-sm">
                            {item.quantity}
                          </span>
                          <button
                            className="p-2 disabled:opacity-50"
                            onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                            disabled={isLoading}
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <span className="font-medium">
                          {item.price.currencyCode} {(parseFloat(item.price.amount) * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Footer */}
            <div className="border-t border-border p-4 space-y-4">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span className="font-medium">{currencyCode} {total.toFixed(2)}</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Taxes and shipping calculated at checkout
              </p>
              <Button 
                variant="cart" 
                size="full" 
                onClick={handleCheckout}
                disabled={items.length === 0 || isLoading || isSyncing}
              >
                {isLoading || isSyncing ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Checkout
                  </>
                )}
              </Button>
              <button
                onClick={closeCart}
                className="w-full text-sm text-center text-muted-foreground hover:text-foreground transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ShopifyCartDrawer;
