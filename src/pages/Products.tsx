import { useEffect, useState } from "react"
import { getProducts, GENDERS, CATEGORIES } from "../services/product"
import type { ProductType, Gender, Category } from "../services/product"
import { useCart } from "../context/cartContext"

export default function Products() {
  const [products, setProducts] = useState<ProductType[]>([])
  const [loading, setLoading] = useState(true)

  // Modal
  const [selectedProduct, setSelectedProduct] =
    useState<ProductType | null>(null)

  // Filters
  const [search, setSearch] = useState("")
  const [gender, setGender] = useState<Gender | "ALL">("ALL")
  const [category, setCategory] = useState<Category | "ALL">("ALL")
  const [minPrice, setMinPrice] = useState("")
  const [maxPrice, setMaxPrice] = useState("")
  const [sortBy, setSortBy] = useState("default")

  // Pagination
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 12

  // Modal helpers
  const [activeImage, setActiveImage] = useState(0)
  const [quantity, setQuantity] = useState(1)

  const [selectedSize, setSelectedSize] = useState("")

  // Auto image animation for all product cards
  const [currentImageIndex, setCurrentImageIndex] = useState<{[key: string]: number}>({})

  const { addToCart } = useCart()

  // Auto-cycle images for all products with multiple images (infinite loop)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(prev => {
        const newIndex = { ...prev }
        products.forEach(product => {
          if (product.imageUrls.length > 1) {
            const currentIdx = prev[product._id] || 0
            newIndex[product._id] = (currentIdx + 1) % product.imageUrls.length
          }
        })
        return newIndex
      })
    }, 3000) // Change image every 3 seconds

    return () => clearInterval(interval)
  }, [products])

  useEffect(() => {
    loadProducts()
  }, [search, gender, category, minPrice, maxPrice, sortBy])

  useEffect(() => {
    if (selectedProduct) {
      setActiveImage(0)
      setQuantity(1)
      setSelectedSize("") // reset size
    }
  }, [selectedProduct])

  const loadProducts = async () => {
    setLoading(true)
    try {
      const res = await getProducts(1, 200)
      let data: ProductType[] = res.data

      if (search.trim()) {
        data = data.filter((p) =>
          p.title.toLowerCase().includes(search.toLowerCase())
        )
      }

      if (category !== "ALL") {
        data = data.filter((p) => p.category === category)
      }

      if (gender !== "ALL") {
        data = data.filter((p) => p.gender === gender)
      }

      if (minPrice) data = data.filter(p => p.price >= Number(minPrice))
      if (maxPrice) data = data.filter(p => p.price <= Number(maxPrice))

      if (sortBy === "price_low") data.sort((a, b) => a.price - b.price)
      if (sortBy === "price_high") data.sort((a, b) => b.price - a.price)
      if (sortBy === "name_asc") data.sort((a, b) => a.title.localeCompare(b.title))
      if (sortBy === "name_desc") data.sort((a, b) => b.title.localeCompare(a.title))

      setProducts(data)
      setCurrentPage(1)
    } catch (err) {
      console.error("Failed to load products", err)
    } finally {
      setLoading(false)
    }
  }

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(products.length / itemsPerPage)

  useEffect(() => {
    if (selectedProduct) {
      setActiveImage(0)
      setQuantity(1)
    }
  }, [selectedProduct])

  return (
    <div className="container mx-auto px-6 py-10">
      <h1 className="text-4xl font-black mb-8 tracking-tight">Our Products</h1>

      {/* FILTER BAR */}
      <div className="flex flex-wrap gap-4 items-center mb-10 bg-gray-50 p-6 rounded-xl shadow-sm">
        <input
          className="border-2 border-gray-300 px-4 py-2 rounded-lg w-full sm:w-64 font-light focus:border-black focus:outline-none transition-colors"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="border-2 border-gray-300 px-4 py-2 rounded-lg font-medium focus:border-black focus:outline-none transition-colors"
          value={category}
          onChange={(e) => setCategory(e.target.value as Category | "ALL")}
        >
          <option value="ALL">All Categories</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        <select
          className="border-2 border-gray-300 px-4 py-2 rounded-lg font-medium focus:border-black focus:outline-none transition-colors"
          value={gender}
          onChange={(e) => setGender(e.target.value as Gender | "ALL")}
        >
          <option value="ALL">All Genders</option>
          {GENDERS.map((g) => (
            <option key={g} value={g}>{g}</option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Min Price"
          className="border-2 border-gray-300 px-4 py-2 rounded-lg w-32 font-light focus:border-black focus:outline-none transition-colors"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />

        <input
          type="number"
          placeholder="Max Price"
          className="border-2 border-gray-300 px-4 py-2 rounded-lg w-32 font-light focus:border-black focus:outline-none transition-colors"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />

        <select
          className="border-2 border-gray-300 px-4 py-2 rounded-lg font-medium focus:border-black focus:outline-none transition-colors"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="default">Sort By</option>
          <option value="price_low">Price: Low → High</option>
          <option value="price_high">Price: High → Low</option>
          <option value="name_asc">Name: A → Z</option>
          <option value="name_desc">Name: Z → A</option>
        </select>
      </div>

      {/* GRID */}
      {loading ? (
        <div className="text-center py-20">
          <p className="text-xl font-light text-gray-500">Loading products...</p>
        </div>
      ) : currentItems.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-xl font-light text-gray-500">No products found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {currentItems.map((p) => {
            const displayImageIndex = currentImageIndex[p._id] || 0
            const hasMultipleImages = p.imageUrls.length > 1
            
            return (
              <div
                key={p._id}
                onClick={() => setSelectedProduct(p)}
                className="bg-white shadow-lg rounded-2xl overflow-hidden cursor-pointer hover:shadow-2xl hover:scale-105 transition-all duration-300 group"
              >
                <div className="relative overflow-hidden bg-gray-100 h-80">
                  <img
                    src={p.imageUrls[displayImageIndex]}
                    alt={p.title}
                    className="h-full w-full object-contain transition-opacity duration-700"
                  />
                  
                  {/* Image indicator dots */}
                  {hasMultipleImages && (
                    <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-1.5 bg-black/30 px-3 py-1.5 rounded-full backdrop-blur-sm">
                      {p.imageUrls.map((_, idx) => (
                        <div
                          key={idx}
                          className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            displayImageIndex === idx 
                              ? 'bg-white w-6' 
                              : 'bg-white/50'
                          }`}
                        />
                      ))}
                    </div>
                  )}
                  
                  {/* Image count badge */}
                  {hasMultipleImages && (
                    <div className="absolute top-3 right-3 bg-black/70 text-white text-xs font-bold px-2.5 py-1 rounded-full backdrop-blur-sm">
                      {displayImageIndex + 1}/{p.imageUrls.length}
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <h2 className="font-bold text-lg tracking-tight mb-1">{p.title}</h2>
                  <p className="text-sm text-gray-500 font-light italic mb-2">{p.category}</p>
                  <p className="font-black text-xl text-green-600">Rs. {p.price}</p>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-12 gap-3">
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-5 py-2 border-2 rounded-lg font-bold transition-all ${
                currentPage === i + 1 
                  ? "bg-black text-white border-black shadow-lg scale-110" 
                  : "border-gray-300 hover:border-black hover:shadow-md"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}

      {/* PRODUCT MODAL */}
      {selectedProduct && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedProduct(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl max-w-5xl w-full mx-4 p-8 relative shadow-2xl max-h-[90vh] overflow-y-auto"
          >
            <button
              className="absolute top-5 right-5 text-3xl font-bold hover:rotate-90 transition-transform duration-300"
              onClick={() => setSelectedProduct(null)}
            >
              ✕
            </button>

            <div className="grid md:grid-cols-2 gap-10">
              <div>
                <div className="relative overflow-hidden bg-gray-100 rounded-xl mb-4 h-[500px]">
                  <img
                    src={selectedProduct.imageUrls[activeImage]}
                    alt={selectedProduct.title}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {selectedProduct.imageUrls.map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      alt={`${selectedProduct.title} ${i + 1}`}
                      onClick={() => setActiveImage(i)}
                      className={`h-24 w-24 object-cover border-4 rounded-lg cursor-pointer transition-all flex-shrink-0 ${
                        activeImage === i ? "border-black scale-110 shadow-lg" : "border-gray-300 hover:border-gray-500"
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <h2 className="text-4xl font-black tracking-tight">{selectedProduct.title}</h2>
                <p className="text-gray-600 font-light italic text-lg">{selectedProduct.category}</p>
                <p className="text-3xl font-black text-green-600">
                  Rs. {selectedProduct.price}
                </p>
                <p className="text-gray-700 font-light leading-relaxed">{selectedProduct.description}</p>

                {/* SIZE SELECTOR */}
                {selectedProduct.sizes && selectedProduct.sizes.length > 0 && (
                  <div className="mt-4">
                    <label className="font-bold text-lg mr-3 block mb-2">Select Size:</label>
                    <select
                      className="border-2 border-gray-300 px-4 py-3 rounded-lg w-full font-medium focus:border-black focus:outline-none transition-colors"
                      value={selectedSize}
                      onChange={(e) => setSelectedSize(e.target.value)}
                    >
                      <option value="">Choose a size</option>
                      {selectedProduct.sizes.map((size) => (
                        <option key={size} value={size}>
                          {size}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <div className="flex items-center gap-4 mt-2">
                  <label className="font-bold text-lg">Quantity:</label>
                  <input
                    type="number"
                    min={1}
                    className="border-2 border-gray-300 px-4 py-3 w-20 rounded-lg font-medium focus:border-black focus:outline-none transition-colors"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                  />
                </div>

                <button
                  onClick={() => {
                    if (!selectedSize) {
                      alert("Please select a size")
                      return
                    }
                    addToCart(selectedProduct, quantity, selectedSize)
                    setSelectedProduct(null)
                  }}
                  className="mt-6 bg-black text-white py-4 rounded-xl font-bold text-lg tracking-wide hover:bg-gray-800 transition-colors shadow-lg hover:shadow-xl"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}