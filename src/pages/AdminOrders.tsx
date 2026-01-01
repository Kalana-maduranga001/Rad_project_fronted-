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

  if (loading) return <p className="p-10">Loading orders...</p>

  return (
    <div className="p-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>

        <button
          onClick={handleGenerateReport}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Generate Report (PDF)
        </button>
      </div>

      {/* FILTER */}
      <div className="mb-6 flex gap-4 items-center">
        <label className="font-semibold">Filter:</label>

        <select
          value={status}
          onChange={e => {
            setStatus(e.target.value)
            setPage(1)
          }}
          className="border px-3 py-2 rounded"
        >
          <option value="ALL">All</option>
          <option value="PENDING">Pending</option>
          <option value="CONFIRMED">Confirmed</option>
          <option value="SHIPPED">Shipped</option>
          <option value="CANCELLED">Cancelled</option>
        </select>
      </div>

      {/* ORDER LIST */}
      <div className="space-y-6">
        {orders.map(order => (
          <div key={order._id} className="border rounded p-4">
            <div className="flex justify-between mb-2">
              <span className="font-semibold">
                Order #{order._id.slice(-6)}
              </span>
              <span className="text-sm text-gray-600">
                {new Date(order.createdAt).toLocaleDateString()}
              </span>
            </div>

            <p>User: {order.user?.email}</p>
            <p>Total: Rs. {order.totalAmount}</p>

            <div className="mt-3">
              <label className="font-semibold mr-2">Status:</label>
              <select
                disabled={showModal}
                value={order.status}
                onChange={e =>
                  handleStatusChange(order._id, e.target.value)
                }
                className="border px-3 py-1 rounded disabled:opacity-50"
              >
                <option value="PENDING">PENDING</option>
                <option value="CONFIRMED">CONFIRMED</option>
                <option value="SHIPPED">SHIPPED</option>
                <option value="CANCELLED">CANCELLED</option>
              </select>
            </div>

            <div className="mt-4">
              <h3 className="font-semibold mb-2">Products</h3>
              {order.products.map((p: any) => (
                <p key={p._id}>
                  {p.title} × {p.quantity}
                </p>
              ))}
            </div>

            <div className="flex justify-between items-center mt-4">
              <button
                onClick={() => openOrderDetails(order._id)}
                className="text-blue-600 hover:underline"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* PAGINATION */}
      <div className="flex justify-center gap-4 mt-8">
        <button
          disabled={page === 1}
          onClick={() => setPage(p => p - 1)}
          className="border px-4 py-2 rounded disabled:opacity-50"
        >
          Previous
        </button>

        <span className="font-semibold">
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(p => p + 1)}
          className="border px-4 py-2 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* MODAL */}
      {showModal && selectedOrder && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white w-full max-w-2xl rounded-lg p-6 relative"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-gray-500"
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold mb-4">
              Order #{selectedOrder._id.slice(-6)}
            </h2>

            <div className="mb-4">
              <p><b>Email:</b> {selectedOrder.user?.email}</p>
              <p><b>Date:</b> {new Date(selectedOrder.createdAt).toLocaleString()}</p>
            </div>

            <div className="space-y-3">
              {selectedOrder.products.map((item: any) => (
                <div key={item._id} className="flex justify-between border-b pb-2">
                  <div>
                    <p className="font-semibold">{item.title}</p>
                    <p className="text-sm text-gray-600">
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <p>Rs. {item.price * item.quantity}</p>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center mt-6">
              <span className="font-bold text-lg">
                Total: Rs. {selectedOrder.totalAmount}
              </span>

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
                className="border px-3 py-2 rounded"
              >
                <option value="PENDING">PENDING</option>
                <option value="CONFIRMED">CONFIRMED</option>
                <option value="SHIPPED">SHIPPED</option>
                <option value="CANCELLED">CANCELLED</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}