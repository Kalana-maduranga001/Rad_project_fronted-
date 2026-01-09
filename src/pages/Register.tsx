import { useState, type FormEvent } from "react"
import { register } from "../services/auth"
import { useNavigate } from "react-router-dom"

export default function Register() {
  const navigate = useNavigate()

  const [firstname, setFirstname] = useState("")
  const [lastname, setLastname] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [conPassword, setConPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const handleRgister = async (e: FormEvent) => {
    e.preventDefault()

    if (!firstname || !lastname || !email || !password || !conPassword) {
      alert("All fields are required.")
      return
    }

    if (password !== conPassword) {
      alert("Password do not match.")
      return
    }

    try {
      setLoading(true)
      const obj = {
        firstname,
        lastname,
        email,
        password,
        role: "USER"
      }
      const res: any = await register(obj)
      console.log(res.data)
      console.log(res.message)

      alert(`Registration successful! Email: ${res?.data?.email}`)
      navigate("/login")
    } catch (err: any) {
      console.error(err?.response?.data)
      alert("Registration failed. Please try again.")
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

      {/* Register Card */}
      <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 w-full max-w-lg shadow-2xl relative z-10 m-6 max-h-[90vh] overflow-y-auto">
        {/* Logo/Brand */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/50 transform rotate-12 hover:rotate-0 transition-all duration-300">
            <span className="text-white text-4xl font-bold transform -rotate-12 hover:rotate-0 transition-all duration-300">✨</span>
          </div>
        </div>

        <h1 className="text-4xl font-bold text-center mb-2 text-transparent bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text">
          Create Account
        </h1>
        <p className="text-center text-purple-200 mb-8 text-sm">
          Join us and start your journey today
        </p>

        <form onSubmit={handleRgister} className="flex flex-col gap-4">
          {/* Name Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <span className="text-purple-300 text-xl">👤</span>
              </div>
              <input
                type="text"
                placeholder="First Name"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                className="w-full pl-12 pr-4 py-3 backdrop-blur-sm bg-white/10 border border-white/20 rounded-xl text-white placeholder-purple-300/50 focus:outline-none focus:border-emerald-400 focus:bg-white/20 transition-all"
              />
            </div>

            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <span className="text-purple-300 text-xl">👤</span>
              </div>
              <input
                type="text"
                placeholder="Last Name"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                className="w-full pl-12 pr-4 py-3 backdrop-blur-sm bg-white/10 border border-white/20 rounded-xl text-white placeholder-purple-300/50 focus:outline-none focus:border-emerald-400 focus:bg-white/20 transition-all"
              />
            </div>
          </div>

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
              className="w-full pl-12 pr-4 py-3 backdrop-blur-sm bg-white/10 border border-white/20 rounded-xl text-white placeholder-purple-300/50 focus:outline-none focus:border-emerald-400 focus:bg-white/20 transition-all"
            />
          </div>

          {/* Password Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <span className="text-purple-300 text-xl">🔒</span>
              </div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-4 py-3 backdrop-blur-sm bg-white/10 border border-white/20 rounded-xl text-white placeholder-purple-300/50 focus:outline-none focus:border-emerald-400 focus:bg-white/20 transition-all"
              />
            </div>

            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <span className="text-purple-300 text-xl">🔑</span>
              </div>
              <input
                type="password"
                placeholder="Confirm Password"
                value={conPassword}
                onChange={(e) => setConPassword(e.target.value)}
                className="w-full pl-12 pr-4 py-3 backdrop-blur-sm bg-white/10 border border-white/20 rounded-xl text-white placeholder-purple-300/50 focus:outline-none focus:border-emerald-400 focus:bg-white/20 transition-all"
              />
            </div>
          </div>

          {/* Terms Checkbox */}
          <div className="flex items-center gap-3 mt-2">
            <input
              type="checkbox"
              id="terms"
              className="w-5 h-5 rounded border-white/20 bg-white/10 text-emerald-500 focus:ring-emerald-400 focus:ring-offset-0"
            />
            <label htmlFor="terms" className="text-purple-200 text-sm">
              I agree to the{" "}
              <a href="#" className="text-emerald-300 hover:text-emerald-200 transition-colors">
                Terms & Conditions
              </a>
            </label>
          </div>

          {/* Register Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 backdrop-blur-sm bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white py-4 rounded-xl text-lg font-bold transition-all duration-300 shadow-lg shadow-emerald-500/50 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Creating Account...</span>
              </>
            ) : (
              <>
                <span>Create Account</span>
                <span className="text-xl">✨</span>
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

        {/* Login Link */}
        <p className="text-center text-purple-200">
          Already have an account?{" "}
          <a 
            href="/login" 
            className="text-transparent bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text font-bold hover:from-emerald-300 hover:to-teal-300 transition-all"
          >
            Sign In
          </a>
        </p>

        {/* Social Sign Up */}
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
            Sign up with your preferred method
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
        
        /* Hide footer on register page */
        body footer,
        #root > footer,
        [role="contentinfo"] {
          display: none !important;
        }

        /* Custom scrollbar for the form */
        .overflow-y-auto::-webkit-scrollbar {
          width: 6px;
        }
        
        .overflow-y-auto::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        
        .overflow-y-auto::-webkit-scrollbar-thumb {
          background: rgba(16, 185, 129, 0.5);
          border-radius: 10px;
        }
        
        .overflow-y-auto::-webkit-scrollbar-thumb:hover {
          background: rgba(16, 185, 129, 0.7);
        }
      `}</style>
    </div>
  )
}