import Header from "./Header";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/authContext";

export default function AdminLayout() {
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setUser(null);
    navigate("/login");
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navLinks = [
    { path: "/dashboard/admin", label: "Dashboard", icon: "📊" },
    { path: "/dashboard/admin/users", label: "Manage Users", icon: "👥" },
    { path: "/dashboard/admin/products", label: "Manage Products", icon: "📦" },
    { path: "/dashboard/admin/orders", label: "Orders", icon: "🛒" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-20 left-20 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 left-40 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Shared Header */}
      <Header />

      <div className="flex flex-1 relative z-10">
        {/* Sidebar */}
        <aside className="w-72 backdrop-blur-xl bg-slate-900/80 border-r border-white/10 flex flex-col justify-between p-6 shadow-2xl">
          <div>
            {/* Logo/Brand Section */}
            <div className="mb-8 pb-6 border-b border-white/10">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/50">
                  <span className="text-white text-xl font-bold">A</span>
                </div>
                <h2 className="text-2xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text">
                  Admin Panel
                </h2>
              </div>
              <p className="text-purple-300 text-sm pl-1">Control Center</p>
            </div>

            {/* Navigation */}
            <nav className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.path}
                  href={link.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    isActive(link.path)
                      ? 'backdrop-blur-sm bg-gradient-to-r from-purple-500/30 to-pink-500/30 border border-purple-400/50 text-white shadow-lg shadow-purple-500/20'
                      : 'text-purple-200 hover:bg-white/10 hover:text-white border border-transparent hover:border-white/20'
                  }`}
                >
                  <span className="text-2xl">{link.icon}</span>
                  <span>{link.label}</span>
                  {isActive(link.path) && (
                    <div className="ml-auto w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                  )}
                </a>
              ))}
            </nav>

            {/* Stats/Info Card */}
            <div className="mt-8 backdrop-blur-sm bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-400/30 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-green-300 text-xs font-semibold uppercase tracking-wider">System Status</span>
              </div>
              <p className="text-white font-bold text-lg">All Systems Operational</p>
              <p className="text-cyan-200 text-xs mt-1">Last updated: Just now</p>
            </div>
          </div>

          {/* Logout button at bottom */}
          <div className="space-y-3">
            {/* Admin Info */}
            <div className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl p-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">👤</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-semibold text-sm truncate">Admin User</p>
                  <p className="text-purple-300 text-xs">Administrator</p>
                </div>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="w-full backdrop-blur-sm bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-400 hover:to-pink-400 text-white py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-red-500/30 transform hover:scale-105"
            >
              <span className="text-xl">🚪</span>
              <span>Logout</span>
            </button>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}