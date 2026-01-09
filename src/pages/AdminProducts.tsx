import { useEffect, useState } from "react"
import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
  type ProductType,
  type Gender,
  type Category,
} from "../services/product"

const CATEGORIES: Category[] = [
  "TSHIRT",
  "SHIRT",
  "SHORT",
  "DENIM",
  "OFFICEWEAR",
]

const GENDERS: Gender[] = ["MEN", "WOMEN", "UNISEX"]

export default function AdminProducts() {
  const [products, setProducts] = useState<ProductType[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [editingProductId, setEditingProductId] = useState<string | null>(null)

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "" as Category | "",
    gender: "" as Gender | "",
    sizes: "",
    price: "",
    stock: "",
  })

  const [images, setImages] = useState<FileList | null>(null)

  const fetchProducts = async () => {
    setLoading(true)
    try {
      const res = await getProducts(page, 10)
      setProducts(res.data)
      setTotalPages(res.totalPages)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [page])

  const buildFormData = (includeImages = true) => {
    const fd = new FormData()
    
    fd.append("title", form.title)
    fd.append("description", form.description)
    fd.append("category", form.category)
    fd.append("gender", form.gender)
    
    const sizesArray = form.sizes.split(",").map(s => s.trim()).filter(Boolean)
    sizesArray.forEach(size => fd.append("sizes", size))
    
    fd.append("price", form.price)
    fd.append("stock", form.stock)

    if (includeImages && images) {
      Array.from(images).forEach((img) => fd.append("images", img))
    }
    
    return fd
  }

  const handleCreate = async () => {
    if (!images || images.length === 0 || !form.gender || !form.category) {
      alert("Gender, Category and at least 1 image are required")
      return
    }

    try {
      await createProduct(buildFormData(true))

      setForm({
        title: "",
        description: "",
        category: "",
        gender: "",
        sizes: "",
        price: "",
        stock: "",
      })
      setImages(null)

      const fileInput = document.getElementById(
        "product-images"
      ) as HTMLInputElement
      if (fileInput) fileInput.value = ""

      setShowAddModal(false)
      fetchProducts()
    } catch (err) {
      console.error(err)
      alert("Failed to create product")
    }
  }

  const handleOpenEdit = (p: ProductType) => {
    setEditingProductId(p._id)
    setForm({
      title: p.title,
      description: p.description || "",
      category: p.category,
      gender: p.gender,
      sizes: p.sizes.join(","),
      price: String(p.price),
      stock: String(p.stock),
    })
    setImages(null)
    setShowEditModal(true)
  }

  const handleUpdate = async () => {
    if (!editingProductId) return

    try {
      await updateProduct(
        editingProductId,
        buildFormData(images !== null)
      )
      setShowEditModal(false)
      setEditingProductId(null)
      fetchProducts()
    } catch (err) {
      console.error(err)
      alert("Failed to update product")
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this product?")) return

    try {
      await deleteProduct(id)
      fetchProducts()
    } catch (err) {
      console.error(err)
      alert("Failed to delete product")
    }
  }

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
              Product Management
            </h1>
            <p className="text-purple-200 text-sm">Manage your product catalog</p>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="backdrop-blur-sm bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-cyan-400 hover:to-blue-400 transform hover:scale-105 transition-all duration-300 shadow-lg shadow-cyan-500/30 flex items-center gap-2"
          >
            <span className="text-xl">+</span>
            Add Product
          </button>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 border-4 border-purple-400 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-purple-200 font-medium">Loading products...</p>
            </div>
          </div>
        ) : (
          <>
            {/* Products Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {products.map((p) => (
                <div 
                  key={p._id} 
                  className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-2xl overflow-hidden transform hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20 group"
                >
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={p.imageUrls[0]}
                      alt={p.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-3 right-3">
                      <span className="backdrop-blur-sm bg-purple-500/80 text-white px-3 py-1 rounded-full text-xs font-bold">
                        Stock: {p.stock}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-5">
                    <h2 className="font-bold text-xl text-white mb-2 line-clamp-1">{p.title}</h2>
                    
                    <div className="flex gap-2 mb-3">
                      <span className="backdrop-blur-sm bg-cyan-500/20 text-cyan-200 px-3 py-1 rounded-full text-xs font-semibold border border-cyan-400/30">
                        {p.category}
                      </span>
                      <span className="backdrop-blur-sm bg-pink-500/20 text-pink-200 px-3 py-1 rounded-full text-xs font-semibold border border-pink-400/30">
                        {p.gender}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 mb-4">
                      <p className="text-2xl font-black text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text">
                        Rs. {p.price}
                      </p>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleOpenEdit(p)}
                        className="flex-1 backdrop-blur-sm bg-yellow-500/20 text-yellow-200 py-2 rounded-xl font-semibold hover:bg-yellow-500/30 transition-all border border-yellow-400/40"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(p._id)}
                        className="flex-1 backdrop-blur-sm bg-red-500/20 text-red-200 py-2 rounded-xl font-semibold hover:bg-red-500/30 transition-all border border-red-400/40"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* PAGINATION */}
            <div className="flex justify-center items-center gap-4 backdrop-blur-sm bg-white/5 border border-white/10 rounded-2xl p-4 w-fit mx-auto">
              <button
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
                className="px-6 py-2 backdrop-blur-sm bg-white/10 text-white rounded-xl font-semibold hover:bg-white/20 transition-all disabled:opacity-30 disabled:cursor-not-allowed border border-white/20"
              >
                ← Prev
              </button>
              <span className="font-bold text-white text-lg px-4">
                {page} <span className="text-purple-300">of</span> {totalPages}
              </span>
              <button
                disabled={page === totalPages}
                onClick={() => setPage((p) => p + 1)}
                className="px-6 py-2 backdrop-blur-sm bg-white/10 text-white rounded-xl font-semibold hover:bg-white/20 transition-all disabled:opacity-30 disabled:cursor-not-allowed border border-white/20"
              >
                Next →
              </button>
            </div>
          </>
        )}

        {/* ADD / EDIT MODAL */}
        {(showAddModal || showEditModal) && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="backdrop-blur-xl bg-gradient-to-br from-slate-900/90 to-purple-900/90 border border-white/20 p-8 rounded-2xl w-full max-w-2xl shadow-2xl transform animate-scale-in max-h-[90vh] overflow-y-auto">
              <h2 className="text-3xl font-bold text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text mb-6">
                {showEditModal ? "Edit Product" : "Add New Product"}
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-purple-200 text-sm font-semibold mb-2">Product Title</label>
                  <input
                    className="w-full p-3 backdrop-blur-sm bg-white/10 border border-white/20 rounded-xl text-white placeholder-purple-300/50 focus:outline-none focus:border-cyan-400 transition-all"
                    placeholder="Enter product title"
                    value={form.title}
                    onChange={(e) =>
                      setForm({ ...form, title: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label className="block text-purple-200 text-sm font-semibold mb-2">Description</label>
                  <textarea
                    className="w-full p-3 backdrop-blur-sm bg-white/10 border border-white/20 rounded-xl text-white placeholder-purple-300/50 focus:outline-none focus:border-cyan-400 transition-all min-h-24 resize-none"
                    placeholder="Enter product description"
                    value={form.description}
                    onChange={(e) =>
                      setForm({ ...form, description: e.target.value })
                    }
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-purple-200 text-sm font-semibold mb-2">Gender</label>
                    <select
                      className="w-full p-3 backdrop-blur-sm bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-cyan-400 transition-all"
                      value={form.gender}
                      onChange={(e) =>
                        setForm({ ...form, gender: e.target.value as Gender })
                      }
                    >
                      <option value="" className="bg-slate-900">Select Gender</option>
                      {GENDERS.map((g) => (
                        <option key={g} value={g} className="bg-slate-900">
                          {g}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-purple-200 text-sm font-semibold mb-2">Category</label>
                    <select
                      className="w-full p-3 backdrop-blur-sm bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-cyan-400 transition-all"
                      value={form.category}
                      onChange={(e) =>
                        setForm({ ...form, category: e.target.value as Category })
                      }
                    >
                      <option value="" className="bg-slate-900">Select Category</option>
                      {CATEGORIES.map((c) => (
                        <option key={c} value={c} className="bg-slate-900">
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-purple-200 text-sm font-semibold mb-2">Sizes (comma separated)</label>
                  <input
                    className="w-full p-3 backdrop-blur-sm bg-white/10 border border-white/20 rounded-xl text-white placeholder-purple-300/50 focus:outline-none focus:border-cyan-400 transition-all"
                    placeholder="e.g. S,M,L,XL"
                    value={form.sizes}
                    onChange={(e) =>
                      setForm({ ...form, sizes: e.target.value })
                    }
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-purple-200 text-sm font-semibold mb-2">Price (Rs.)</label>
                    <input
                      className="w-full p-3 backdrop-blur-sm bg-white/10 border border-white/20 rounded-xl text-white placeholder-purple-300/50 focus:outline-none focus:border-cyan-400 transition-all"
                      placeholder="Enter price"
                      type="number"
                      value={form.price}
                      onChange={(e) =>
                        setForm({ ...form, price: e.target.value })
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-purple-200 text-sm font-semibold mb-2">Stock</label>
                    <input
                      className="w-full p-3 backdrop-blur-sm bg-white/10 border border-white/20 rounded-xl text-white placeholder-purple-300/50 focus:outline-none focus:border-cyan-400 transition-all"
                      placeholder="Enter stock quantity"
                      type="number"
                      value={form.stock}
                      onChange={(e) =>
                        setForm({ ...form, stock: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-purple-200 text-sm font-semibold mb-2">Product Images</label>
                  <input
                    id="product-images"
                    type="file"
                    multiple
                    className="w-full p-3 backdrop-blur-sm bg-white/10 border border-white/20 rounded-xl text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-cyan-500/20 file:text-cyan-200 file:font-semibold hover:file:bg-cyan-500/30 file:cursor-pointer focus:outline-none transition-all"
                    onChange={(e) => setImages(e.target.files)}
                  />
                  <p className="text-purple-300/70 text-xs mt-2">
                    {showEditModal ? "Leave empty to keep existing images" : "Upload one or more images"}
                  </p>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-8">
                <button
                  onClick={() => {
                    setShowAddModal(false)
                    setShowEditModal(false)
                  }}
                  className="px-6 py-3 backdrop-blur-sm bg-white/10 border border-white/20 text-white rounded-xl hover:bg-white/20 transition-all font-semibold"
                >
                  Cancel
                </button>

                <button
                  onClick={showEditModal ? handleUpdate : handleCreate}
                  className="px-6 py-3 backdrop-blur-sm bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl hover:from-cyan-400 hover:to-blue-400 transition-all font-semibold shadow-lg shadow-cyan-500/30"
                >
                  {showEditModal ? "Update Product" : "Create Product"}
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