import React, { useEffect, useState } from "react"
import { FiAward, FiHeart, FiTrendingUp, FiUsers, FiShield, FiZap } from "react-icons/fi"

const About: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [scrollY, setScrollY] = useState(0)
 

  useEffect(() => {
    setIsVisible(true)
    
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const values = [
    {
      icon: <FiAward className="w-8 h-8" />,
      title: "Quality First",
      description: "Premium fabrics and meticulous craftsmanship in every piece"
    },
    {
      icon: <FiHeart className="w-8 h-8" />,
      title: "Passion Driven",
      description: "Created with love for fashion and attention to detail"
    },
    {
      icon: <FiTrendingUp className="w-8 h-8" />,
      title: "Innovation",
      description: "Blending traditional techniques with modern design"
    },
    {
      icon: <FiUsers className="w-8 h-8" />,
      title: "Community",
      description: "Building a global family of fashion enthusiasts"
    },
    {
      icon: <FiShield className="w-8 h-8" />,
      title: "Authenticity",
      description: "Staying true to our roots and original vision"
    },
    {
      icon: <FiZap className="w-8 h-8" />,
      title: "Bold Style",
      description: "Empowering self-expression through unique designs"
    }
  ]

  const timeline = [
    { year: "2020", event: "Brand Founded", description: "Started with a vision to revolutionize streetwear" },
    { year: "2021", event: "First Collection", description: "Launched debut collection to critical acclaim" },
    { year: "2022", event: "Global Expansion", description: "Expanded to international markets" },
    { year: "2023", event: "Sustainable Line", description: "Introduced eco-friendly fashion line" },
    { year: "2024", event: "Innovation Award", description: "Recognized for design excellence" },
    { year: "2025", event: "Future Vision", description: "Continuing to push boundaries" }
  ]

  return (
    <div className="w-full bg-black text-white overflow-hidden">
      {/* Hero Section with Parallax */}
      <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1558769132-cb1aea1c8e90?w=1600&h=900&fit=crop')",
            transform: `translateY(${scrollY * 0.5}px)`,
            transition: 'transform 0.1s ease-out'
          }}
        />
        
        {/* Gradient Overlays - Darker for better text visibility */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-black/80 to-black/90" />
        
        {/* Animated Particles - Behind text with lower z-index */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-float-slow" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-float-delayed" />
          <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse-slow" />
        </div>

        {/* Content - Higher z-index to stay on top */}
        <div className="relative z-20 text-center px-6 max-w-5xl mx-auto">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h1 
              className="text-6xl md:text-8xl font-bold mb-6 leading-tight drop-shadow-2xl"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Our <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent animate-shimmer">Story</span>
            </h1>
            <p 
              className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto mb-8 drop-shadow-lg"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Where passion meets fashion, and dreams become reality
            </p>
          </div>

        </div>
      </section>

      {/* Brand Story Section */}
      <section className="relative py-24 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Text Content */}
            <div className="animate-fade-in-left">
              <div className="inline-block mb-4">
                <span className="text-gray-400 text-sm uppercase tracking-widest font-semibold">Our Mission</span>
              </div>
              <h2 
                className="text-4xl md:text-5xl font-bold mb-6"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Redefining Fashion Excellence
              </h2>
              <p 
                className="text-lg text-gray-300 mb-6 leading-relaxed"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                We are a modern clothing brand focused on delivering high-quality, stylish, and comfortable apparel for everyday life. Our designs combine street culture, simplicity, and global fashion trends.
              </p>
              <p 
                className="text-lg text-gray-300 mb-6 leading-relaxed"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Every product is carefully crafted using premium fabrics and attention to detail. We believe clothing is more than fashion — it is a form of self-expression and confidence.
              </p>
              <p 
                className="text-lg text-gray-300 leading-relaxed"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                From casual wear to standout pieces, our collections are made for individuals who value originality, comfort, and bold style.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 mt-12">
                <div className="text-center">
                  <div className="text-4xl font-bold text-purple-400 mb-2">5+</div>
                  <div className="text-sm text-gray-400">Years</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-pink-400 mb-2">10K+</div>
                  <div className="text-sm text-gray-400">Customers</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-400 mb-2">50+</div>
                  <div className="text-sm text-gray-400">Collections</div>
                </div>
              </div>
            </div>

            {/* Image Grid */}
            <div className="relative animate-fade-in-right">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="relative overflow-hidden rounded-2xl group">
                    <img 
                      src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&h=500&fit=crop"
                      alt="Fashion"
                      className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="relative overflow-hidden rounded-2xl group">
                    <img 
                      src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&h=300&fit=crop"
                      alt="Fashion"
                      className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>
                <div className="space-y-4 mt-8">
                  <div className="relative overflow-hidden rounded-2xl group">
                    <img 
                      src="https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=300&fit=crop"
                      alt="Fashion"
                      className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="relative overflow-hidden rounded-2xl group">
                    <img 
                      src="https://images.unsplash.com/photo-1558769132-cb1aea1c8e90?w=400&h=500&fit=crop"
                      alt="Fashion"
                      className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>
              </div>

              {/* Floating Badge */}
              <div className="absolute -top-6 -left-6 bg-gradient-to-br from-purple-600 to-pink-600 text-white px-6 py-3 rounded-full font-bold shadow-2xl animate-float-slow">
                Est. 2020
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Founder Section - PHOTO SPACE */}
      <section className="relative py-24 bg-gray-900 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Founder Photo - YOUR PHOTO GOES HERE */}
            <div className="relative animate-fade-in-left">
              <div className="relative">
                {/* Main Photo Container */}
                <div className="relative overflow-hidden rounded-3xl border-4 border-white/10 shadow-2xl group">
                  <img 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=700&fit=crop"
                    alt="Kalana Maduranga Hapuarachchi - Founder"
                    className="w-full h-[600px] object-cover transform group-hover:scale-105 transition-transform duration-700"
                  />
                  {/* Replace the src above with your actual photo URL */}
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                  
                  {/* Name Badge */}
                  <div className="absolute bottom-8 left-8 right-8">
                    <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6">
                      <h3 className="text-2xl font-bold mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                        Kalana Maduranga Hapuarachchi
                      </h3>
                      <p className="text-gray-300">Founder & Creative Director</p>
                    </div>
                  </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full blur-2xl opacity-50 animate-pulse-slow" />
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full blur-2xl opacity-50 animate-pulse-slow" style={{ animationDelay: '1s' }} />
              </div>
            </div>

            {/* Founder Story */}
            <div className="animate-fade-in-right">
              <div className="inline-block mb-4">
                <span className="text-gray-400 text-sm uppercase tracking-widest font-semibold">Meet The Founder</span>
              </div>
              <h2 
                className="text-4xl md:text-5xl font-bold mb-6"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                The Vision Behind the Brand
              </h2>
              <p 
                className="text-lg text-gray-300 mb-6 leading-relaxed"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Kalana Maduranga Hapuarachchi founded this brand with a singular vision: to create clothing that transcends mere fashion and becomes a statement of identity, confidence, and artistic expression.
              </p>
              <p 
                className="text-lg text-gray-300 mb-6 leading-relaxed"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                With years of experience in fashion design and a deep understanding of global trends, Kalana has built a brand that celebrates individuality while maintaining the highest standards of quality and craftsmanship.
              </p>
              <p 
                className="text-lg text-gray-300 mb-8 leading-relaxed"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Every collection tells a story, every piece is carefully curated, and every design reflects the passion and dedication that drives this creative journey forward.
              </p>

              {/* Founder Highlights */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
                  <div className="text-3xl font-bold text-purple-400 mb-2">10+</div>
                  <div className="text-sm text-gray-400">Years Experience</div>
                </div>
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
                  <div className="text-3xl font-bold text-pink-400 mb-2">5+</div>
                  <div className="text-sm text-gray-400">Design Awards</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="relative py-24 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 animate-fade-in-up">
            <div className="inline-block mb-4">
              <span className="text-gray-400 text-sm uppercase tracking-widest font-semibold">What We Stand For</span>
            </div>
            <h2 
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Our Core Values
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="group relative overflow-hidden bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm p-8 rounded-3xl border border-gray-700/50 hover:border-gray-600/50 transition-all duration-500 transform hover:-translate-y-2 animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Glowing Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-pink-500/0 group-hover:from-purple-500/10 group-hover:to-pink-500/10 transition-all duration-500" />

                <div className="relative z-10">
                  {/* Icon */}
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center text-white mb-6 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                    {value.icon}
                  </div>

                  <h3 
                    className="text-2xl font-bold mb-3"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {value.title}
                  </h3>
                  <p 
                    className="text-gray-400 leading-relaxed"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {value.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="relative py-24 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 animate-fade-in-up">
            <div className="inline-block mb-4">
              <span className="text-gray-400 text-sm uppercase tracking-widest font-semibold">Our Journey</span>
            </div>
            <h2 
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Brand Timeline
            </h2>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-purple-500 via-pink-500 to-blue-500 opacity-30" />

            {timeline.map((item, index) => (
              <div
                key={index}
                className={`relative flex items-center mb-16 ${
                  index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                } animate-fade-in-up`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {/* Content */}
                <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-12' : 'text-left pl-12'}`}>
                  <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 transform hover:-translate-y-1">
                    <div className="text-3xl font-bold text-purple-400 mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                      {item.year}
                    </div>
                    <h3 className="text-xl font-bold mb-2">{item.event}</h3>
                    <p className="text-gray-400 text-sm">{item.description}</p>
                  </div>
                </div>

                {/* Center Dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full border-4 border-gray-900 z-10 animate-pulse-slow" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 bg-gray-900">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-600 to-pink-600 p-16">
            {/* Animated Background Elements */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-float-slow" />
            <div className="absolute bottom-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-float-delayed" />

            <div className="relative z-10">
              <h2 
                className="text-4xl md:text-5xl font-bold mb-6 text-white"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Join Our Fashion Journey
              </h2>
              <p 
                className="text-xl text-white/90 mb-8"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Be part of something extraordinary. Explore our latest collections and express your unique style.
              </p>
              <button className="bg-white text-purple-600 px-10 py-4 rounded-full font-bold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-2xl">
                Shop Now
              </button>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

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

        @keyframes pulseSlow {
          0%, 100% {
            transform: scale(1);
            opacity: 0.5;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.8;
          }
        }

        @keyframes shimmer {
          0% {
            background-position: -200% center;
          }
          100% {
            background-position: 200% center;
          }
        }

        @keyframes scrollDotDown {
          0% {
            opacity: 1;
            transform: translateY(-4px);
          }
          100% {
            opacity: 0;
            transform: translateY(20px);
          }
        }

        .animate-fade-in-left {
          animation: fadeInLeft 0.8s ease-out forwards;
        }

        .animate-fade-in-right {
          animation: fadeInRight 0.8s ease-out forwards;
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
          opacity: 0;
        }

        .animate-float-slow {
          animation: floatSlow 20s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: floatDelayed 25s ease-in-out infinite;
        }

        .animate-pulse-slow {
          animation: pulseSlow 4s ease-in-out infinite;
        }

        .animate-shimmer {
          background-size: 200% auto;
          animation: shimmer 3s linear infinite;
        }

        .animate-scroll-dot-down {
          animation: scrollDotDown 1.5s ease-in infinite;
        }

        .border-3 {
          border-width: 3px;
        }
      `}</style>
    </div>
  )
}

export default About