import { useEffect, useState } from "react"
import type { UserType } from "../services/admin"
import {
  getAllUsers,
  toggleUserStatus as toggleUserStatusApi,
  deleteUser as deleteUserApi,
  updateUser as updateUserApi,
  createAdmin,
} from "../services/admin"

export default function AdminUsers() {
  const [users, setUsers] = useState<UserType[]>([])
  const [loading, setLoading] = useState(true)

  const [editingUser, setEditingUser] = useState<UserType | null>(null)
  const [formData, setFormData] = useState<Partial<UserType>>({})

  const [showAddAdmin, setShowAddAdmin] = useState(false)
  const [newAdmin, setNewAdmin] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  })

  // Load Users
  const fetchUsers = async () => {
    try {
      const data = await getAllUsers()
      setUsers(data)
    } catch (err) {
      console.error(err)
      alert("Failed to load users")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const toggleUserStatus = async (id: string) => {
    await toggleUserStatusApi(id)
    fetchUsers()
  }

  const deleteUser = async (id: string) => {
    if (!confirm("Delete this user?")) return
    await deleteUserApi(id)
    fetchUsers()
  }

  const handleEdit = (user: UserType) => {
    setEditingUser(user)
    setFormData(user)
  }

  const handleUpdate = async () => {
    if (!editingUser) return
    await updateUserApi(editingUser._id, formData)
    setEditingUser(null)
    fetchUsers()
  }

  const handleAddAdmin = async () => {
    const { firstname, lastname, email, password } = newAdmin

    if (!firstname || !lastname || !email || !password) {
      alert("All fields are required")
      return
    }

    try {
      await createAdmin({
        firstname,
        lastname,
        email,
        password,
        role: "ADMIN",
      })

      setShowAddAdmin(false)
      setNewAdmin({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
      })

      fetchUsers()
    } catch (err) {
      console.error(err)
      alert("Failed to create admin")
    }
  }

  if (loading) return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-purple-400 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-purple-200 font-medium">Loading users...</p>
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
              Manage Users
            </h1>
            <p className="text-purple-200 text-sm">Control user access and permissions</p>
          </div>

          <button
            onClick={() => setShowAddAdmin(true)}
            className="backdrop-blur-sm bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-green-400 hover:to-emerald-400 transform hover:scale-105 transition-all duration-300 shadow-lg shadow-green-500/30 flex items-center gap-2"
          >
            <span className="text-xl">+</span>
            Add Admin
          </button>
        </div>

        {/* Users Table */}
        <div className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-2xl p-6 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="p-4 text-left text-cyan-300 font-bold uppercase tracking-wider text-sm">Name</th>
                  <th className="p-4 text-left text-cyan-300 font-bold uppercase tracking-wider text-sm">Email</th>
                  <th className="p-4 text-left text-cyan-300 font-bold uppercase tracking-wider text-sm">Role</th>
                  <th className="p-4 text-left text-cyan-300 font-bold uppercase tracking-wider text-sm">Status</th>
                  <th className="p-4 text-left text-cyan-300 font-bold uppercase tracking-wider text-sm">Actions</th>
                </tr>
              </thead>

              <tbody>
                {users.map((user) => (
                  <tr key={user._id} className="border-b border-white/5 hover:bg-white/5 transition-all duration-300">
                    <td className="p-4 text-white font-medium">
                      {user.firstname} {user.lastname}
                    </td>
                    <td className="p-4 text-purple-200">{user.email}</td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-sm border ${
                        user.role === 'ADMIN' 
                          ? 'bg-purple-500/20 text-purple-200 border-purple-400/40'
                          : 'bg-blue-500/20 text-blue-200 border-blue-400/40'
                      }`}>
                        {user.role}
                      </span>
                    </td>

                    <td className="p-4">
                      {user.isActive ? (
                        <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-sm bg-green-500/20 text-green-200 border border-green-400/40">
                          Active
                        </span>
                      ) : (
                        <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-sm bg-red-500/20 text-red-200 border border-red-400/40">
                          Disabled
                        </span>
                      )}
                    </td>

                    <td className="p-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(user)}
                          className="backdrop-blur-sm bg-blue-500/20 text-blue-200 px-4 py-2 rounded-lg font-semibold hover:bg-blue-500/30 transition-all border border-blue-400/40"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => toggleUserStatus(user._id)}
                          className={`backdrop-blur-sm px-4 py-2 rounded-lg font-semibold transition-all border ${
                            user.isActive 
                              ? 'bg-yellow-500/20 text-yellow-200 border-yellow-400/40 hover:bg-yellow-500/30'
                              : 'bg-green-500/20 text-green-200 border-green-400/40 hover:bg-green-500/30'
                          }`}
                        >
                          {user.isActive ? "Disable" : "Enable"}
                        </button>

                        <button
                          onClick={() => deleteUser(user._id)}
                          className="backdrop-blur-sm bg-red-500/20 text-red-200 px-4 py-2 rounded-lg font-semibold hover:bg-red-500/30 transition-all border border-red-400/40"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ADD ADMIN MODAL */}
        {showAddAdmin && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50 p-4">
            <div className="backdrop-blur-xl bg-gradient-to-br from-slate-900/90 to-purple-900/90 border border-white/20 p-8 w-full max-w-md rounded-2xl shadow-2xl transform animate-scale-in">
              <h2 className="text-3xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text mb-6">
                Add New Admin
              </h2>

              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="First Name"
                  value={newAdmin.firstname}
                  onChange={(e) =>
                    setNewAdmin({ ...newAdmin, firstname: e.target.value })
                  }
                  className="w-full p-3 backdrop-blur-sm bg-white/10 border border-white/20 rounded-xl text-white placeholder-purple-300/50 focus:outline-none focus:border-purple-400 transition-all"
                />

                <input
                  type="text"
                  placeholder="Last Name"
                  value={newAdmin.lastname}
                  onChange={(e) =>
                    setNewAdmin({ ...newAdmin, lastname: e.target.value })
                  }
                  className="w-full p-3 backdrop-blur-sm bg-white/10 border border-white/20 rounded-xl text-white placeholder-purple-300/50 focus:outline-none focus:border-purple-400 transition-all"
                />

                <input
                  type="email"
                  placeholder="Email"
                  value={newAdmin.email}
                  onChange={(e) =>
                    setNewAdmin({ ...newAdmin, email: e.target.value })
                  }
                  className="w-full p-3 backdrop-blur-sm bg-white/10 border border-white/20 rounded-xl text-white placeholder-purple-300/50 focus:outline-none focus:border-purple-400 transition-all"
                />

                <input
                  type="password"
                  placeholder="Password"
                  value={newAdmin.password}
                  onChange={(e) =>
                    setNewAdmin({ ...newAdmin, password: e.target.value })
                  }
                  className="w-full p-3 backdrop-blur-sm bg-white/10 border border-white/20 rounded-xl text-white placeholder-purple-300/50 focus:outline-none focus:border-purple-400 transition-all"
                />
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setShowAddAdmin(false)}
                  className="px-6 py-3 backdrop-blur-sm bg-white/10 border border-white/20 text-white rounded-xl hover:bg-white/20 transition-all font-semibold"
                >
                  Cancel
                </button>

                <button
                  onClick={handleAddAdmin}
                  className="px-6 py-3 backdrop-blur-sm bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl hover:from-green-400 hover:to-emerald-400 transition-all font-semibold shadow-lg shadow-green-500/30"
                >
                  Create Admin
                </button>
              </div>
            </div>
          </div>
        )}

        {/* EDIT USER MODAL */}
        {editingUser && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50 p-4">
            <div className="backdrop-blur-xl bg-gradient-to-br from-slate-900/90 to-purple-900/90 border border-white/20 p-8 w-full max-w-md rounded-2xl shadow-2xl transform animate-scale-in">
              <h2 className="text-3xl font-bold text-transparent bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text mb-6">
                Edit User
              </h2>

              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="First Name"
                  className="w-full p-3 backdrop-blur-sm bg-white/10 border border-white/20 rounded-xl text-white placeholder-purple-300/50 focus:outline-none focus:border-cyan-400 transition-all"
                  value={formData.firstname || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, firstname: e.target.value })
                  }
                />

                <input
                  type="text"
                  placeholder="Last Name"
                  className="w-full p-3 backdrop-blur-sm bg-white/10 border border-white/20 rounded-xl text-white placeholder-purple-300/50 focus:outline-none focus:border-cyan-400 transition-all"
                  value={formData.lastname || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, lastname: e.target.value })
                  }
                />

                <input
                  type="email"
                  placeholder="Email"
                  className="w-full p-3 backdrop-blur-sm bg-white/10 border border-white/20 rounded-xl text-white placeholder-purple-300/50 focus:outline-none focus:border-cyan-400 transition-all"
                  value={formData.email || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />

                <select
                  className="w-full p-3 backdrop-blur-sm bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-cyan-400 transition-all"
                  value={formData.role || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      role: e.target.value as "USER" | "ADMIN",
                    })
                  }
                >
                  <option value="USER" className="bg-slate-900">User</option>
                  <option value="ADMIN" className="bg-slate-900">Admin</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setEditingUser(null)}
                  className="px-6 py-3 backdrop-blur-sm bg-white/10 border border-white/20 text-white rounded-xl hover:bg-white/20 transition-all font-semibold"
                >
                  Cancel
                </button>

                <button
                  onClick={handleUpdate}
                  className="px-6 py-3 backdrop-blur-sm bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl hover:from-cyan-400 hover:to-blue-400 transition-all font-semibold shadow-lg shadow-cyan-500/30"
                >
                  Save
                </button>
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