import { X, Minus, Plus, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

const CartDrawer = () => {
  const {
    items,
    isOpen,
    closeCart,
    removeItem,
    updateQuantity,
    subtotal,
    freeShippingThreshold,
    amountUntilFreeShipping,
  } = useCart();

  const shippingProgress = Math.min(100, (subtotal / freeShippingThreshold) * 100);

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
          <span className="text-caption">
            Your Bag ({items.length} {items.length === 1 ? "item" : "items"})
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
            {/* Free shipping progress */}
            <div className="px-4 py-4 border-b border-border">
              {amountUntilFreeShipping > 0 ? (
                <>
                  <p className="text-sm mb-2">
                    Add <span className="font-medium">${amountUntilFreeShipping.toFixed(0)}</span> more for free shipping
                  </p>
                  <div className="h-1 bg-muted overflow-hidden">
                    <div
                      className="h-full bg-foreground progress-fill"
                      style={{ width: `${shippingProgress}%` }}
                    />
                  </div>
                </>
              ) : (
                <p className="text-sm font-medium text-success">
                  ✓ You've unlocked free shipping
                </p>
              )}
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto">
              {items.map((item) => (
                <div
                  key={`${item.product.id}-${item.size}`}
                  className="flex gap-4 p-4 border-b border-border"
                >
                  <div className="w-20 h-28 bg-muted overflow-hidden">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 flex flex-col">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-sm font-medium">{item.product.name}</h4>
                        <p className="text-sm text-muted-foreground mt-0.5">
                          Size: {item.size}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Est. delivery: 3-5 days
                        </p>
                      </div>
                      <button
                        onClick={() => removeItem(item.product.id, item.size)}
                        className="text-muted-foreground hover:text-foreground p-1"
                        aria-label="Remove item"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="mt-auto flex justify-between items-center">
                      <div className="flex items-center border border-border">
                        <button
                          className="p-2"
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.size,
                              item.quantity - 1
                            )
                          }
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center text-sm">
                          {item.quantity}
                        </span>
                        <button
                          className="p-2"
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.size,
                              item.quantity + 1
                            )
                          }
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <span className="font-medium">
                        ${(item.product.price * item.quantity).toFixed(0)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="border-t border-border p-4 space-y-4">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span className="font-medium">${subtotal.toFixed(0)}</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Taxes and shipping calculated at checkout
              </p>
              <Button variant="cart" size="full" asChild>
                <Link to="/checkout" onClick={closeCart}>
                  Checkout
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
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

export default CartDrawer;
