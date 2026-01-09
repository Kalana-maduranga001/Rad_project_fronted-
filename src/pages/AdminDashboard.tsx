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
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  AreaChart,
  Area
} from "recharts"

const STATUS_COLORS: Record<OrderStatus, string> = {
  PENDING: "#FCD34D",
  CONFIRMED: "#00D9FF",
  SHIPPED: "#00FFF2",
  CANCELLED: "#FF0055"
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

  if (loading) return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6 flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="absolute inset-0" style={{
        backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(99, 102, 241, 0.1) 0%, transparent 50%)'
      }}></div>
      <div className="relative">
        <div className="w-20 h-20 border-4 border-purple-400 rounded-full animate-spin" style={{ borderTopColor: 'transparent', borderRightColor: 'transparent' }}></div>
        <div className="absolute inset-0 w-20 h-20 border-4 border-purple-600/30 rounded-full"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-6 h-6 bg-purple-400 rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  )
  
  if (!stats) return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6 flex items-center justify-center">
      <p className="text-red-400 text-xl font-semibold">Failed to load dashboard</p>
    </div>
  )

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

  const radarData = [
    { category: 'Orders', value: Math.min(stats.totalOrders / 10, 100) },
    { category: 'Revenue', value: Math.min(stats.revenue / 10000, 100) },
    { category: 'Customers', value: Math.min(stats.customers * 2, 100) },
    { category: 'Pending', value: Math.min(stats.pendingOrders * 5, 100) },
    { category: 'Growth', value: 85 }
  ]

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
        <div className="mb-8 backdrop-blur-sm bg-white/5 rounded-2xl p-6 border border-white/10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                ADMIN DASHBOARD
              </h1>
              <p className="text-purple-200 text-sm">Monitor your business performance in real-time</p>
            </div>
            <div className="flex gap-2">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.3s' }}></div>
              <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '0.6s' }}></div>
            </div>
          </div>
        </div>

        {/* STATS CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <DashboardCard title="TOTAL ORDERS" value={stats.totalOrders} trend="12%" color="cyan" icon="📦" />
          <DashboardCard title="PENDING ORDERS" value={stats.pendingOrders} color="yellow" icon="⏳" />
          <DashboardCard
            title="REVENUE"
            value={`LKR ${stats.revenue.toLocaleString()}`}
            trend="8%"
            color="cyan"
            icon="💰"
          />
          <DashboardCard title="CUSTOMERS" value={stats.customers} color="teal" icon="👥" />
        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* ALERTS */}
          <Panel title="⚠️ ATTENTION REQUIRED" className="lg:col-span-1" glowColor="red">
            <ul className="space-y-3 text-sm">
              {stats.alerts.map((a, i) => (
                <li key={i} className="text-red-300 flex items-start backdrop-blur-sm bg-red-500/10 p-3 rounded-xl border border-red-500/30 hover:border-red-400 transition-all">
                  <span className="mr-2">▸</span>
                  <span>{a}</span>
                </li>
              ))}
            </ul>
          </Panel>

          {/* ORDER STATUS BARS */}
          <Panel title="ORDER STATUS SUMMARY" className="lg:col-span-2" glowColor="cyan">
            <div className="space-y-4">
              {Object.entries(stats.orderStatusCounts).map(([status, count]) => {
                const total = Object.values(stats.orderStatusCounts).reduce((a, b) => a + b, 0)
                const percentage = Math.round((count / total) * 100)
                const colors: Record<string, { bg: string, text: string }> = {
                  PENDING: { bg: 'bg-gradient-to-r from-yellow-400 to-yellow-500', text: 'text-yellow-300' },
                  CONFIRMED: { bg: 'bg-gradient-to-r from-cyan-400 to-cyan-500', text: 'text-cyan-300' },
                  SHIPPED: { bg: 'bg-gradient-to-r from-teal-400 to-teal-500', text: 'text-teal-300' },
                  CANCELLED: { bg: 'bg-gradient-to-r from-red-500 to-red-600', text: 'text-red-300' }
                }
                return (
                  <div key={status} className="transform hover:scale-105 transition-all duration-300">
                    <div className="flex justify-between text-sm mb-2">
                      <span className={`${colors[status].text} font-bold tracking-wider`}>{status}</span>
                      <span className="text-white font-bold backdrop-blur-sm bg-white/10 px-3 py-1 rounded-full border border-white/20">{percentage}%</span>
                    </div>
                    <div className="h-10 backdrop-blur-sm bg-white/5 rounded-full overflow-hidden relative border border-white/10">
                      <div 
                        className={`h-full ${colors[status].bg} relative`}
                        style={{ 
                          width: `${percentage}%`,
                          transition: 'width 1s ease-out'
                        }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                      </div>
                      <span className="absolute inset-0 flex items-center justify-center text-white font-bold text-base drop-shadow-lg">
                        {count}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          </Panel>
        </div>

        {/* SNAPSHOT */}
        <Panel title="TODAY & THIS WEEK" className="mb-8" glowColor="cyan">
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

        {/* CHARTS ROW 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* PIE CHART */}
          <Panel title="STATUS DISTRIBUTION" glowColor="cyan">
            <div className="relative">
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                <div className="text-center">
                  <div className="text-4xl font-black text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text">{stats.totalOrders}</div>
                  <div className="text-xs text-cyan-300 uppercase tracking-wider">Total Orders</div>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie 
                    data={orderStatusData} 
                    dataKey="value" 
                    nameKey="name" 
                    cx="50%" 
                    cy="50%"
                    innerRadius={80}
                    outerRadius={110}
                    paddingAngle={3}
                  >
                    {orderStatusData.map(entry => (
                      <Cell
                        key={entry.name}
                        fill={STATUS_COLORS[entry.name as OrderStatus]}
                        stroke="rgba(255,255,255,0.1)"
                        strokeWidth={2}
                      />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(15, 23, 42, 0.95)', 
                      border: '1px solid rgba(99, 102, 241, 0.3)',
                      borderRadius: '12px',
                      backdropFilter: 'blur(10px)',
                      color: '#fff'
                    }}
                    itemStyle={{ color: '#a5f3fc' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Panel>

          {/* AREA CHART */}
          <Panel title="REVENUE GROWTH" glowColor="cyan">
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00D9FF" stopOpacity={0.6}/>
                    <stop offset="95%" stopColor="#00D9FF" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="date" stroke="rgba(255,255,255,0.5)" style={{ fontSize: '10px' }} />
                <YAxis stroke="rgba(255,255,255,0.5)" style={{ fontSize: '10px' }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(15, 23, 42, 0.95)', 
                    border: '1px solid rgba(99, 102, 241, 0.3)',
                    borderRadius: '12px',
                    backdropFilter: 'blur(10px)'
                  }}
                  itemStyle={{ color: '#a5f3fc' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#00D9FF" 
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorRevenue)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </Panel>

          {/* RADAR CHART */}
          <Panel title="PERFORMANCE METRICS" glowColor="teal">
            <ResponsiveContainer width="100%" height={280}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="rgba(255,255,255,0.2)" />
                <PolarAngleAxis dataKey="category" stroke="rgba(255,255,255,0.7)" style={{ fontSize: '10px', fontWeight: 'bold' }} />
                <PolarRadiusAxis stroke="rgba(255,255,255,0.2)" />
                <Radar 
                  name="Performance" 
                  dataKey="value" 
                  stroke="#a78bfa" 
                  fill="#a78bfa" 
                  fillOpacity={0.6}
                  strokeWidth={2}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(15, 23, 42, 0.95)', 
                    border: '1px solid rgba(167, 139, 250, 0.3)',
                    borderRadius: '12px',
                    backdropFilter: 'blur(10px)'
                  }}
                  itemStyle={{ color: '#c4b5fd' }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </Panel>
        </div>

        {/* RECENT ORDERS TABLE */}
        <Panel title="RECENT ORDERS" className="mb-8" glowColor="cyan">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left border-b border-white/10">
                  <th className="py-4 text-cyan-300 font-bold uppercase tracking-wider">Order ID</th>
                  <th className="text-cyan-300 font-bold uppercase tracking-wider">Email</th>
                  <th className="text-cyan-300 font-bold uppercase tracking-wider">Status</th>
                  <th className="text-cyan-300 font-bold uppercase tracking-wider">Total</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {stats.recentOrders.map(order => (
                  <OrderRow key={order._id} order={order} />
                ))}
              </tbody>
            </table>
          </div>
        </Panel>

        {/* BOTTOM ROW */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* ACTIVITY */}
          <Panel title="RECENT ACTIVITY" glowColor="cyan">
            <ul className="space-y-3 text-sm">
              {stats.activityFeed.map((item, i) => (
                <li key={i} className="text-cyan-200 flex items-start backdrop-blur-sm bg-cyan-500/10 p-3 rounded-xl border border-cyan-500/20 hover:border-cyan-400/50 transition-all">
                  <span className="text-cyan-400 mr-3 text-base">▸</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Panel>

          {/* TOP PRODUCTS */}
          <Panel title="TOP SELLING PRODUCTS" glowColor="teal">
            <div className="space-y-4">
              {stats.topProducts.map((p, idx) => {
                const maxSold = Math.max(...stats.topProducts.map(prod => prod.sold))
                const percentage = (p.sold / maxSold) * 100
                const gradients = [
                  'from-cyan-400 to-cyan-600',
                  'from-purple-400 to-purple-600',
                  'from-pink-400 to-pink-600'
                ]
                const gradient = gradients[idx % gradients.length]
                
                return (
                  <div key={p.name} className="transform hover:scale-105 transition-all duration-300">
                    <div className="flex justify-between items-center text-sm mb-2">
                      <span className="text-cyan-200 font-semibold">{p.name}</span>
                      <span className="text-cyan-300 font-bold text-base backdrop-blur-sm bg-white/10 px-3 py-1 rounded-full border border-white/20">{p.sold}</span>
                    </div>
                    <div className="h-8 backdrop-blur-sm bg-white/5 rounded-full overflow-hidden border border-white/10">
                      <div 
                        className={`h-full bg-gradient-to-r ${gradient}`}
                        style={{ 
                          width: `${percentage}%`,
                          transition: 'width 1s ease-out'
                        }}
                      >
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </Panel>
        </div>
      </div>
    </div>
  )
}

/* ---------------- REUSABLES ---------------- */

function DashboardCard({
  title,
  value,
  trend,
  color = "cyan",
  icon = "📊"
}: {
  title: string
  value: string | number
  trend?: string
  color?: "cyan" | "yellow" | "gray" | "blue" | "teal"
  icon?: string
}) {
  const colorClasses = {
    cyan: {
      gradient: "from-cyan-500/20 to-blue-500/20",
      border: "border-cyan-400/30",
      text: "text-cyan-300",
      iconBg: "bg-cyan-500/20"
    },
    yellow: {
      gradient: "from-yellow-500/20 to-orange-500/20",
      border: "border-yellow-400/30",
      text: "text-yellow-300",
      iconBg: "bg-yellow-500/20"
    },
    blue: {
      gradient: "from-blue-500/20 to-indigo-500/20",
      border: "border-blue-400/30",
      text: "text-blue-300",
      iconBg: "bg-blue-500/20"
    },
    teal: {
      gradient: "from-teal-500/20 to-emerald-500/20",
      border: "border-teal-400/30",
      text: "text-teal-300",
      iconBg: "bg-teal-500/20"
    },
    gray: {
      gradient: "from-gray-500/20 to-slate-500/20",
      border: "border-gray-400/30",
      text: "text-gray-300",
      iconBg: "bg-gray-500/20"
    }
  }

  const classes = colorClasses[color]

  return (
    <div className={`relative backdrop-blur-sm bg-gradient-to-br ${classes.gradient} border ${classes.border} rounded-2xl p-6 transform hover:scale-105 transition-all duration-300 overflow-hidden group`}>
      <div className="absolute top-0 right-0 text-5xl opacity-10 group-hover:opacity-20 transition-opacity p-4">
        {icon}
      </div>
      <div className="relative z-10">
        <p className="text-white/70 text-xs uppercase tracking-wider font-bold mb-2">{title}</p>
        <p className={`text-4xl font-black ${classes.text} mb-1`}>{value}</p>
        {trend && (
          <div className="flex items-center mt-2">
            <div className="backdrop-blur-sm bg-white/10 border border-white/20 px-2 py-1 rounded-full flex items-center">
              <span className="text-green-400 mr-1 text-sm">▲</span>
              <span className="text-white font-semibold text-xs">{trend}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function Panel({
  title,
  children,
  className = "",
  glowColor = "cyan"
}: {
  title: string
  children: React.ReactNode
  className?: string
  glowColor?: "cyan" | "blue" | "teal" | "red"
}) {
  const glowColors = {
    cyan: "border-cyan-400/30 hover:border-cyan-400/50",
    blue: "border-blue-400/30 hover:border-blue-400/50",
    teal: "border-teal-400/30 hover:border-teal-400/50",
    red: "border-red-500/30 hover:border-red-500/50"
  }

  return (
    <div className={`relative backdrop-blur-sm bg-white/5 border ${glowColors[glowColor]} rounded-2xl p-6 ${className} transition-all duration-300 overflow-hidden`}>
      <div className="relative z-10">
        <div className="flex items-center mb-5 pb-4 border-b border-white/10">
          <h2 className="text-lg font-bold text-transparent bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text tracking-wide uppercase">
            {title}
          </h2>
        </div>
        {children}
      </div>
    </div>
  )
}

function Snapshot({ label, value }: { label: string; value: string }) {
  return (
    <div className="relative backdrop-blur-sm bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-400/30 rounded-xl p-5 text-center transform hover:scale-110 hover:-translate-y-1 transition-all duration-300 overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/0 to-pink-600/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
      <div className="relative z-10">
        <p className="text-xs text-purple-200 uppercase tracking-wider font-bold mb-2">{label}</p>
        <p className="text-3xl font-black text-transparent bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text">
          {value}
        </p>
      </div>
    </div>
  )
}

function OrderRow({ order }: { order: Order }) {
  const statusColors: Record<OrderStatus, string> = {
    PENDING: "bg-yellow-500/20 text-yellow-200 border-yellow-400/40",
    CONFIRMED: "bg-cyan-500/20 text-cyan-200 border-cyan-400/40",
    SHIPPED: "bg-teal-500/20 text-teal-200 border-teal-400/40",
    CANCELLED: "bg-red-500/20 text-red-200 border-red-400/40"
  }

  return (
    <tr className="border-b border-white/5 hover:bg-white/5 transition-all duration-300">
      <td className="py-4 text-cyan-200 font-semibold">#{order._id.slice(-6)}</td>
      <td className="text-white/70">{order.user.email}</td>
      <td>
        <span
          className={`px-3 py-1.5 text-xs rounded-full border ${statusColors[order.status]} font-bold uppercase tracking-wider backdrop-blur-sm`}
        >
          {order.status}
        </span>
      </td>
      <td className="text-cyan-300 font-bold text-base">LKR {order.totalAmount.toLocaleString()}</td>
      <td>
        <Link
          to={`/admin/orders?orderId=${order._id}`}
          className="inline-block backdrop-blur-sm bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-4 py-2 rounded-full font-semibold hover:from-cyan-400 hover:to-blue-400 transform hover:scale-110 transition-all duration-300"
        >
          VIEW →
        </Link>
      </td>
    </tr>
  )
}