"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ShoppingCart, Check } from "lucide-react";

export type CartItem = {
  _id: string;
  name: string;
  price: number;
  salesPrice: number;
  image: string;
  images?: { url: string }[];
  quantity:number;
  cartQty: number;
  maxQty: number;
  size: string;
  slug?: string;
};

type Props = {
  product: Omit<CartItem, "cartQty" | "size">;
  selectedSize: string | null;
  className?: string;
};

const AddToCartButton = ({ product, selectedSize, className }: Props) => {
  const [inCart, setInCart] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem("cart") || "[]");
    const exists = cartItems.some(
      (item: CartItem) => item._id === product._id && item.size === selectedSize
    );
    setInCart(exists);
  }, [product._id, selectedSize]);

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.warning("Please select a size before adding to cart.");
      return;
    }

    setIsLoading(true);
    
    try {
      const cartItems: CartItem[] = JSON.parse(localStorage.getItem("cart") || "[]");

      // Check if product with same size already exists
      const existingIndex = cartItems.findIndex(
        (item) => item._id === product._id && item.size === selectedSize
      );

      if (existingIndex >= 0) {
        // Update quantity if already exists
        cartItems[existingIndex].cartQty += 1;
        toast.success("Quantity increased in cart.");
      } else {
        // Add new item to cart
        const newProduct: CartItem = {
          ...product,
          image: product.image || product.images?.[0]?.url || "", // Fallback for image
          size: selectedSize,
          cartQty: 1,
          maxQty: product.quantity,
        };

        cartItems.push(newProduct);
        toast.success("Product added to cart!");
      }

      localStorage.setItem("cart", JSON.stringify(cartItems));
      setInCart(true);
      
      // Trigger cart update event for other components
      window.dispatchEvent(new Event("cart-updated"));
    } catch (error) {
      toast.error("Failed to add product to cart.");
      console.error("Add to cart error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (inCart) {
    return (
      <Button
        variant="outline"
        className={`w-full gap-2 ${className}`}
        onClick={() => router.push("/cart")}
      >
        <Check className="h-4 w-4" />
        View in Cart
      </Button>
    );
  }

  return (
    <Button
      className={`w-full gap-2 ${className}`}
      onClick={handleAddToCart}
      disabled={isLoading}
    >
      {isLoading ? (
        "Adding..."
      ) : (
        <>
          <ShoppingCart className="h-4 w-4" />
          Add to Cart
        </>
      )}
    </Button>
  );
};

export default AddToCartButton;