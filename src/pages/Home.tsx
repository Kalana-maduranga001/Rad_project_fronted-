import { useAuth } from "../context/authContext"
import { Link } from "react-router-dom"
import { FiArrowRight, FiTrendingUp, FiShield, FiTruck } from "react-icons/fi"

export default function Home() {
  const { user } = useAuth()

  const collections = [
    {
      title: "New Arrivals",
      image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&h=800&fit=crop",
      link: "/products?filter=new"
    },
    {
      title: "Men's Collection",
      image: "https://images.unsplash.com/photo-1516257984-b1b4d707412e?w=600&h=800&fit=crop",
      link: "/products?category=men"
    },
    {
      title: "Women's Collection",
      image: "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=600&h=800&fit=crop",
      link: "/products?category=women"
    }
  ]

  const features = [
    {
      icon: <FiTruck className="text-3xl" />,
      title: "Free Shipping",
      description: "On orders over $50"
    },
    {
      icon: <FiShield className="text-3xl" />,
      title: "Secure Payment",
      description: "100% secure transactions"
    },
    {
      icon: <FiTrendingUp className="text-3xl" />,
      title: "Latest Trends",
      description: "New styles every week"
    }
  ]

  return (
    <div className="w-full">
      
      {/* Hero Section */}
      <section className="relative h-[600px] bg-gray-900 text-white overflow-hidden rounded-lg mb-12">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&h=900&fit=crop')"
          }}
        />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          {user && (
            <p className="text-lg mb-2 font-light">Welcome back, {user.firstname}!</p>
          )}
          <h1 className="text-5xl md:text-7xl font-bold mb-4">
            Discover Your Style
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl font-light">
            Explore our latest collection of premium clothing and accessories
          </p>
          <Link 
            to="/products"
            className="bg-white text-gray-900 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition flex items-center gap-2 group"
          >
            Shop Now
            <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {features.map((feature, index) => (
          <div 
            key={index}
            className="bg-white p-8 rounded-lg shadow-md text-center hover:shadow-xl transition"
          >
            <div className="flex justify-center mb-4 text-gray-800">
              {feature.icon}
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800">
              {feature.title}
            </h3>
            <p className="text-gray-600">
              {feature.description}
            </p>
          </div>
        ))}
      </section>

      {/* Collections */}
      <section className="mb-12">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-gray-800 mb-2">
            Shop by Collection
          </h2>
          <p className="text-gray-600">
            Find the perfect pieces for every occasion
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {collections.map((collection, index) => (
            <Link
              key={index}
              to={collection.link}
              className="group relative h-[400px] rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition"
            >
              <div 
                className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
                style={{ backgroundImage: `url('${collection.image}')` }}
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-50 transition" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <h3 className="text-white text-3xl font-bold mb-4">
                    {collection.title}
                  </h3>
                  <span className="inline-block bg-white text-gray-900 px-6 py-2 rounded-full font-semibold group-hover:bg-gray-100 transition">
                    Explore
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-900 text-white rounded-lg p-12 text-center">
        <h2 className="text-4xl font-bold mb-4">
          Join Our Style Community
        </h2>
        <p className="text-xl mb-8 text-gray-300">
          Subscribe to get exclusive deals and early access to new collections
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
          />
          <button className="bg-white text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
            Subscribe
          </button>
        </div>
      </section>

    </div>
  )
}