import { useAuth } from "../context/authContext"
import { Link } from "react-router-dom"
import { FiArrowRight, FiPackage, FiShield, FiTrendingUp, FiStar, FiShoppingBag, FiCheck, FiUsers, FiAward, FiZap } from "react-icons/fi"
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

      {/* ==================== CREATOR TOOLKIT SECTION ==================== */}
      <CreatorToolkitSection />

      {/* ==================== AMBASSADORS SECTION ==================== */}
      <AmbassadorsSection />

      {/* ==================== MEMBERSHIP PROGRAM SECTION ==================== */}
      <MembershipSection />

      {/* ==================== MANUFACTURING SOLUTIONS SECTION ==================== */}
      <ManufacturingSection />

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

// ==================== CREATOR TOOLKIT SECTION ====================
function CreatorToolkitSection() {
  const tools = [
    {
      icon: <FiPackage className="w-12 h-12" />,
      title: "Design Tools",
      description: "3D digital design helps brands design and sample clothing faster and with less waste.",
      image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&h=600&fit=crop",
      features: ["3D Modeling", "Pattern Making", "Virtual Sampling"]
    },
    {
      icon: <FiTrendingUp className="w-12 h-12" />,
      title: "Manufacturing Tools",
      description: "Sourcing the best factories to produce products on-demand, sent directly to consumers.",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop",
      features: ["On-Demand Production", "Quality Control", "Drop Shipping"]
    },
    {
      icon: <FiShoppingBag className="w-12 h-12" />,
      title: "Marketing & Distribution",
      description: "Hyper-realistic 3D digital product images for e-commerce and marketing campaigns.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
      features: ["Product Photography", "Social Media", "E-commerce Integration"]
    }
  ]

  return (
    <section className="relative py-24 bg-gradient-to-b from-gray-900 to-black text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-float-slow" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-float-delayed" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-20 animate-fade-in-up">
          <div className="inline-block mb-4">
            <span className="text-gray-400 text-sm uppercase tracking-widest font-semibold">Tools & Services</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
            The Creator Toolkit
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto" style={{ fontFamily: "'Inter', sans-serif" }}>
            Empowering creators with cutting-edge tools for the modern fashion industry
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tools.map((tool, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-3xl animate-fade-in-up"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <img
                  src={tool.image}
                  alt={tool.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30" />
              </div>

              {/* Content */}
              <div className="relative z-10 p-8 h-full flex flex-col justify-between min-h-[500px]">
                {/* Icon */}
                <div className="mb-6">
                  <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-white border border-white/20 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                    {tool.icon}
                  </div>
                </div>

                {/* Text Content */}
                <div>
                  <h3 className="text-3xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {tool.title}
                  </h3>
                  <p className="text-gray-300 mb-6 leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
                    {tool.description}
                  </p>

                  {/* Features List */}
                  <ul className="space-y-2">
                    {tool.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-gray-400">
                        <FiCheck className="text-green-400" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Button */}
                <button className="mt-6 w-full bg-white/10 backdrop-blur-md text-white px-6 py-3 rounded-full font-semibold hover:bg-white hover:text-black transition-all border border-white/20 flex items-center justify-center gap-2 group-hover:gap-4">
                  Learn More
                  <FiArrowRight className="transition-all" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ==================== AMBASSADORS SECTION ====================
function AmbassadorsSection() {
  const ambassadors = [
    {
      name: "Sarah Anderson",
      role: "Fashion Designer",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&h=600&fit=crop",
      quote: "The phygital approach allows me to explore new dimensions of creativity and cultivate stronger community bonds.",
      social: { instagram: "#", twitter: "#" }
    },
    {
      name: "Michael Chen",
      role: "Creative Director",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=600&fit=crop",
      quote: "This platform has revolutionized the way I bring my designs to life. The on-demand manufacturing is a game changer.",
      social: { instagram: "#", twitter: "#" }
    },
    {
      name: "Emma Rodriguez",
      role: "Brand Strategist",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&h=600&fit=crop",
      quote: "Being part of this community has opened doors I never imagined. The collaborative culture is truly inspiring.",
      social: { instagram: "#", twitter: "#" }
    }
  ]

  return (
    <section className="relative py-24 bg-black text-white overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-pink-500 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl animate-float-delayed" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-20 animate-fade-in-up">
          <div className="inline-block mb-4">
            <span className="text-gray-400 text-sm uppercase tracking-widest font-semibold">Our Community</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
            Brand Ambassadors
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto" style={{ fontFamily: "'Inter', sans-serif" }}>
            Meet the creators shaping the future of fashion
          </p>
        </div>

        {/* Ambassadors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {ambassadors.map((ambassador, index) => (
            <div
              key={index}
              className="group relative animate-fade-in-up"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Card */}
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 hover:border-gray-600/50 transition-all duration-500 transform hover:-translate-y-2">
                {/* Image Container */}
                <div className="relative h-80 overflow-hidden">
                  <img
                    src={ambassador.image}
                    alt={ambassador.name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                </div>

                {/* Content */}
                <div className="p-8">
                  <div className="flex items-center gap-2 mb-4">
                    <FiAward className="text-yellow-400" />
                    <span className="text-sm text-gray-400 uppercase tracking-wide">{ambassador.role}</span>
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {ambassador.name}
                  </h3>
                  
                  <p className="text-gray-400 italic leading-relaxed mb-6" style={{ fontFamily: "'Inter', sans-serif" }}>
                    "{ambassador.quote}"
                  </p>

                  {/* Social Links */}
                  <div className="flex gap-4">
                    <a href={ambassador.social.instagram} className="text-gray-400 hover:text-white transition-colors">
                      <FiUsers className="w-5 h-5" />
                    </a>
                    <a href={ambassador.social.twitter} className="text-gray-400 hover:text-white transition-colors">
                      <FiUsers className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ==================== MEMBERSHIP PROGRAM SECTION ====================
function MembershipSection() {
  const plans = [
    {
      name: "Starter",
      price: "$29",
      period: "/month",
      description: "Perfect for emerging creators",
      features: [
        "Access to Design Tools",
        "5 Products per month",
        "Community Support",
        "Basic Analytics",
        "Email Support"
      ],
      popular: false,
      gradient: "from-gray-700 to-gray-800"
    },
    {
      name: "Professional",
      price: "$79",
      period: "/month",
      description: "For established designers",
      features: [
        "Everything in Starter",
        "Unlimited Products",
        "Priority Manufacturing",
        "Advanced Analytics",
        "24/7 Phone Support",
        "Marketing Tools"
      ],
      popular: true,
      gradient: "from-purple-600 to-pink-600"
    },
    {
      name: "Enterprise",
      price: "$199",
      period: "/month",
      description: "For growing brands",
      features: [
        "Everything in Professional",
        "Dedicated Account Manager",
        "Custom Manufacturing",
        "API Access",
        "White-Label Solutions",
        "Advanced Integrations"
      ],
      popular: false,
      gradient: "from-blue-600 to-cyan-600"
    }
  ]

  return (
    <section className="relative py-24 bg-gradient-to-b from-black to-gray-900 text-white overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(45deg, white 25%, transparent 25%, transparent 75%, white 75%, white), linear-gradient(45deg, white 25%, transparent 25%, transparent 75%, white 75%, white)',
          backgroundSize: '60px 60px',
          backgroundPosition: '0 0, 30px 30px'
        }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-20 animate-fade-in-up">
          <div className="inline-block mb-4">
            <span className="text-gray-400 text-sm uppercase tracking-widest font-semibold">Pricing Plans</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
            Membership Program
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto" style={{ fontFamily: "'Inter', sans-serif" }}>
            Choose the perfect plan to unlock your creative potential
          </p>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative animate-fade-in-up ${plan.popular ? 'md:-mt-4 md:mb-4' : ''}`}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
                  <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                    Most Popular
                  </div>
                </div>
              )}

              {/* Card */}
              <div className={`relative overflow-hidden rounded-3xl ${plan.popular ? 'border-2 border-purple-500/50' : 'border border-gray-700/50'} bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm hover:border-gray-600/50 transition-all duration-500 transform hover:-translate-y-2 h-full`}>
                {/* Gradient Overlay */}
                <div className={`absolute top-0 left-0 right-0 h-32 bg-gradient-to-br ${plan.gradient} opacity-20`} />

                <div className="relative z-10 p-8">
                  {/* Plan Name */}
                  <h3 className="text-2xl font-bold mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {plan.name}
                  </h3>
                  <p className="text-gray-400 text-sm mb-6" style={{ fontFamily: "'Inter', sans-serif" }}>
                    {plan.description}
                  </p>

                  {/* Price */}
                  <div className="mb-8">
                    <span className="text-5xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
                      {plan.price}
                    </span>
                    <span className="text-gray-400 text-lg">{plan.period}</span>
                  </div>

                  {/* Features */}
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-gray-300">
                        <FiCheck className="text-green-400 mt-1 flex-shrink-0" />
                        <span className="text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Button */}
                  <button className={`w-full py-4 rounded-full font-bold transition-all transform hover:scale-105 ${
                    plan.popular 
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-2xl hover:shadow-purple-500/50' 
                      : 'bg-white/10 text-white hover:bg-white hover:text-black border border-white/20'
                  }`}>
                    Get Started
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ==================== MANUFACTURING SOLUTIONS SECTION ====================
function ManufacturingSection() {
  const [activeTab, setActiveTab] = useState(0)

  const solutions = [
    {
      title: "Bespoke Manufacturing",
      description: "Custom production solutions tailored to your unique requirements with premium quality control.",
      image: "https://images.unsplash.com/photo-1565688534245-05d6b5be184a?w=800&h=600&fit=crop",
      features: ["Custom Patterns", "Premium Materials", "Expert Craftsmanship", "Small Batch Production"]
    },
    {
      title: "On-Demand Production",
      description: "Sustainable manufacturing powered by cutting-edge technology, producing only what's needed.",
      image: "https://images.unsplash.com/photo-1516384903227-139a8cf0ec21?w=800&h=600&fit=crop",
      features: ["Zero Waste", "Fast Turnaround", "Global Shipping", "Inventory-Free"]
    },
    {
      title: "Distribution Network",
      description: "Comprehensive distribution solutions connecting your products to customers worldwide.",
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=600&fit=crop",
      features: ["E-commerce Integration", "Wholesale Solutions", "Retail Partnerships", "Direct-to-Consumer"]
    }
  ]

  return (
    <section className="relative py-24 bg-gray-900 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'repeating-linear-gradient(45deg, white 0px, white 1px, transparent 1px, transparent 10px)',
        }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="inline-block mb-4">
            <span className="text-gray-400 text-sm uppercase tracking-widest font-semibold">Production & Distribution</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
            Manufacturing Solutions
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto" style={{ fontFamily: "'Inter', sans-serif" }}>
            From concept to customer: Complete production and distribution services
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {solutions.map((solution, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`px-8 py-4 rounded-full font-semibold transition-all ${
                activeTab === index
                  ? 'bg-white text-black shadow-xl'
                  : 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
              }`}
            >
              {solution.title}
            </button>
          ))}
        </div>

        {/* Content Display */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image Side */}
          <div className="relative overflow-hidden rounded-3xl animate-fade-in-up">
            <img
              src={solutions[activeTab].image}
              alt={solutions[activeTab].title}
              className="w-full h-[500px] object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            
            {/* Icon Badge */}
            <div className="absolute top-6 left-6 w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20">
              <FiZap className="w-8 h-8 text-white" />
            </div>
          </div>

          {/* Text Side */}
          <div className="animate-fade-in-up animation-delay-200">
            <h3 className="text-4xl font-bold mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
              {solutions[activeTab].title}
            </h3>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
              {solutions[activeTab].description}
            </p>

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {solutions[activeTab].features.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-3 bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                  <FiCheck className="text-green-400 flex-shrink-0" />
                  <span className="text-sm text-gray-300">{feature}</span>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <button className="bg-white text-black px-8 py-4 rounded-full font-bold hover:bg-gray-200 transition-all transform hover:scale-105 flex items-center gap-3 shadow-xl group">
              Learn More
              <FiArrowRight className="group-hover:translate-x-2 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
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