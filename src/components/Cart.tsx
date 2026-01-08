import { FiX } from "react-icons/fi"
import { useCart } from "../context/cartContext"
import { useNavigate } from "react-router-dom"

type Props = {
  open: boolean
  onClose: () => void
}

export default function CartDrawer({ open, onClose }: Props) {
  const navigate = useNavigate()
  const { cart, removeFromCart, updateQuantity } = useCart()

  const total = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  )

  if (!open) return null

  return (
    <>
      {/* BACKDROP */}
      <div
        className="fixed inset-0 bg-black bg-opacity-60 z-40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* DRAWER */}
      <div className="fixed top-0 right-0 w-full sm:w-96 h-full bg-white z-50 shadow-2xl flex flex-col animate-slideIn">
        
        {/* HEADER */}
        <div className="flex items-center justify-between p-6 border-b-2 border-gray-200 bg-gradient-to-r from-gray-50 to-white">
          <h2 className="text-2xl font-black tracking-tight">Your Cart</h2>
          <button 
            onClick={onClose}
            className="hover:bg-gray-100 p-2 rounded-full transition-all duration-200"
          >
            <FiX size={24} className="font-bold" />
          </button>
        </div>

        {/* CONTENT */}
        <div className="flex-1 overflow-y-auto p-6">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <p className="text-gray-400 font-light text-lg">Your cart is empty</p>
              <p className="text-gray-400 font-light text-sm mt-2">Add some products to get started!</p>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.product._id}
                className="flex gap-4 mb-6 pb-6 border-b-2 border-gray-100 hover:bg-gray-50 p-3 rounded-xl transition-all"
              >
                <div className="w-20 h-20 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
                  <img
                    src={item.product.imageUrls[0]}
                    alt={item.product.title}
                    className="w-full h-full object-contain"
                  />
                </div>

                <div className="flex-1">
                  <h3 className="font-bold text-base tracking-tight mb-1">
                    {item.product.title} {item.selectedSize && <span className="text-gray-600 font-medium">(Size: {item.selectedSize})</span>}
                  </h3>
                  <p className="text-sm font-black text-green-600 mb-3">
                    Rs. {item.product.price}
                  </p>

                  <div className="flex items-center gap-3">
                    <button
                      className="border-2 border-gray-300 hover:border-black hover:bg-black hover:text-white px-3 py-1 rounded-lg font-bold transition-all duration-200"
                      onClick={(e) => {
                        e.stopPropagation()
                        updateQuantity(
                          item.product._id,
                          Math.max(1, item.quantity - 1),
                          item.selectedSize
                        )
                      }}
                    >
                      −
                    </button>
                    <span className="font-bold text-lg min-w-[30px] text-center">{item.quantity}</span>
                    <button
                      className="border-2 border-gray-300 hover:border-black hover:bg-black hover:text-white px-3 py-1 rounded-lg font-bold transition-all duration-200"
                      onClick={(e) => {
                        e.stopPropagation()
                        updateQuantity(
                          item.product._id,
                          item.quantity + 1,
                          item.selectedSize
                        )
                      }}
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    removeFromCart(item.product._id, item.selectedSize)
                  }}
                  className="text-red-500 hover:text-red-700 text-sm font-semibold self-start hover:bg-red-50 px-2 py-1 rounded transition-all"
                >
                  Remove
                </button>
              </div>
            ))
          )}
        </div>

        {/* FOOTER */}
        {cart.length > 0 && (
          <div className="border-t-2 border-gray-200 p-6 bg-gradient-to-r from-gray-50 to-white">
            <div className="flex justify-between font-black text-xl mb-6">
              <span className="tracking-tight">Total</span>
              <span className="text-green-600">Rs. {total}</span>
            </div>

            <button
              className="w-full bg-black text-white py-4 rounded-xl font-bold text-lg tracking-wide hover:bg-gray-800 transition-all duration-200 shadow-lg hover:shadow-xl"
              onClick={() => {
                onClose()
                navigate("/checkout")
              }}
            >
              Checkout
            </button>
          </div>
        )}
      </div>
    </>
  )
}