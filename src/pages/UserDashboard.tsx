import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/authContext"
import { useState } from "react"

export default function UserDashboard() {
  const navigate = useNavigate()
  const { setUser, user } = useAuth()
  const [activeTab, setActiveTab] = useState("overview")

  const handleLogout = () => {
    localStorage.removeItem("accessToken")
    localStorage.removeItem("refreshToken")
    setUser(null)
    navigate("/login")
  }

  // Mock user data - replace with actual API calls
  const [userData] = useState({
    firstname: user?.firstname || "John",
    lastname: user?.lastname || "Doe",
    email: user?.email || "john.doe@example.com",
    totalOrders: 12,
    pendingOrders: 2,
    completedOrders: 10,
    totalSpent: 45000
  })

  const recentOrders = [
    { id: "ORD001", date: "2024-01-15", status: "Delivered", total: 5500 },
    { id: "ORD002", date: "2024-01-10", status: "Shipped", total: 3200 },
    { id: "ORD003", date: "2024-01-05", status: "Processing", total: 4800 },
  ]

  const quickActions = [
    { icon: "🛍️", label: "Browse Products", action: () => navigate("/products") },
    { icon: "📦", label: "My Orders", action: () => setActiveTab("orders") },
    { icon: "👤", label: "Profile Settings", action: () => setActiveTab("profile") },
    { icon: "❤️", label: "Wishlist", action: () => navigate("/wishlist") },
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
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text mb-2">
                Welcome Back, {userData.firstname}! 👋
              </h1>
              <p className="text-purple-200 text-sm">Manage your account and track your orders</p>
            </div>
            <button
              onClick={handleLogout}
              className="backdrop-blur-sm bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-400 hover:to-pink-400 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 shadow-lg shadow-red-500/30 transform hover:scale-105"
            >
              <span className="text-xl">🚪</span>
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon="📦"
            label="Total Orders"
            value={userData.totalOrders}
            gradient="from-cyan-500 to-blue-500"
          />
          <StatCard
            icon="⏳"
            label="Pending Orders"
            value={userData.pendingOrders}
            gradient="from-yellow-500 to-orange-500"
          />
          <StatCard
            icon="✅"
            label="Completed"
            value={userData.completedOrders}
            gradient="from-green-500 to-emerald-500"
          />
          <StatCard
            icon="💰"
            label="Total Spent"
            value={`Rs. ${userData.totalSpent.toLocaleString()}`}
            gradient="from-purple-500 to-pink-500"
          />
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <button
                key={index}
                onClick={action.action}
                className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-purple-400/50 transition-all duration-300 transform hover:scale-105 group"
              >
                <div className="text-5xl mb-3 group-hover:scale-110 transition-transform">{action.icon}</div>
                <p className="text-white font-semibold">{action.label}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div className="backdrop-blur-sm bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
          <div className="flex border-b border-white/10">
            <TabButton
              active={activeTab === "overview"}
              onClick={() => setActiveTab("overview")}
              label="Overview"
              icon="📊"
            />
            <TabButton
              active={activeTab === "orders"}
              onClick={() => setActiveTab("orders")}
              label="Recent Orders"
              icon="📦"
            />
            <TabButton
              active={activeTab === "profile"}
              onClick={() => setActiveTab("profile")}
              label="Profile"
              icon="👤"
            />
          </div>

          <div className="p-6">
            {activeTab === "overview" && (
              <OverviewTab recentOrders={recentOrders} userData={userData} />
            )}
            {activeTab === "orders" && (
              <OrdersTab orders={recentOrders} />
            )}
            {activeTab === "profile" && (
              <ProfileTab userData={userData} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// Stat Card Component
function StatCard({ icon, label, value, gradient }: { icon: string; label: string; value: string | number; gradient: string }) {
  return (
    <div className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-2xl p-6 transform hover:scale-105 transition-all duration-300 group">
      <div className={`w-12 h-12 bg-gradient-to-br ${gradient} rounded-xl flex items-center justify-center text-2xl mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
        {icon}
      </div>
      <p className="text-purple-200 text-sm mb-1">{label}</p>
      <p className="text-3xl font-bold text-white">{value}</p>
    </div>
  )
}

// Tab Button Component
function TabButton({ active, onClick, label, icon }: { active: boolean; onClick: () => void; label: string; icon: string }) {
  return (
    <button
      onClick={onClick}
      className={`flex-1 px-6 py-4 font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
        active
          ? 'bg-gradient-to-r from-purple-500/30 to-pink-500/30 text-white border-b-2 border-purple-400'
          : 'text-purple-200 hover:bg-white/5'
      }`}
    >
      <span className="text-xl">{icon}</span>
      <span>{label}</span>
    </button>
  )
}

// Overview Tab Component
function OverviewTab({ recentOrders }: any) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold text-white mb-4">Account Summary</h3>
        <div className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl p-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p className="text-purple-300 text-sm mb-1">Account Status</p>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <p className="text-white font-semibold">Active & Verified</p>
              </div>
            </div>
            <div>
              <p className="text-purple-300 text-sm mb-1">Member Since</p>
              <p className="text-white font-semibold">January 2024</p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-bold text-white mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {recentOrders.slice(0, 3).map((order: any) => (
            <div
              key={order.id}
              className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl p-4 hover:border-purple-400/50 transition-all"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-white font-semibold">Order {order.id}</p>
                  <p className="text-purple-300 text-sm">{order.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-cyan-300 font-bold">Rs. {order.total.toLocaleString()}</p>
                  <span className={`text-xs px-3 py-1 rounded-full ${
                    order.status === 'Delivered' ? 'bg-green-500/20 text-green-200' :
                    order.status === 'Shipped' ? 'bg-blue-500/20 text-blue-200' :
                    'bg-yellow-500/20 text-yellow-200'
                  }`}>
                    {order.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Orders Tab Component
function OrdersTab({ orders }: any) {
  return (
    <div>
      <h3 className="text-xl font-bold text-white mb-4">All Orders</h3>
      <div className="space-y-4">
        {orders.map((order: any) => (
          <div
            key={order.id}
            className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl p-6 hover:border-purple-400/50 transition-all"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h4 className="text-white font-bold text-lg mb-1">Order {order.id}</h4>
                <p className="text-purple-300 text-sm">Placed on {order.date}</p>
              </div>
              <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                order.status === 'Delivered' ? 'bg-green-500/20 text-green-200 border border-green-400/40' :
                order.status === 'Shipped' ? 'bg-blue-500/20 text-blue-200 border border-blue-400/40' :
                'bg-yellow-500/20 text-yellow-200 border border-yellow-400/40'
              }`}>
                {order.status}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-2xl font-bold text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text">
                Rs. {order.total.toLocaleString()}
              </p>
              <button className="backdrop-blur-sm bg-cyan-500/20 text-cyan-200 px-4 py-2 rounded-lg hover:bg-cyan-500/30 transition-all border border-cyan-400/40">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Profile Tab Component
function ProfileTab({ userData }: any) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold text-white mb-4">Personal Information</h3>
        <div className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl p-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="text-purple-300 text-sm block mb-2">First Name</label>
              <input
                type="text"
                value={userData.firstname}
                className="w-full backdrop-blur-sm bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-400 transition-all"
                readOnly
              />
            </div>
            <div>
              <label className="text-purple-300 text-sm block mb-2">Last Name</label>
              <input
                type="text"
                value={userData.lastname}
                className="w-full backdrop-blur-sm bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-400 transition-all"
                readOnly
              />
            </div>
            <div className="md:col-span-2">
              <label className="text-purple-300 text-sm block mb-2">Email Address</label>
              <input
                type="email"
                value={userData.email}
                className="w-full backdrop-blur-sm bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-400 transition-all"
                readOnly
              />
            </div>
          </div>
          <div className="mt-6 flex gap-3">
            <button className="backdrop-blur-sm bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-cyan-400 hover:to-blue-400 transition-all shadow-lg shadow-cyan-500/30">
              Edit Profile
            </button>
            <button className="backdrop-blur-sm bg-white/10 border border-white/20 text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/20 transition-all">
              Change Password
            </button>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-bold text-white mb-4">Account Settings</h3>
        <div className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl p-6">
          <div className="space-y-4">
            <SettingItem
              icon="🔔"
              title="Email Notifications"
              description="Receive updates about your orders"
              enabled={true}
            />
            <SettingItem
              icon="📧"
              title="Marketing Emails"
              description="Get news about sales and promotions"
              enabled={false}
            />
            <SettingItem
              icon="🔒"
              title="Two-Factor Authentication"
              description="Add extra security to your account"
              enabled={false}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

// Setting Item Component
function SettingItem({ icon, title, description, enabled }: any) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-white/10 last:border-0">
      <div className="flex items-center gap-4">
        <div className="text-3xl">{icon}</div>
        <div>
          <p className="text-white font-semibold">{title}</p>
          <p className="text-purple-300 text-sm">{description}</p>
        </div>
      </div>
      <label className="relative inline-flex items-center cursor-pointer">
        <input type="checkbox" checked={enabled} className="sr-only peer" readOnly />
        <div className="w-11 h-6 bg-gray-700 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-purple-500 peer-checked:to-pink-500"></div>
      </label>
    </div>
  )
}