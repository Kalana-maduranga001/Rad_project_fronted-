import { useAuth } from "../context/authContext"
import { Link } from "react-router-dom"
import { FiArrowRight, FiPackage, FiShield, FiTrendingUp, FiStar } from "react-icons/fi"
import { useState, useEffect } from "react"

// Add Google Fonts
const addGoogleFonts = () => {
  const link = document.createElement('link')
  link.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Inter:wght@300;400;600;700&display=swap'
  link.rel = 'stylesheet'
  document.head.appendChild(link)
}

if (typeof window !== 'undefined') {
  addGoogleFonts()
}

export default function Home() {
  const { user } = useAuth()

  const collections = [
    {
      title: "New Arrivals",
      images: [
        "https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000",
        "https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000",
        "https://images.pexels.com/photos/1055691/pexels-photo-1055691.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000"
      ],
      link: "/products?filter=new"
    },
    {
      title: "Men's Collection",
      images: [
        "https://images.pexels.com/photos/1124468/pexels-photo-1124468.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000",
        "https://images.pexels.com/photos/2379429/pexels-photo-2379429.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000",
        "https://images.pexels.com/photos/1038000/pexels-photo-1038000.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000"
      ],
      link: "/products?category=men"
    },
    {
      title: "Women's Collection",
      images: [
        "https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000",
        "https://images.pexels.com/photos/7679454/pexels-photo-7679454.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000",
        "https://images.pexels.com/photos/972995/pexels-photo-972995.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000"
      ],
      link: "/products?category=women"
    }
  ]

  const features = [
    {
      icon: <FiPackage className="w-12 h-12" />,
      title: "Free Shipping",
      description: "On orders over $50",
      image: "https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=800&h=600&fit=crop"
    },
    {
      icon: <FiShield className="w-12 h-12" />,
      title: "Secure Payment",
      description: "100% secure transactions",
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop"
    },
    {
      icon: <FiTrendingUp className="w-12 h-12" />,
      title: "Latest Trends",
      description: "New styles every week",
      image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&h=600&fit=crop"
    }
  ]

  return (
    <div className="w-full bg-black text-white overflow-x-hidden">
      
      {/* Hero Section - Enhanced with Video-like Effect */}
      <section className="relative h-screen min-h-[700px] overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&h=900&fit=crop')",
              animation: "slowZoom 20s ease-in-out infinite alternate"
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/70" />
          
          {/* Animated Overlay Patterns */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl animate-float-slow" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl animate-float-delayed" />
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6 max-w-7xl mx-auto">
          {user && (
            <div className="mb-6 animate-fade-in-down">
              <p className="text-sm md:text-base font-light bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-white/20 inline-block">
                Welcome back, <span className="font-semibold">{user.firstname}</span>
              </p>
            </div>
          )}
          
          <h1 
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight animate-fade-in-up"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Discover Your <span className="block mt-2 bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent animate-shimmer">Style</span>
          </h1>
          
          <p 
            className="text-lg md:text-xl lg:text-2xl mb-10 max-w-3xl font-light leading-relaxed text-gray-300 animate-fade-in-up animation-delay-200"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Explore our latest collection of premium clothing and accessories
          </p>
          
          <Link 
            to="/products"
            className="bg-white text-black px-10 py-5 rounded-full font-bold hover:bg-gray-200 transition-all transform hover:scale-105 flex items-center gap-3 shadow-2xl group animate-fade-in-up animation-delay-400"
          >
            Shop Now
            <FiArrowRight className="text-xl group-hover:translate-x-2 transition-transform" />
          </Link>

          {/* Scroll Indicator */}
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-2">
              <div className="w-1 h-3 bg-white/50 rounded-full animate-scroll" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Elevated Design */}
      <section className="relative py-24 bg-gradient-to-b from-black to-gray-900">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '50px 50px'
          }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          {/* Section Header */}
          <div className="text-center mb-16 animate-fade-in-up">
            <div className="inline-block mb-4">
              <span className="text-gray-400 text-sm uppercase tracking-widest font-semibold">Why Choose Us</span>
            </div>
            <h2 
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Premium Experience
            </h2>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="group relative overflow-hidden bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm p-10 rounded-3xl border border-gray-700/50 hover:border-gray-600/50 transition-all duration-500 transform hover:-translate-y-2 animate-fade-in-up"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {/* Background Image Effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>

                {/* Glowing Effect on Hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/0 group-hover:from-white/5 group-hover:to-white/0 transition-all duration-500" />

                <div className="relative z-10 text-center">
                  {/* Icon Container */}
                  <div className="flex justify-center mb-6">
                    <div className="relative">
                      <div className="w-20 h-20 bg-gradient-to-br from-gray-700 to-gray-800 rounded-2xl flex items-center justify-center text-white transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-xl">
                        {feature.icon}
                      </div>
                      {/* Animated Ring */}
                      <div className="absolute inset-0 border-2 border-gray-600/30 rounded-2xl animate-pulse-ring" />
                    </div>
                  </div>

                  <h3 
                    className="text-2xl font-bold mb-3"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {feature.title}
                  </h3>
                  <p 
                    className="text-gray-400 text-lg"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Collections Section - Premium Showcase */}
      <section className="relative py-24 bg-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          {/* Section Header */}
          <div className="text-center mb-16 animate-fade-in-up">
            <div className="inline-block mb-4">
              <span className="text-gray-400 text-sm uppercase tracking-widest font-semibold">Collections</span>
            </div>
            <h2 
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Shop by Collection
            </h2>
            <p 
              className="text-xl text-gray-400 max-w-2xl mx-auto"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Find the perfect pieces for every occasion
            </p>
          </div>
          
          {/* Collections Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {collections.map((collection, index) => (
              <CollectionCard key={index} collection={collection} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Glassmorphism Premium */}
      <section className="relative py-24 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="relative overflow-hidden rounded-3xl">
            {/* Background Image */}
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: "url('https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1600&h=600&fit=crop')"
              }}
            />
            
            {/* Dark Overlay with Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-gray-900/85 to-black/90" />
            
            {/* Animated Elements */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-float-slow" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-float-delayed" />
            
            {/* Content */}
            <div className="relative z-10 backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-16 m-8 shadow-2xl">
              <div className="text-center animate-fade-in-up">
                <h2 
                  className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Join Our Style Community
                </h2>
                <p 
                  className="text-lg md:text-xl lg:text-2xl mb-10 text-gray-300 max-w-3xl mx-auto"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  Subscribe to get exclusive deals and early access to new collections
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-xl mx-auto mb-6">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-6 py-4 rounded-full text-white text-lg bg-white/10 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-white/20 shadow-lg border border-white/20 placeholder:text-gray-400 transition-all"
                  />
                  <button className="bg-white text-black px-10 py-4 rounded-full font-bold hover:bg-gray-200 transition-all transform hover:scale-105 shadow-xl">
                    Subscribe
                  </button>
                </div>
                
                <p 
                  className="text-gray-400 text-sm flex items-center justify-center gap-2"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  <FiStar className="text-yellow-400" /> Get 15% off your first order
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        /* Fade In Animations */
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
          opacity: 0;
        }

        .animate-fade-in-down {
          animation: fadeInDown 0.8s ease-out forwards;
          opacity: 0;
        }

        .animation-delay-200 {
          animation-delay: 200ms;
        }

        .animation-delay-400 {
          animation-delay: 400ms;
        }

        /* Floating Animations */
        @keyframes floatSlow {
          0%, 100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(30px, -30px);
          }
        }

        @keyframes floatDelayed {
          0%, 100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(-30px, 30px);
          }
        }

        .animate-float-slow {
          animation: floatSlow 20s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: floatDelayed 25s ease-in-out infinite;
        }

        /* Shimmer Effect */
        @keyframes shimmer {
          0% {
            background-position: -200% center;
          }
          100% {
            background-position: 200% center;
          }
        }

        .animate-shimmer {
          background-size: 200% auto;
          animation: shimmer 3s linear infinite;
        }

        /* Slow Zoom */
        @keyframes slowZoom {
          from {
            transform: scale(1);
          }
          to {
            transform: scale(1.1);
          }
        }

        /* Scroll Indicator */
        @keyframes scroll {
          0% {
            opacity: 0;
            transform: translateY(-10px);
          }
          50% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            transform: translateY(10px);
          }
        }

        .animate-scroll {
          animation: scroll 2s ease-in-out infinite;
        }

        /* Pulse Ring */
        @keyframes pulseRing {
          0%, 100% {
            transform: scale(1);
            opacity: 0.3;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.5;
          }
        }

        .animate-pulse-ring {
          animation: pulseRing 2s ease-in-out infinite;
        }

        /* Slide In Animations for Collection Cards */
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-slide-in-left {
          animation: slideInLeft 0.8s ease-out forwards;
          opacity: 0;
        }

        .animate-slide-in-right {
          animation: slideInRight 0.8s ease-out forwards;
          opacity: 0;
        }
      `}</style>

    </div>
  )
}

// Collection Card Component with Slideshow (NO CHANGES TO LOGIC)
function CollectionCard({ collection, index }: { collection: { title: string; images: string[]; link: string }, index: number }) {
  const [currentImage, setCurrentImage] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % collection.images.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [collection.images.length])

  return (
    <Link
      to={collection.link}
      className={`group relative h-[600px] rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-700 transform hover:-translate-y-3 block border border-gray-800 hover:border-gray-700 ${
        index % 2 === 0 ? 'animate-slide-in-left' : 'animate-slide-in-right'
      }`}
      style={{ animationDelay: `${index * 150}ms` }}
    >
      {/* Image with Ken Burns Effect */}
      <img
        src={collection.images[currentImage]}
        alt={collection.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-[3000ms] ease-out group-hover:scale-110"
        loading="lazy"
        style={{
          animation: currentImage !== 0 ? 'kenBurns 3s ease-out' : 'none'
        }}
      />
      
      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80 group-hover:opacity-70 transition-opacity duration-500" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />
      
      {/* Content */}
      <div className="absolute inset-0 flex items-end justify-center pb-12 px-6 z-10">
        <div className="text-center transform transition-all duration-500 group-hover:translate-y-[-10px]">
          <h3 
            className="text-white text-4xl md:text-5xl font-bold mb-6 drop-shadow-2xl"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {collection.title}
          </h3>
          <div className="inline-flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full font-bold group-hover:bg-gray-900 group-hover:text-white transition-all shadow-2xl border-2 border-transparent group-hover:border-white/20">
            Explore Collection
            <FiArrowRight className="group-hover:translate-x-2 transition-transform text-xl" />
          </div>
        </div>
      </div>

      {/* Slideshow Indicators */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-20">
        {collection.images.map((_, idx) => (
          <div
            key={idx}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              idx === currentImage 
                ? 'bg-white w-12 shadow-lg shadow-white/50' 
                : 'bg-white/40 w-1.5 hover:bg-white/60'
            }`}
          />
        ))}
      </div>

      {/* Animated Border Effect */}
      <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-0 rounded-3xl border-2 border-white/20 animate-pulse-ring" />
      </div>

      <style>{`
        @keyframes kenBurns {
          from {
            transform: scale(1.1);
          }
          to {
            transform: scale(1);
          }
        }
      `}</style>
    </Link>
  )
}