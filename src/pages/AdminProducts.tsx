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
    sizes: "" , // <-- changed from `size`
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
    
    // Convert sizes string to array
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
      sizes: p.sizes.join(","), // <-- join array into string
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
    <div className="p-4">
      <div className="flex justify-between mb-4">
        <h1 className="text-3xl font-bold">Product Management</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          + Add Product
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-4">
          {products.map((p) => (
            <div key={p._id} className="border rounded p-4">
              <img
                src={p.imageUrls[0]}
                className="h-40 w-full object-cover rounded"
              />
              <h2 className="font-semibold mt-2">{p.title}</h2>
              <p className="text-sm">
                {p.category} · {p.gender}
              </p>
              <p className="font-bold">Rs. {p.price}</p>

              <div className="flex justify-between mt-3">
                <button
                  onClick={() => handleOpenEdit(p)}
                  className="px-3 py-1 bg-yellow-500 text-white rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(p._id)}
                  className="px-3 py-1 bg-red-600 text-white rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* PAGINATION */}
      <div className="flex justify-center gap-3 mt-6">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="px-3 py-1 bg-gray-300 rounded disabled:bg-gray-200"
        >
          Prev
        </button>
        <span className="font-semibold">
          {page} / {totalPages}
        </span>
        <button
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="px-3 py-1 bg-gray-300 rounded disabled:bg-gray-200"
        >
          Next
        </button>
      </div>

      {/* ADD / EDIT MODAL */}
      {(showAddModal || showEditModal) && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded w-96 space-y-3">
            <input
              className="border p-2 w-full"
              placeholder="Title"
              value={form.title}
              onChange={(e) =>
                setForm({ ...form, title: e.target.value })
              }
            />

            <textarea
              className="border p-2 w-full"
              placeholder="Description"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />

            <select
              className="border p-2 w-full"
              value={form.gender}
              onChange={(e) =>
                setForm({ ...form, gender: e.target.value as Gender })
              }
            >
              <option value="">Select Gender</option>
              {GENDERS.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>

            <select
              className="border p-2 w-full"
              value={form.category}
              onChange={(e) =>
                setForm({ ...form, category: e.target.value as Category })
              }
            >
              <option value="">Select Category</option>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>

            <input
              className="border p-2 w-full"
              placeholder="Sizes (comma separated, e.g. S,M,L,XL)"
              value={form.sizes}
              onChange={(e) =>
                setForm({ ...form, sizes: e.target.value })
              }
            />

            <input
              className="border p-2 w-full"
              placeholder="Price"
              type="number"
              value={form.price}
              onChange={(e) =>
                setForm({ ...form, price: e.target.value })
              }
            />

            <input
              className="border p-2 w-full"
              placeholder="Stock"
              type="number"
              value={form.stock}
              onChange={(e) =>
                setForm({ ...form, stock: e.target.value })
              }
            />

            <input
              id="product-images"
              type="file"
              multiple
              className="border p-2 w-full"
              onChange={(e) => setImages(e.target.files)}
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  setShowAddModal(false)
                  setShowEditModal(false)
                }}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>

              <button
                onClick={showEditModal ? handleUpdate : handleCreate}
                className="px-4 py-2 bg-black text-white rounded"
              >
                {showEditModal ? "Update" : "Create"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}