import { createContext, useContext, useEffect, useState } from "react"
import type { ProductType } from "../services/product"

export type CartItem = {
  product: ProductType
  quantity: number
  selectedSize?: string
}

type CartContextType = {
  cart: CartItem[]
  addToCart: (product: ProductType, quantity: number, selectedSize?: string) => void
  removeFromCart: (productId: string, selectedSize?: string) => void
  updateQuantity: (productId: string, quantity: number, selectedSize?: string) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextType | null>(null)

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([])
  const [hasLoaded, setHasLoaded] = useState(false)

  // Load from localStorage (once)
  useEffect(() => {
    const stored = localStorage.getItem("cart")
    if (stored) {
      setCart(JSON.parse(stored))
    }
    setHasLoaded(true)
  }, [])

  // Save to localStorage (after load)
  useEffect(() => {
    if (!hasLoaded) return
    localStorage.setItem("cart", JSON.stringify(cart))
  }, [cart, hasLoaded])

  // cartContext.tsx
  const addToCart = (product: ProductType, quantity: number, selectedSize?: string) => {
    setCart(prev => {
      const existing = prev.find(
        item =>
          item.product._id === product._id &&
          item.selectedSize === selectedSize
      )

      if (existing) {
        return prev.map(item =>
          item.product._id === product._id && item.selectedSize === selectedSize
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      }

      return [...prev, { product, quantity, selectedSize }]
    })
  }

  const removeFromCart = (productId: string, selectedSize?: string) => {
    setCart(prev =>
      prev.filter(
        item => item.product._id !== productId || item.selectedSize !== selectedSize
      )
    )
  }

  const updateQuantity = (productId: string, quantity: number, selectedSize?: string) => {
    setCart(prev =>
      prev.map(item =>
        item.product._id === productId && item.selectedSize === selectedSize
          ? { ...item, quantity }
          : item
      )
    )
  }

  const clearCart = () => setCart([])

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within CartProvider")
  }
  return context
}
