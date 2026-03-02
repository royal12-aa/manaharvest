import { createContext, useContext, useState } from 'react'
import { mockUser } from '../data/orders'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [cart, setCart] = useState([])

  const login = (email, password) => {
    // Mock auth - accept any credentials
    if (email && password.length >= 4) {
      setUser({ ...mockUser, email })
      return true
    }
    return false
  }

  const logout = () => setUser(null)

  const addToCart = (product, qty = 1) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === product.id)
      if (existing) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + qty } : i)
      return [...prev, { ...product, qty }]
    })
  }

  const removeFromCart = (productId) => setCart(prev => prev.filter(i => i.id !== productId))

  const updateCartQty = (productId, qty) => {
    if (qty <= 0) return removeFromCart(productId)
    setCart(prev => prev.map(i => i.id === productId ? { ...i, qty } : i))
  }

  const cartCount = cart.reduce((s, i) => s + i.qty, 0)
  const cartTotal = cart.reduce((s, i) => s + i.price * i.qty, 0)

  return (
    <AuthContext.Provider value={{ user, login, logout, cart, addToCart, removeFromCart, updateCartQty, cartCount, cartTotal }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
