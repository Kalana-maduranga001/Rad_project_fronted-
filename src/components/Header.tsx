import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/authContext"
import { FiUser, FiShoppingCart, FiHeart, FiMenu, FiX } from "react-icons/fi"
import { useCart } from "../context/cartContext"
import { useState } from "react"
import Cart from "./Cart"

export default function Header() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const { cart } = useCart()
  const [cartOpen, setCartOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleUserClick = () => {
    if (!user) navigate("/login")
    else if (user.role === "ADMIN") navigate("/dashboard/admin")
    else navigate("/dashboard/user")
  }

  const totalItems = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  )

  return (
    <>
      <header className="w-full bg-white/95 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6">
          
          {/* Main Header */}
          <div className="flex items-center justify-between py-3">

            {/* Logo */}
            <Link 
              to="/" 
              className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight hover:text-gray-700 transition-colors"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              T R A D C E Y Clothing Store
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <Link 
                to="/" 
                className="text-sm text-gray-700 font-medium hover:text-gray-900 transition-colors relative group"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Home
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-900 group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link 
                to="/products" 
                className="text-sm text-gray-700 font-medium hover:text-gray-900 transition-colors relative group"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Products
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-900 group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link 
                to="/about" 
                className="text-sm text-gray-700 font-medium hover:text-gray-900 transition-colors relative group"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                About
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-900 group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link 
                to="/contact" 
                className="text-sm text-gray-700 font-medium hover:text-gray-900 transition-colors relative group"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Contact
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-900 group-hover:w-full transition-all duration-300"></span>
              </Link>
            </nav>

            {/* Icons */}
            <div className="flex items-center space-x-4">

              {/* Wishlist */}
              <div className="hidden md:block relative group">
                <FiHeart 
                  className="text-xl text-gray-700 cursor-pointer hover:text-gray-900 transition-all transform hover:scale-110" 
                />
                <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  Wishlist
                </span>
              </div>

              {/* User */}
              <div className="relative group">
                <FiUser
                  className="text-xl text-gray-700 cursor-pointer hover:text-gray-900 transition-all transform hover:scale-110"
                  onClick={handleUserClick}
                />
                <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {user ? 'Account' : 'Login'}
                </span>
              </div>

              {/* Cart */}
              <div
                className="relative cursor-pointer group"
                onClick={() => setCartOpen(true)}
              >
                <FiShoppingCart className="text-xl text-gray-700 hover:text-gray-900 transition-all transform hover:scale-110" />

                {/* CART BADGE */}
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-gray-900 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-bold animate-pulse-scale">
                    {totalItems}
                  </span>
                )}
                
                <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  Cart
                </span>
              </div>

              {/* Mobile Menu Toggle */}
              <button
                className="md:hidden text-xl text-gray-700 hover:text-gray-900 transition-colors"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <FiX /> : <FiMenu />}
              </button>

            </div>
          </div>

          {/* User Welcome Banner (if logged in) */}
          {user && (
            <div className="hidden md:block pb-2">
              <p className="text-xs text-gray-600" style={{ fontFamily: "'Inter', sans-serif" }}>
                Welcome back, <span className="font-semibold text-gray-900">{user.firstname}</span>! 
                {user.role === "ADMIN" && (
                  <span className="ml-2 px-2 py-0.5 bg-gray-900 text-white text-xs rounded-full">
                    Admin
                  </span>
                )}
              </p>
            </div>
          )}

        </div>

        {/* Mobile Menu */}
        <div 
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <nav className="px-6 py-4 space-y-3 bg-gray-50 border-t border-gray-100">
            <Link 
              to="/" 
              className="block text-gray-700 font-medium hover:text-gray-900 py-2 transition-colors"
              style={{ fontFamily: "'Inter', sans-serif" }}
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/products" 
              className="block text-gray-700 font-medium hover:text-gray-900 py-2 transition-colors"
              style={{ fontFamily: "'Inter', sans-serif" }}
              onClick={() => setMobileMenuOpen(false)}
            >
              Products
            </Link>
            <Link 
              to="/about" 
              className="block text-gray-700 font-medium hover:text-gray-900 py-2 transition-colors"
              style={{ fontFamily: "'Inter', sans-serif" }}
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              to="/contact" 
              className="block text-gray-700 font-medium hover:text-gray-900 py-2 transition-colors"
              style={{ fontFamily: "'Inter', sans-serif" }}
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
            <div className="pt-3 border-t border-gray-200">
              <button className="flex items-center gap-2 text-gray-700 font-medium hover:text-gray-900 py-2 transition-colors w-full">
                <FiHeart className="text-xl" />
                <span style={{ fontFamily: "'Inter', sans-serif" }}>Wishlist</span>
              </button>
            </div>
            {user && (
              <div className="pt-3 border-t border-gray-200">
                <p className="text-sm text-gray-600" style={{ fontFamily: "'Inter', sans-serif" }}>
                  Logged in as <span className="font-semibold text-gray-900">{user.firstname}</span>
                </p>
              </div>
            )}
          </nav>
        </div>

      </header>

      {/* CART DRAWER */}
      <Cart
        open={cartOpen}
        onClose={() => setCartOpen(false)}
      />

      <style>{`
        @keyframes pulse-scale {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
        }

        .animate-pulse-scale {
          animation: pulse-scale 2s ease-in-out infinite;
        }
      `}</style>
    </>
  )
}