import { useAuth } from "../context/authContext"
import { Link } from "react-router-dom"
import { FiArrowRight } from "react-icons/fi"
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
      icon: (
        <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 21c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1 .6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"></path>
          <path d="M19.38 20A11.6 11.6 0 0 0 21 14l-9-4-9 4c0 2.9.94 5.34 2.81 7.76"></path>
          <path d="M19 13V7a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v6"></path>
          <path d="M12 10v4"></path>
          <path d="M12 2v3"></path>
        </svg>
      ),
      title: "Free Shipping",
      description: "On orders over $50",
      image: "https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=800&h=600&fit=crop"
    },
    {
      icon: (
        <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
          <line x1="1" y1="10" x2="23" y2="10"></line>
        </svg>
      ),
      title: "Secure Payment",
      description: "100% secure transactions",
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop"
    },
    {
      icon: (
        <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
        </svg>
      ),
      title: "Latest Trends",
      description: "New styles every week",
      image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&h=600&fit=crop"
    }
  ]

  return (
    <div className="w-full bg-gradient-to-b from-gray-50 to-white">
      
      {/* Hero Section */}
      <section className="relative h-[700px] bg-gray-900 text-white overflow-hidden rounded-2xl mb-16 shadow-2xl mx-6">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-50"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&h=900&fit=crop')"
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/40" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          {user && (
            <p className="text-lg mb-3 font-light bg-white/10 backdrop-blur-sm px-6 py-2 rounded-full border border-white/20">Welcome back, {user.firstname}!</p>
          )}
          <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
            Discover Your <span className="text-white">Style</span>
          </h1>
          <p className="text-xl md:text-2xl mb-10 max-w-3xl font-light leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
            Explore our latest collection of premium clothing and accessories
          </p>
          <Link 
            to="/products"
            className="bg-white text-gray-900 px-10 py-5 rounded-full font-bold hover:bg-gray-100 transition-all transform hover:scale-105 flex items-center gap-3 shadow-xl group"
          >
            Shop Now
            <FiArrowRight className="text-xl group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>
      </section>

      {/* Features with Background */}
      <section className="relative rounded-3xl overflow-hidden mb-20 mx-6">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1445205170230-053b83016050?w=1600&h=600&fit=crop"
            alt="Background"
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-white/90 backdrop-blur-sm" />
        </div>

        {/* Features Grid */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8 p-10">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="relative overflow-hidden bg-white/80 backdrop-blur-md p-10 rounded-2xl shadow-lg text-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-200/50 group"
            >
              {/* Background Image for each card */}
              <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>

              <div className="relative z-10">
                <div className="flex justify-center mb-6 relative">
                  <div className="text-white bg-gray-800 w-20 h-20 rounded-2xl mx-auto flex items-center justify-center animate-float relative overflow-hidden">
                    {/* Flickering light effect */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent animate-flicker" />
                    <div className="relative z-10">
                      {feature.icon}
                    </div>
                  </div>
                  {/* Glowing ring */}
                  <div className="absolute inset-0 w-20 h-20 mx-auto border-2 border-gray-400/30 rounded-2xl animate-glow" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-gray-800" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-lg" style={{ fontFamily: "'Inter', sans-serif" }}>
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Collections - WITH SLIDESHOW */}
      <section className="mb-20 mx-6">
        <div className="text-center mb-12">
          <div className="inline-block px-6 py-2 bg-gray-800 rounded-full mb-4">
            <span className="text-white font-semibold text-sm uppercase tracking-wider">Collections</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-gray-800 mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            Shop by Collection
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto" style={{ fontFamily: "'Inter', sans-serif" }}>
            Find the perfect pieces for every occasion
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {collections.map((collection, index) => (
            <CollectionCard key={index} collection={collection} />
          ))}
        </div>
      </section>

      {/* CTA Section with Glassmorphism */}
      <section className="relative rounded-3xl overflow-hidden shadow-2xl mx-6 mb-20">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1600&h=600&fit=crop')"
          }}
        />
        
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/90 via-gray-800/85 to-black/90" />
        
        {/* Glassmorphism Card */}
        <div className="relative z-10 backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-16 m-8 shadow-2xl">
          {/* Decorative Elements */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-40 h-40 bg-white/5 rounded-full blur-3xl" />
          
          <div className="relative z-10 text-center">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
              Join Our Style Community
            </h2>
            <p className="text-xl md:text-2xl mb-10 text-gray-200 max-w-3xl mx-auto" style={{ fontFamily: "'Inter', sans-serif" }}>
              Subscribe to get exclusive deals and early access to new collections
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-xl mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 rounded-full text-gray-900 text-lg bg-white/90 backdrop-blur-sm focus:outline-none focus:ring-4 focus:ring-white/30 focus:bg-white shadow-lg border border-white/20 placeholder:text-gray-500"
              />
              <button className="bg-white/90 backdrop-blur-sm text-gray-900 px-10 py-4 rounded-full font-bold hover:bg-white transition-all transform hover:scale-105 shadow-xl border border-white/30">
                Subscribe
              </button>
            </div>
            
            <p className="text-gray-300 text-sm mt-6 flex items-center justify-center gap-2" style={{ fontFamily: "'Inter', sans-serif" }}>
              <span className="text-2xl">✨</span> Get 15% off your first order
            </p>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes flicker {
          0%, 100% {
            opacity: 0;
            transform: translateX(-100%) translateY(-100%) rotate(45deg);
          }
          10% {
            opacity: 0.3;
          }
          20% {
            opacity: 0;
          }
          30% {
            opacity: 0.5;
          }
          40% {
            opacity: 0;
          }
          50% {
            opacity: 0.8;
            transform: translateX(100%) translateY(100%) rotate(45deg);
          }
          60% {
            opacity: 0;
          }
          70% {
            opacity: 0.4;
          }
          80% {
            opacity: 0;
          }
          90% {
            opacity: 0.6;
          }
        }

        @keyframes glow {
          0%, 100% {
            box-shadow: 0 0 5px rgba(107, 114, 128, 0.3),
                        0 0 10px rgba(107, 114, 128, 0.2),
                        0 0 15px rgba(107, 114, 128, 0.1);
            opacity: 0.5;
          }
          50% {
            box-shadow: 0 0 10px rgba(107, 114, 128, 0.5),
                        0 0 20px rgba(107, 114, 128, 0.3),
                        0 0 30px rgba(107, 114, 128, 0.2);
            opacity: 0.8;
          }
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-flicker {
          animation: flicker 3s ease-in-out infinite;
        }

        .animate-glow {
          animation: glow 2s ease-in-out infinite;
        }
      `}</style>

    </div>
  )
}

// Separate component for collection card with slideshow
function CollectionCard({ collection }: { collection: { title: string; images: string[]; link: string } }) {
  const [currentImage, setCurrentImage] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % collection.images.length)
    }, 3000) // Change image every 3 seconds

    return () => clearInterval(interval)
  }, [collection.images.length])

  return (
    <Link
      to={collection.link}
      className="group relative h-[500px] rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 block"
    >
      {/* Image element instead of background */}
      <img
        src={collection.images[currentImage]}
        alt={collection.title}
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        loading="lazy"
      />
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      <div className="absolute inset-0 flex items-center justify-end flex-col pb-12 px-6 z-10">
        <div className="text-center">
          <h3 className="text-white text-4xl font-bold mb-6 drop-shadow-lg" style={{ fontFamily: "'Playfair Display', serif" }}>
            {collection.title}
          </h3>
          <span className="inline-flex items-center gap-2 bg-white text-gray-900 px-8 py-3 rounded-full font-bold group-hover:bg-gray-800 group-hover:text-white transition-all shadow-lg">
            Explore
            <FiArrowRight className="group-hover:translate-x-2 transition-transform" />
          </span>
        </div>
      </div>

      {/* Slideshow Indicators */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-20">
        {collection.images.map((_, index) => (
          <div
            key={index}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentImage ? 'bg-white w-12 shadow-lg' : 'bg-white/50 w-2'
            }`}
          />
        ))}
      </div>
    </Link>
  )
}