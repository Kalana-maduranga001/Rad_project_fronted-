import { useEffect, useState } from "react"
import {
  type DashboardStats,
  getDashboardStats,
  type Order,
  type OrderStatus
} from "../services/order"
import { Link } from "react-router-dom"
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from "recharts"

const STATUS_COLORS: Record<OrderStatus, string> = {
  PENDING: "#FACC15",
  CONFIRMED: "#60A5FA",
  SHIPPED: "#A78BFA",
  CANCELLED: "#F87171"
}

/* ---------------- COMPONENT ---------------- */

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const res = await getDashboardStats()
        setStats(res.data)
      } catch (err) {
        console.error("Failed to load dashboard", err)
      } finally {
        setLoading(false)
      }
    }

    loadDashboard()
  }, [])

  if (loading) return <p className="p-6">Loading dashboard...</p>
  if (!stats) return <p className="p-6 text-red-600">Failed to load dashboard</p>

  /* -------- CHART DATA -------- */

  const orderStatusData = Object.entries(stats.orderStatusCounts).map(
    ([status, count]) => ({
      name: status,
      value: count
    })
  )

  let runningTotal = 0
  const revenueData = stats.recentOrders
    .slice()
    .reverse()
    .map(order => {
      runningTotal += order.totalAmount
      return {
        date: new Date(order.createdAt).toLocaleDateString(),
        revenue: runningTotal
      }
    })

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <DashboardCard title="Total Orders" value={stats.totalOrders} trend="12%" />
        <DashboardCard title="Pending Orders" value={stats.pendingOrders} />
        <DashboardCard
          title="Revenue"
          value={`LKR ${stats.revenue.toLocaleString()}`}
          trend="8%"
        />
        <DashboardCard title="Customers" value={stats.customers} />
      </div>

      {/* ALERTS + SUMMARY */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Panel title="⚠️ Attention Required">
          <ul className="space-y-2 text-sm text-red-600">
            {stats.alerts.map((a, i) => (
              <li key={i}>• {a}</li>
            ))}
          </ul>
        </Panel>

        <Panel title="Order Status Summary">
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(stats.orderStatusCounts).map(
              ([status, count]) => (
                <div key={status} className="border rounded p-3 text-center">
                  <p className="text-sm text-gray-500">{status}</p>
                  <p className="text-xl font-bold">{count}</p>
                </div>
              )
            )}
          </div>
        </Panel>
      </div>

      {/* SNAPSHOT */}
      <Panel title="Today & This Week" className="mb-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Snapshot label="Orders Today" value={stats.snapshots.ordersToday.toString()} />
          <Snapshot
            label="Revenue Today"
            value={`LKR ${stats.snapshots.revenueToday.toLocaleString()}`}
          />
          <Snapshot label="Orders This Week" value={stats.snapshots.ordersThisWeek.toString()} />
          <Snapshot
            label="Revenue This Week"
            value={`LKR ${stats.snapshots.revenueThisWeek.toLocaleString()}`}
          />
        </div>
      </Panel>

      {/* RECENT ORDERS */}
      <Panel title="Recent Orders" className="mb-8">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left border-b">
              <th className="py-2">Order ID</th>
              <th>Email</th>
              <th>Status</th>
              <th>Total</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {stats.recentOrders.map(order => (
              <OrderRow key={order._id} order={order} />
            ))}
          </tbody>
        </table>
      </Panel>

      {/* CHARTS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Panel title="Order Status Distribution">
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={orderStatusData} dataKey="value" nameKey="name" label>
                {orderStatusData.map(entry => (
                  <Cell
                    key={entry.name}
                    fill={STATUS_COLORS[entry.name as OrderStatus]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Panel>

        <Panel title="Revenue Growth">
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="revenue" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </Panel>
      </div>

      {/* ACTIVITY + TOP PRODUCTS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Panel title="Recent Activity">
          <ul className="space-y-2 text-sm">
            {stats.activityFeed.map((item, i) => (
              <li key={i}>• {item}</li>
            ))}
          </ul>
        </Panel>

        <Panel title="Top Selling Products">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b">
                <th className="py-2">Product</th>
                <th>Sold</th>
              </tr>
            </thead>
            <tbody>
              {stats.topProducts.map(p => (
                <tr key={p.name} className="border-b">
                  <td className="py-2">{p.name}</td>
                  <td>{p.sold}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Panel>
      </div>
    </div>
  )
}

/* ---------------- REUSABLES ---------------- */

function DashboardCard({
  title,
  value,
  trend
}: {
  title: string
  value: string | number
  trend?: string
}) {
  return (
    <div className="bg-white shadow rounded-lg p-5">
      <p className="text-gray-500 text-sm">{title}</p>
      <p className="text-2xl font-bold mt-2">{value}</p>
      {trend && <p className="text-sm text-green-600 mt-1">▲ {trend}</p>}
    </div>
  )
}

function Panel({
  title,
  children,
  className = ""
}: {
  title: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={`bg-white shadow rounded-lg p-6 ${className}`}>
      <h2 className="text-lg font-semibold mb-4">{title}</h2>
      {children}
    </div>
  )
}

function Snapshot({ label, value }: { label: string; value: string }) {
  return (
    <div className="border rounded-lg p-4 text-center">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-xl font-bold mt-1">{value}</p>
    </div>
  )
}

function OrderRow({ order }: { order: Order }) {
  const statusColors: Record<OrderStatus, string> = {
    PENDING: "bg-yellow-100 text-yellow-700",
    CONFIRMED: "bg-blue-100 text-blue-700",
    SHIPPED: "bg-purple-100 text-purple-700",
    CANCELLED: "bg-red-100 text-red-700"
  }

  return (
    <tr className="border-b hover:bg-gray-50">
      <td className="py-2">#{order._id.slice(-6)}</td>
      <td>{order.user.email}</td>
      <td>
        <span
          className={`px-2 py-1 text-xs rounded ${statusColors[order.status]}`}
        >
          {order.status}
        </span>
      </td>
      <td>LKR {order.totalAmount.toLocaleString()}</td>
      <td>
        <Link
          to={`/admin/orders?orderId=${order._id}`}
          className="text-blue-600 hover:underline"
        >
          View
        </Link>
      </td>
    </tr>
  )
}