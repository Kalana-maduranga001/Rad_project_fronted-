import { useState, type FormEvent } from "react"
import { getMyDetails, login } from "../services/auth"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/authContext"

export default function Login() {
  const navigate = useNavigate()

  const { setUser } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault()

    if (!email || !password) {
      alert("All fields are required")
      return
    }

    try {
      setLoading(true)
      const res = await login(email, password)

      if (!res.data.accessToken) {
        alert("Login failed")
        return
      }

      await localStorage.setItem("accessToken", res.data.accessToken)
      await localStorage.setItem("refreshToken", res.data.refreshToken)

      const detail = await getMyDetails()
      console.log(detail)

      if (!detail.data.isActive) {
        alert("Your account is disabled. Contact admin.")
        localStorage.removeItem("accessToken")
        localStorage.removeItem("refreshToken")
        return
      }

      setUser(detail.data)
      navigate("/")
    } catch (err) {
      console.error(err)
      alert("Login failed. Please check your credentials.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 w-screen h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 w-full h-full opacity-30">
        <div className="absolute top-20 left-20 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 left-40 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Login Card */}
      <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 w-full max-w-md shadow-2xl relative z-10 m-6">
        {/* Logo/Brand */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/50 transform rotate-12 hover:rotate-0 transition-all duration-300">
            <span className="text-white text-4xl font-bold transform -rotate-12 hover:rotate-0 transition-all duration-300">🔐</span>
          </div>
        </div>

        <h1 className="text-4xl font-bold text-center mb-2 text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text">
          Welcome Back
        </h1>
        <p className="text-center text-purple-200 mb-8 text-sm">
          Sign in to continue to your account
        </p>

        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          {/* Email Input */}
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <span className="text-purple-300 text-xl">📧</span>
            </div>
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-12 pr-4 py-3 backdrop-blur-sm bg-white/10 border border-white/20 rounded-xl text-white placeholder-purple-300/50 focus:outline-none focus:border-purple-400 focus:bg-white/20 transition-all"
            />
          </div>

          {/* Password Input */}
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <span className="text-purple-300 text-xl">🔒</span>
            </div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-12 pr-4 py-3 backdrop-blur-sm bg-white/10 border border-white/20 rounded-xl text-white placeholder-purple-300/50 focus:outline-none focus:border-purple-400 focus:bg-white/20 transition-all"
            />
          </div>

          {/* Forgot Password Link */}
          <div className="flex justify-end">
            <a href="#" className="text-purple-300 text-sm hover:text-purple-200 transition-colors">
              Forgot Password?
            </a>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full backdrop-blur-sm bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 text-white py-4 rounded-xl text-lg font-bold transition-all duration-300 shadow-lg shadow-purple-500/50 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Signing In...</span>
              </>
            ) : (
              <>
                <span>Sign In</span>
                <span className="text-xl">→</span>
              </>
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-4 my-6">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
          <span className="text-purple-300 text-sm">OR</span>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
        </div>

        {/* Register Link */}
        <p className="text-center text-purple-200">
          Don't have an account?{" "}
          <a 
            href="/register" 
            className="text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text font-bold hover:from-purple-300 hover:to-pink-300 transition-all"
          >
            Create Account
          </a>
        </p>

        {/* Additional Features */}
        <div className="mt-8 pt-6 border-t border-white/10">
          <div className="flex justify-center gap-4">
            <button className="backdrop-blur-sm bg-white/5 hover:bg-white/10 p-3 rounded-xl border border-white/10 transition-all transform hover:scale-110">
              <span className="text-2xl">🔗</span>
            </button>
            <button className="backdrop-blur-sm bg-white/5 hover:bg-white/10 p-3 rounded-xl border border-white/10 transition-all transform hover:scale-110">
              <span className="text-2xl">🌐</span>
            </button>
            <button className="backdrop-blur-sm bg-white/5 hover:bg-white/10 p-3 rounded-xl border border-white/10 transition-all transform hover:scale-110">
              <span className="text-2xl">📱</span>
            </button>
          </div>
          <p className="text-center text-purple-300 text-xs mt-4">
            Sign in with your preferred method
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-6 left-0 right-0 text-center">
        <p className="text-purple-300 text-sm">
          © 2024 Your Company. All rights reserved.
        </p>
      </div>

      <style>{`
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        /* Hide footer on login page */
        body footer,
        #root > footer,
        [role="contentinfo"] {
          display: none !important;
        }
      `}</style>
    </div>
  )
}