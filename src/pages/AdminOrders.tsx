import { useEffect, useState } from "react"
import { getAllOrders, getOrder, getReport, updateOrderStatus } from "../services/order"

export default function AdminOrders() {
  const [orders, setOrders] = useState<any[]>([])
  const [status, setStatus] = useState("ALL")
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<any>(null)
  const [showModal, setShowModal] = useState(false)

  const fetchOrders = async () => {
    try {
      setLoading(true)
      const res = await getAllOrders(status, page)
      setOrders(res.data.orders)
      setTotalPages(res.data.totalPages)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [status, page])

  const handleStatusChange = async (orderId: string, status: string) => {
    await updateOrderStatus(orderId, status)
    fetchOrders()
  }

  const openOrderDetails = async (orderId: string) => {
    try {
      const res = await getOrder(orderId)
      setSelectedOrder(res.data)
      setShowModal(true)
    } catch (err) {
      console.error(err)
      alert("Failed to load order details")
    }
  }

  const handleGenerateReport = async () => {
    try {
      const res = await getReport()

      const url = window.URL.createObjectURL(new Blob([res.data]))
      const link = document.createElement("a")
      link.href = url
      link.setAttribute("download", "orders-report.pdf")
      document.body.appendChild(link)
      link.click()
      link.remove()
    } catch (err) {
      console.error("Failed to generate report", err)
      alert("Report generation failed")
    }
  }

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      PENDING: "bg-yellow-500/20 text-yellow-200 border-yellow-400/40",
      CONFIRMED: "bg-blue-500/20 text-blue-200 border-blue-400/40",
      SHIPPED: "bg-green-500/20 text-green-200 border-green-400/40",
      CANCELLED: "bg-red-500/20 text-red-200 border-red-400/40"
    }
    return colors[status] || colors.PENDING
  }

  if (loading) return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-purple-400 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-purple-200 font-medium">Loading orders...</p>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 left-40 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex justify-between items-center mb-8 backdrop-blur-sm bg-white/5 rounded-2xl p-6 border border-white/10">
          <div>
            <h1 className="text-4xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text mb-2">
              Orders Management
            </h1>
            <p className="text-purple-200 text-sm">Track and manage customer orders</p>
          </div>

          <button
            onClick={handleGenerateReport}
            className="backdrop-blur-sm bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-emerald-400 hover:to-teal-400 transform hover:scale-105 transition-all duration-300 shadow-lg shadow-emerald-500/30 flex items-center gap-2"
          >
            <span className="text-lg">📊</span>
            Generate Report
          </button>
        </div>

        {/* FILTER */}
        <div className="mb-6 backdrop-blur-sm bg-white/5 rounded-2xl p-4 border border-white/10">
          <div className="flex gap-4 items-center">
            <label className="font-semibold text-purple-200">Filter by Status:</label>
            <select
              value={status}
              onChange={e => {
                setStatus(e.target.value)
                setPage(1)
              }}
              className="backdrop-blur-sm bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-cyan-400 transition-all"
            >
              <option value="ALL" className="bg-slate-900">All Orders</option>
              <option value="PENDING" className="bg-slate-900">Pending</option>
              <option value="CONFIRMED" className="bg-slate-900">Confirmed</option>
              <option value="SHIPPED" className="bg-slate-900">Shipped</option>
              <option value="CANCELLED" className="bg-slate-900">Cancelled</option>
            </select>
          </div>
        </div>

        {/* ORDER LIST */}
        <div className="space-y-6 mb-8">
          {orders.map(order => (
            <div 
              key={order._id} 
              className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-purple-400/50 transition-all duration-300"
            >
              <div className="flex justify-between items-center mb-4">
                <div>
                  <span className="text-2xl font-bold text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text">
                    Order #{order._id.slice(-6)}
                  </span>
                  <p className="text-purple-200 text-sm mt-1">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <span className={`backdrop-blur-sm px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider border ${getStatusColor(order.status)}`}>
                  {order.status}
                </span>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-purple-300 text-sm">Customer Email</p>
                  <p className="text-white font-medium">{order.user?.email}</p>
                </div>
                <div>
                  <p className="text-purple-300 text-sm">Total Amount</p>
                  <p className="text-2xl font-bold text-transparent bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text">
                    Rs. {order.totalAmount}
                  </p>
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-purple-200 text-sm font-semibold mb-2">Update Status:</label>
                <select
                  disabled={showModal}
                  value={order.status}
                  onChange={e =>
                    handleStatusChange(order._id, e.target.value)
                  }
                  className="backdrop-blur-sm bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-cyan-400 transition-all disabled:opacity-50"
                >
                  <option value="PENDING" className="bg-slate-900">PENDING</option>
                  <option value="CONFIRMED" className="bg-slate-900">CONFIRMED</option>
                  <option value="SHIPPED" className="bg-slate-900">SHIPPED</option>
                  <option value="CANCELLED" className="bg-slate-900">CANCELLED</option>
                </select>
              </div>

              <div className="border-t border-white/10 pt-4">
                <h3 className="text-purple-200 font-semibold mb-3 text-sm uppercase tracking-wider">Order Items</h3>
                <div className="space-y-2">
                  {order.products.map((p: any) => (
                    <div key={p._id} className="flex justify-between items-center backdrop-blur-sm bg-white/5 p-3 rounded-xl">
                      <div>
                        <p className="text-white font-medium">{p.title}</p>
                        {p.size && (
                          <span className="text-purple-300 text-sm">Size: {p.size}</span>
                        )}
                      </div>
                      <span className="text-cyan-300 font-semibold">× {p.quantity}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end mt-4">
                <button
                  onClick={() => openOrderDetails(order._id)}
                  className="backdrop-blur-sm bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-2 rounded-xl font-semibold hover:from-cyan-400 hover:to-blue-400 transition-all shadow-lg shadow-cyan-500/30"
                >
                  View Details →
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* PAGINATION */}
        <div className="flex justify-center items-center gap-4 backdrop-blur-sm bg-white/5 border border-white/10 rounded-2xl p-4 w-fit mx-auto">
          <button
            disabled={page === 1}
            onClick={() => setPage(p => p - 1)}
            className="px-6 py-2 backdrop-blur-sm bg-white/10 text-white rounded-xl font-semibold hover:bg-white/20 transition-all disabled:opacity-30 disabled:cursor-not-allowed border border-white/20"
          >
            ← Previous
          </button>
          <span className="font-bold text-white text-lg px-4">
            {page} <span className="text-purple-300">of</span> {totalPages}
          </span>
          <button
            disabled={page === totalPages}
            onClick={() => setPage(p => p + 1)}
            className="px-6 py-2 backdrop-blur-sm bg-white/10 text-white rounded-xl font-semibold hover:bg-white/20 transition-all disabled:opacity-30 disabled:cursor-not-allowed border border-white/20"
          >
            Next →
          </button>
        </div>

        {/* MODAL */}
        {showModal && selectedOrder && (
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setShowModal(false)}
          >
            <div
              className="backdrop-blur-xl bg-gradient-to-br from-slate-900/95 to-purple-900/95 border border-white/20 w-full max-w-3xl rounded-2xl p-8 relative transform animate-scale-in shadow-2xl max-h-[90vh] overflow-y-auto"
              onClick={e => e.stopPropagation()}
            >
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 w-10 h-10 backdrop-blur-sm bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white text-xl transition-all border border-white/20"
              >
                ✕
              </button>

              <h2 className="text-3xl font-bold text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text mb-6">
                Order Details #{selectedOrder._id.slice(-6)}
              </h2>

              <div className="backdrop-blur-sm bg-white/5 rounded-xl p-4 border border-white/10 mb-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-purple-300 text-sm mb-1">Customer Email</p>
                    <p className="text-white font-medium">{selectedOrder.user?.email}</p>
                  </div>
                  <div>
                    <p className="text-purple-300 text-sm mb-1">Order Date</p>
                    <p className="text-white font-medium">{new Date(selectedOrder.createdAt).toLocaleString()}</p>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-purple-200 font-semibold mb-4 text-sm uppercase tracking-wider">Order Items</h3>
                <div className="space-y-3">
                  {selectedOrder.products.map((item: any) => (
                    <div key={item._id} className="flex justify-between items-start backdrop-blur-sm bg-white/5 p-4 rounded-xl border border-white/10">
                      <div className="flex-1">
                        <p className="text-white font-semibold text-lg">{item.title}</p>
                        <div className="flex gap-4 text-sm text-purple-300 mt-1">
                          <span>Qty: <span className="text-cyan-300 font-semibold">{item.quantity}</span></span>
                          {item.size && (
                            <span>Size: <span className="text-cyan-300 font-semibold">{item.size}</span></span>
                          )}
                        </div>
                      </div>
                      <p className="text-xl font-bold text-transparent bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text">
                        Rs. {item.price * item.quantity}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between items-center backdrop-blur-sm bg-white/5 p-4 rounded-xl border border-white/10">
                <div>
                  <p className="text-purple-300 text-sm mb-1">Total Amount</p>
                  <span className="text-3xl font-bold text-transparent bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text">
                    Rs. {selectedOrder.totalAmount}
                  </span>
                </div>

                <div>
                  <p className="text-purple-300 text-sm mb-2">Update Status</p>
                  <select
                    value={selectedOrder.status}
                    onChange={async e => {
                      await updateOrderStatus(selectedOrder._id, e.target.value)
                      setSelectedOrder({
                        ...selectedOrder,
                        status: e.target.value
                      })
                      fetchOrders()
                    }}
                    className="backdrop-blur-sm bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-cyan-400 transition-all"
                  >
                    <option value="PENDING" className="bg-slate-900">PENDING</option>
                    <option value="CONFIRMED" className="bg-slate-900">CONFIRMED</option>
                    <option value="SHIPPED" className="bg-slate-900">SHIPPED</option>
                    <option value="CANCELLED" className="bg-slate-900">CANCELLED</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }
      `}</style>
    </div>
  )
}