import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, Lock, Truck, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { cn } from "@/lib/utils";
import PageTransition from "@/components/motion/PageTransition";

type CheckoutStep = "contact" | "shipping" | "payment" | "review";

const Checkout = () => {
  const { items, subtotal, amountUntilFreeShipping } = useCart();
  const [currentStep, setCurrentStep] = useState<CheckoutStep>("contact");
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "United States",
  });

  const steps: { key: CheckoutStep; label: string }[] = [
    { key: "contact", label: "Contact" },
    { key: "shipping", label: "Shipping" },
    { key: "payment", label: "Payment" },
    { key: "review", label: "Review" },
  ];

  const currentStepIndex = steps.findIndex((s) => s.key === currentStep);
  const shippingCost = amountUntilFreeShipping > 0 ? 12 : 0;
  const total = subtotal + shippingCost;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const goToNextStep = () => {
    const nextIndex = currentStepIndex + 1;
    if (nextIndex < steps.length) {
      setCurrentStep(steps[nextIndex].key);
    }
  };

  const goToPrevStep = () => {
    const prevIndex = currentStepIndex - 1;
    if (prevIndex >= 0) {
      setCurrentStep(steps[prevIndex].key);
    }
  };

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
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Lock className="w-4 h-4" />
            Secure Checkout
          </div>
        </div>
      </header>

      {/* Progress indicator */}
      <div className="border-b border-border">
        <div className="container py-4">
          <div className="flex items-center justify-center gap-2 md:gap-4">
            {steps.map((step, index) => (
              <div key={step.key} className="flex items-center gap-2 md:gap-4">
                <button
                  onClick={() =>
                    index <= currentStepIndex && setCurrentStep(step.key)
                  }
                  disabled={index > currentStepIndex}
                  className={cn(
                    "text-xs md:text-sm transition-colors",
                    index === currentStepIndex
                      ? "font-medium"
                      : index < currentStepIndex
                      ? "text-muted-foreground"
                      : "text-muted-foreground/50"
                  )}
                >
                  {step.label}
                </button>
                {index < steps.length - 1 && (
                  <span className="text-muted-foreground/30">—</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container py-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Form section */}
          <div className="order-2 lg:order-1">
            {currentStep === "contact" && (
              <div className="space-y-6">
                <h2 className="text-headline">Contact Information</h2>
                <p className="text-sm text-muted-foreground">
                  We'll use this to send you order updates.
                </p>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium block mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full border border-border px-4 py-3 text-sm outline-none focus:border-foreground transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium block mb-2">
                      Phone (optional)
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full border border-border px-4 py-3 text-sm outline-none focus:border-foreground transition-colors"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                </div>
                <Button variant="cart" size="full" onClick={goToNextStep}>
                  Continue to Shipping
                </Button>
              </div>
            )}

            {currentStep === "shipping" && (
              <div className="space-y-6">
                <h2 className="text-headline">Shipping Address</h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium block mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="w-full border border-border px-4 py-3 text-sm outline-none focus:border-foreground transition-colors"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium block mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="w-full border border-border px-4 py-3 text-sm outline-none focus:border-foreground transition-colors"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium block mb-2">
                      Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full border border-border px-4 py-3 text-sm outline-none focus:border-foreground transition-colors"
                      placeholder="123 Street Name"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium block mb-2">
                        City
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full border border-border px-4 py-3 text-sm outline-none focus:border-foreground transition-colors"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium block mb-2">
                        Postal Code
                      </label>
                      <input
                        type="text"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        className="w-full border border-border px-4 py-3 text-sm outline-none focus:border-foreground transition-colors"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Button variant="outline" size="lg" onClick={goToPrevStep}>
                    Back
                  </Button>
                  <Button
                    variant="cart"
                    size="lg"
                    className="flex-1"
                    onClick={goToNextStep}
                  >
                    Continue to Payment
                  </Button>
                </div>
              </div>
            )}

            {currentStep === "payment" && (
              <div className="space-y-6">
                <h2 className="text-headline">Payment Method</h2>
                <div className="border border-border p-4 space-y-4">
                  <p className="text-sm text-muted-foreground text-center py-8">
                    Payment integration coming soon.
                    <br />
                    This is a demo checkout flow.
                  </p>
                </div>
                <div className="flex gap-4">
                  <Button variant="outline" size="lg" onClick={goToPrevStep}>
                    Back
                  </Button>
                  <Button
                    variant="cart"
                    size="lg"
                    className="flex-1"
                    onClick={goToNextStep}
                  >
                    Review Order
                  </Button>
                </div>
              </div>
            )}

            {currentStep === "review" && (
              <div className="space-y-6">
                <h2 className="text-headline">Review Your Order</h2>
                <div className="space-y-4">
                  <div className="border border-border p-4">
                    <h4 className="text-sm font-medium mb-2">Ship to</h4>
                    <p className="text-sm text-muted-foreground">
                      {formData.firstName} {formData.lastName}
                      <br />
                      {formData.address}
                      <br />
                      {formData.city}, {formData.postalCode}
                    </p>
                  </div>
                  <div className="border border-border p-4">
                    <h4 className="text-sm font-medium mb-2">Delivery</h4>
                    <p className="text-sm text-muted-foreground">
                      Standard Shipping (3-5 business days)
                      <br />
                      {shippingCost === 0 ? "Free" : `$${shippingCost}`}
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Button variant="outline" size="lg" onClick={goToPrevStep}>
                    Back
                  </Button>
                  <Button variant="cart" size="lg" className="flex-1">
                    Place Order — ${total.toFixed(0)}
                  </Button>
                </div>
              </div>
            )}

            {/* Trust signals */}
            <div className="flex items-center justify-center gap-8 mt-8 pt-8 border-t border-border">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Truck className="w-4 h-4" />
                Free Shipping $150+
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <RotateCcw className="w-4 h-4" />
                30-Day Returns
              </div>
            </div>
          </div>

          {/* Order summary */}
          <div className="order-1 lg:order-2">
            <div className="lg:sticky lg:top-8 bg-secondary p-6">
              <h3 className="text-headline mb-6">Order Summary</h3>
              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div
                    key={`${item.product.id}-${item.size}`}
                    className="flex gap-4"
                  >
                    <div className="w-16 h-20 bg-muted overflow-hidden relative">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute -top-1 -right-1 w-5 h-5 bg-foreground text-background text-xs flex items-center justify-center">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium">{item.product.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        Size: {item.size}
                      </p>
                    </div>
                    <span className="text-sm font-medium">
                      ${(item.product.price * item.quantity).toFixed(0)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="space-y-2 py-4 border-t border-border">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(0)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Shipping</span>
                  <span>{shippingCost === 0 ? "Free" : `$${shippingCost}`}</span>
                </div>
              </div>
              <div className="flex justify-between py-4 border-t border-border">
                <span className="font-medium">Total</span>
                <span className="font-medium">${total.toFixed(0)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Checkout;
