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
    <div className="min-h-screen bg-black p-6 flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(0, 217, 255, 0.05) 25%, rgba(0, 217, 255, 0.05) 26%, transparent 27%, transparent 74%, rgba(0, 217, 255, 0.05) 75%, rgba(0, 217, 255, 0.05) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(0, 217, 255, 0.05) 25%, rgba(0, 217, 255, 0.05) 26%, transparent 27%, transparent 74%, rgba(0, 217, 255, 0.05) 75%, rgba(0, 217, 255, 0.05) 76%, transparent 77%, transparent)',
        backgroundSize: '50px 50px'
      }}></div>
      <div className="relative">
        <div className="w-24 h-24 border-4 border-cyan-400 rounded-full animate-spin" style={{ borderTopColor: 'transparent', borderRightColor: 'transparent' }}></div>
        <div className="absolute inset-0 w-24 h-24 border-4 border-cyan-500/30 rounded-full"></div>
        <div className="absolute inset-2 w-20 h-20 border-2 border-cyan-300 rounded-full animate-ping"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 bg-cyan-400 rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  )
  
  if (!stats) return (
    <div className="min-h-screen bg-black p-6 flex items-center justify-center">
      <p className="text-red-500 text-xl font-mono">[ SYSTEM ERROR ] Failed to load dashboard</p>
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
    <div className="min-h-screen bg-black p-6 relative overflow-hidden">
      {/* Tech Grid Background */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(0, 217, 255, 0.1) 25%, rgba(0, 217, 255, 0.1) 26%, transparent 27%, transparent 74%, rgba(0, 217, 255, 0.1) 75%, rgba(0, 217, 255, 0.1) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(0, 217, 255, 0.1) 25%, rgba(0, 217, 255, 0.1) 26%, transparent 27%, transparent 74%, rgba(0, 217, 255, 0.1) 75%, rgba(0, 217, 255, 0.1) 76%, transparent 77%, transparent)',
        backgroundSize: '50px 50px'
      }}></div>

      {/* Animated Corner Elements */}
      <div className="absolute top-0 left-0 w-32 h-32 border-t-4 border-l-4 border-cyan-400"></div>
      <div className="absolute top-0 right-0 w-32 h-32 border-t-4 border-r-4 border-cyan-400"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 border-b-4 border-l-4 border-cyan-400"></div>
      <div className="absolute bottom-0 right-0 w-32 h-32 border-b-4 border-r-4 border-cyan-400"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-8 flex items-center border-l-4 border-cyan-400 pl-6 py-2">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse mr-3"></div>
            <div className="w-2 h-2 bg-cyan-300 rounded-full animate-pulse mr-3" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-2 h-2 bg-cyan-200 rounded-full animate-pulse mr-6" style={{ animationDelay: '0.4s' }}></div>
          </div>
          <h1 className="text-5xl font-black text-cyan-400 tracking-widest font-mono" style={{ textShadow: '0 0 20px rgba(0, 217, 255, 0.8)' }}>
            {' ADMIN DASHBOARD '}
          </h1>
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
                <li key={i} className="text-red-400 flex items-start bg-red-950/30 p-3 rounded border-l-2 border-red-500 transform hover:translate-x-2 transition-transform font-mono">
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
                const colors: Record<string, { bg: string, glow: string, text: string }> = {
                  PENDING: { bg: 'bg-yellow-400', glow: 'shadow-yellow-400/50', text: 'text-yellow-400' },
                  CONFIRMED: { bg: 'bg-cyan-400', glow: 'shadow-cyan-400/50', text: 'text-cyan-400' },
                  SHIPPED: { bg: 'bg-teal-400', glow: 'shadow-teal-400/50', text: 'text-teal-400' },
                  CANCELLED: { bg: 'bg-red-500', glow: 'shadow-red-500/50', text: 'text-red-500' }
                }
                return (
                  <div key={status} className="transform hover:scale-105 transition-all duration-300">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-cyan-300 font-bold tracking-widest font-mono">{status}</span>
                      <span className="text-white font-bold bg-black border border-cyan-400 px-3 py-1 rounded font-mono">{percentage}%</span>
                    </div>
                    <div className="h-10 bg-black rounded overflow-hidden relative border-2 border-cyan-900">
                      <div 
                        className={`h-full ${colors[status].bg} shadow-lg ${colors[status].glow} relative`}
                        style={{ 
                          width: `${percentage}%`,
                          transition: 'width 1s ease-out',
                          boxShadow: `0 0 20px ${colors[status].bg}`
                        }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
                      </div>
                      <span className="absolute inset-0 flex items-center justify-center text-white font-bold text-lg drop-shadow-lg font-mono">
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
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl font-black text-cyan-400 font-mono">{stats.totalOrders}</div>
                  <div className="text-xs text-cyan-600 uppercase font-mono tracking-wider">Total Orders</div>
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
                        stroke="#000"
                        strokeWidth={2}
                      />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#000', 
                      border: '2px solid #00D9FF',
                      borderRadius: '4px',
                      boxShadow: '0 0 20px rgba(0, 217, 255, 0.5)',
                      fontFamily: 'monospace'
                    }}
                    itemStyle={{ color: '#00D9FF', fontWeight: 'bold' }}
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
                    <stop offset="5%" stopColor="#00D9FF" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#00D9FF" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#00D9FF" opacity={0.1} />
                <XAxis dataKey="date" stroke="#00D9FF" style={{ fontSize: '10px', fontFamily: 'monospace' }} />
                <YAxis stroke="#00D9FF" style={{ fontSize: '10px', fontFamily: 'monospace' }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#000', 
                    border: '2px solid #00D9FF',
                    borderRadius: '4px',
                    boxShadow: '0 0 20px rgba(0, 217, 255, 0.5)',
                    fontFamily: 'monospace'
                  }}
                  itemStyle={{ color: '#00D9FF', fontWeight: 'bold' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#00D9FF" 
                  strokeWidth={2}
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
                <PolarGrid stroke="#00D9FF" opacity={0.3} />
                <PolarAngleAxis dataKey="category" stroke="#00D9FF" style={{ fontSize: '10px', fontWeight: 'bold', fontFamily: 'monospace' }} />
                <PolarRadiusAxis stroke="#00D9FF" opacity={0.3} />
                <Radar 
                  name="Performance" 
                  dataKey="value" 
                  stroke="#00FFF2" 
                  fill="#00FFF2" 
                  fillOpacity={0.6}
                  strokeWidth={2}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#000', 
                    border: '2px solid #00FFF2',
                    borderRadius: '4px',
                    boxShadow: '0 0 20px rgba(0, 255, 242, 0.5)',
                    fontFamily: 'monospace'
                  }}
                  itemStyle={{ color: '#00FFF2', fontWeight: 'bold' }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </Panel>
        </div>

        {/* RECENT ORDERS TABLE */}
        <Panel title="RECENT ORDERS" className="mb-8" glowColor="cyan">
          <div className="overflow-x-auto">
            <table className="w-full text-sm font-mono">
              <thead>
                <tr className="text-left border-b-2 border-cyan-400">
                  <th className="py-4 text-cyan-400 font-bold uppercase tracking-wider">Order ID</th>
                  <th className="text-cyan-400 font-bold uppercase tracking-wider">Email</th>
                  <th className="text-cyan-400 font-bold uppercase tracking-wider">Status</th>
                  <th className="text-cyan-400 font-bold uppercase tracking-wider">Total</th>
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
            <ul className="space-y-3 text-sm font-mono">
              {stats.activityFeed.map((item, i) => (
                <li key={i} className="text-cyan-300 flex items-start bg-cyan-950/20 p-3 rounded border-l-2 border-cyan-400 transform hover:translate-x-2 transition-all hover:shadow-lg hover:shadow-cyan-400/20">
                  <span className="text-cyan-400 mr-3 text-lg">▸</span>
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
                const colors = [
                  { bg: 'bg-cyan-400', shadow: 'shadow-cyan-400/50' },
                  { bg: 'bg-teal-400', shadow: 'shadow-teal-400/50' },
                  { bg: 'bg-blue-400', shadow: 'shadow-blue-400/50' }
                ]
                const color = colors[idx % colors.length]
                
                return (
                  <div key={p.name} className="transform hover:scale-105 transition-all duration-300">
                    <div className="flex justify-between items-center text-sm mb-2">
                      <span className="text-cyan-200 font-semibold font-mono">{p.name}</span>
                      <span className="text-cyan-400 font-black text-lg bg-black px-3 py-1 rounded border border-cyan-400 font-mono">{p.sold}</span>
                    </div>
                    <div className="h-8 bg-black rounded overflow-hidden relative border-2 border-cyan-900">
                      <div 
                        className={`h-full ${color.bg} shadow-xl ${color.shadow} relative`}
                        style={{ 
                          width: `${percentage}%`,
                          transition: 'width 1s ease-out'
                        }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
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
      border: "border-cyan-400",
      glow: "shadow-cyan-400/50",
      text: "text-cyan-400",
      bg: "bg-cyan-400/10"
    },
    yellow: {
      border: "border-yellow-400",
      glow: "shadow-yellow-400/50",
      text: "text-yellow-400",
      bg: "bg-yellow-400/10"
    },
    blue: {
      border: "border-blue-400",
      glow: "shadow-blue-400/50",
      text: "text-blue-400",
      bg: "bg-blue-400/10"
    },
    teal: {
      border: "border-teal-400",
      glow: "shadow-teal-400/50",
      text: "text-teal-400",
      bg: "bg-teal-400/10"
    },
    gray: {
      border: "border-gray-400",
      glow: "shadow-gray-400/50",
      text: "text-gray-400",
      bg: "bg-gray-400/10"
    }
  }

  const classes = colorClasses[color]

  return (
    <div className={`relative ${classes.bg} border-2 ${classes.border} rounded p-6 shadow-2xl ${classes.glow} transform hover:scale-105 transition-all duration-300 overflow-hidden`}>
      {/* Corner decorations */}
      <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-white"></div>
      <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-white"></div>
      <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-white"></div>
      <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-white"></div>
      
      <div className="absolute top-0 right-0 text-6xl opacity-10 transform rotate-12">
        {icon}
      </div>
      <div className="relative z-10">
        <p className="text-gray-400 text-xs uppercase tracking-widest font-bold mb-2 font-mono">{title}</p>
        <p className={`text-4xl font-black ${classes.text} drop-shadow-lg mb-1 font-mono`} style={{ textShadow: `0 0 10px currentColor` }}>{value}</p>
        {trend && (
          <div className="flex items-center mt-2">
            <div className="bg-cyan-400/20 border border-cyan-400 px-2 py-1 rounded flex items-center">
              <span className="text-cyan-400 mr-1">▲</span>
              <span className="text-cyan-400 font-bold text-sm font-mono">{trend}</span>
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
    cyan: "shadow-cyan-400/30 border-cyan-400",
    blue: "shadow-blue-400/30 border-blue-400",
    teal: "shadow-teal-400/30 border-teal-400",
    red: "shadow-red-500/30 border-red-500"
  }

  return (
    <div className={`relative bg-black border-2 ${glowColors[glowColor]} rounded p-6 shadow-2xl ${className} transform hover:scale-[1.01] transition-all duration-300 overflow-hidden`}>
      {/* Corner decorations */}
      <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-white opacity-50"></div>
      <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-white opacity-50"></div>
      <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-white opacity-50"></div>
      <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-white opacity-50"></div>
      
      <div className="relative z-10">
        <div className="flex items-center mb-5 pb-4 border-b-2 border-cyan-400">
          <div className="flex items-center mr-4">
            <div className="w-2 h-2 bg-cyan-400 mr-1"></div>
            <div className="w-2 h-2 bg-cyan-400 mr-1"></div>
            <div className="w-2 h-2 bg-cyan-400"></div>
          </div>
          <h2 className="text-xl font-black text-cyan-400 tracking-wider uppercase font-mono" style={{ textShadow: '0 0 10px rgba(0, 217, 255, 0.8)' }}>
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
    <div className="relative border-2 border-cyan-400 bg-cyan-400/10 rounded p-5 text-center shadow-xl shadow-cyan-400/20 transform hover:scale-110 hover:-translate-y-1 transition-all duration-300 overflow-hidden">
      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-white"></div>
      <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-white"></div>
      <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-white"></div>
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-white"></div>
      
      <div className="relative z-10">
        <p className="text-xs text-cyan-600 uppercase tracking-widest font-bold mb-2 font-mono">{label}</p>
        <p className="text-3xl font-black text-cyan-400 drop-shadow-lg font-mono" style={{ textShadow: '0 0 15px rgba(0, 217, 255, 0.8)' }}>
          {value}
        </p>
      </div>
    </div>
  )
}

function OrderRow({ order }: { order: Order }) {
  const statusColors: Record<OrderStatus, string> = {
    PENDING: "bg-yellow-400/20 text-yellow-300 border-yellow-400 shadow-yellow-400/30",
    CONFIRMED: "bg-cyan-400/20 text-cyan-300 border-cyan-400 shadow-cyan-400/30",
    SHIPPED: "bg-teal-400/20 text-teal-300 border-teal-400 shadow-teal-400/30",
    CANCELLED: "bg-red-500/20 text-red-300 border-red-500 shadow-red-500/30"
  }

  return (
    <tr className="border-b border-cyan-900 hover:bg-cyan-950/30 transition-all duration-300 transform hover:scale-[1.01]">
      <td className="py-4 text-cyan-200 font-mono font-bold">#{order._id.slice(-6)}</td>
      <td className="text-gray-300 font-mono">{order.user.email}</td>
      <td>
        <span
          className={`px-4 py-1.5 text-xs rounded border-2 ${statusColors[order.status]} font-bold uppercase tracking-wider shadow-lg font-mono`}
        >
          {order.status}
        </span>
      </td>
      <td className="text-cyan-400 font-black text-lg font-mono">LKR {order.totalAmount.toLocaleString()}</td>
      <td>
        <Link
          to={`/admin/orders?orderId=${order._id}`}
          className="inline-block bg-cyan-400 text-black px-4 py-2 rounded font-bold hover:bg-cyan-300 transform hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-cyan-400/50 font-mono"
        >
          VIEW →
        </Link>
      </td>
    </tr>
  )
}