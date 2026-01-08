import { Mail, Phone, MessageCircle, Facebook, MapPin } from 'lucide-react';

const Contact = () => {
  return (
    <div className="min-h-screen relative overflow-hidden" style={{ backgroundColor: '#2B4242' }}>
      {/* Ambient Background with Gradient Overlay */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 opacity-40"
          style={{
            background: 'radial-gradient(circle at 30% 20%, #6B8784 0%, transparent 50%), radial-gradient(circle at 70% 80%, #93A4AB 0%, transparent 50%)',
            animation: 'ambient 8s ease-in-out infinite alternate'
          }}
        ></div>
        {/* Subtle Texture Overlay */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.4"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'
        }}></div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600&family=Montserrat:wght@300;400;500;600&display=swap');
        
        @keyframes ambient {
          0% { transform: scale(1) translateY(0); }
          100% { transform: scale(1.1) translateY(-20px); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }

        .decorative-branch {
          position: absolute;
          opacity: 0.15;
          animation: float 6s ease-in-out infinite;
        }
      `}</style>

      {/* Decorative Elements */}
      <svg className="decorative-branch" style={{ right: '5%', top: '10%', width: '200px' }} viewBox="0 0 200 300" fill="none">
        <path d="M100 0 Q 120 50 100 100 Q 85 150 100 200 Q 110 250 100 300" stroke="#C3C6C3" strokeWidth="2"/>
        <circle cx="120" cy="60" r="8" fill="#C3C6C3"/>
        <circle cx="85" cy="120" r="6" fill="#C3C6C3"/>
        <circle cx="110" cy="180" r="7" fill="#C3C6C3"/>
        <circle cx="90" cy="240" r="5" fill="#C3C6C3"/>
      </svg>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        {/* Header */}
        <div className="text-center mb-20">
          <h1 
            className="text-6xl md:text-7xl font-light mb-6 tracking-wide"
            style={{ fontFamily: "'Cormorant Garamond', serif", color: '#C3C6C3' }}
          >
            Let's Connect
          </h1>
          <p 
            className="text-lg tracking-widest uppercase"
            style={{ fontFamily: "'Montserrat', sans-serif", color: '#93A4AB', fontWeight: '300' }}
          >
            Reach out and say hello
          </p>
          <div className="w-32 h-px mx-auto mt-8" style={{ backgroundColor: '#6B8784' }}></div>
        </div>

        {/* Contact Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {/* Email */}
          <a 
            href="mailto:kalanaroxx2000@gmail.com"
            className="group relative backdrop-blur-md rounded-lg p-8 transition-all duration-500 hover:scale-105"
            style={{ 
              backgroundColor: 'rgba(107, 135, 132, 0.15)',
              border: '1px solid rgba(195, 198, 195, 0.2)'
            }}
          >
            <div 
              className="w-14 h-14 rounded-full flex items-center justify-center mb-6 mx-auto transition-all duration-500 group-hover:scale-110"
              style={{ backgroundColor: '#6B8784' }}
            >
              <Mail className="text-white" size={24} />
            </div>
            <h3 
              className="text-lg mb-3 text-center tracking-wide"
              style={{ fontFamily: "'Montserrat', sans-serif", color: '#C3C6C3', fontWeight: '500' }}
            >
              Email
            </h3>
            <p 
              className="text-sm text-center break-all"
              style={{ fontFamily: "'Montserrat', sans-serif", color: '#93A4AB', fontWeight: '300' }}
            >
              kalanaroxx2000@gmail.com
            </p>
          </a>

          {/* Phone */}
          <a 
            href="tel:+94717295608"
            className="group relative backdrop-blur-md rounded-lg p-8 transition-all duration-500 hover:scale-105"
            style={{ 
              backgroundColor: 'rgba(107, 135, 132, 0.15)',
              border: '1px solid rgba(195, 198, 195, 0.2)'
            }}
          >
            <div 
              className="w-14 h-14 rounded-full flex items-center justify-center mb-6 mx-auto transition-all duration-500 group-hover:scale-110"
              style={{ backgroundColor: '#93A4AB' }}
            >
              <Phone className="text-white" size={24} />
            </div>
            <h3 
              className="text-lg mb-3 text-center tracking-wide"
              style={{ fontFamily: "'Montserrat', sans-serif", color: '#C3C6C3', fontWeight: '500' }}
            >
              Phone
            </h3>
            <p 
              className="text-sm text-center"
              style={{ fontFamily: "'Montserrat', sans-serif", color: '#93A4AB', fontWeight: '300' }}
            >
              071-7295608
            </p>
          </a>

          {/* WhatsApp */}
          <a 
            href="https://wa.me/94717295608"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative backdrop-blur-md rounded-lg p-8 transition-all duration-500 hover:scale-105"
            style={{ 
              backgroundColor: 'rgba(107, 135, 132, 0.15)',
              border: '1px solid rgba(195, 198, 195, 0.2)'
            }}
          >
            <div 
              className="w-14 h-14 rounded-full flex items-center justify-center mb-6 mx-auto transition-all duration-500 group-hover:scale-110"
              style={{ backgroundColor: '#706F6B' }}
            >
              <MessageCircle className="text-white" size={24} />
            </div>
            <h3 
              className="text-lg mb-3 text-center tracking-wide"
              style={{ fontFamily: "'Montserrat', sans-serif", color: '#C3C6C3', fontWeight: '500' }}
            >
              WhatsApp
            </h3>
            <p 
              className="text-sm text-center"
              style={{ fontFamily: "'Montserrat', sans-serif", color: '#93A4AB', fontWeight: '300' }}
            >
              Chat with me
            </p>
          </a>

          {/* Facebook */}
          <a 
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative backdrop-blur-md rounded-lg p-8 transition-all duration-500 hover:scale-105"
            style={{ 
              backgroundColor: 'rgba(107, 135, 132, 0.15)',
              border: '1px solid rgba(195, 198, 195, 0.2)'
            }}
          >
            <div 
              className="w-14 h-14 rounded-full flex items-center justify-center mb-6 mx-auto transition-all duration-500 group-hover:scale-110"
              style={{ backgroundColor: '#6B8784' }}
            >
              <Facebook className="text-white" size={24} />
            </div>
            <h3 
              className="text-lg mb-3 text-center tracking-wide"
              style={{ fontFamily: "'Montserrat', sans-serif", color: '#C3C6C3', fontWeight: '500' }}
            >
              Facebook
            </h3>
            <p 
              className="text-sm text-center"
              style={{ fontFamily: "'Montserrat', sans-serif", color: '#93A4AB', fontWeight: '300' }}
            >
              Connect on FB
            </p>
          </a>
        </div>

        {/* CTA Buttons */}
        <div className="max-w-2xl mx-auto grid md:grid-cols-2 gap-6 mb-16">
          <a
            href="tel:+94717295608"
            className="group py-5 px-8 rounded-lg flex items-center justify-center gap-3 transition-all duration-500 hover:shadow-2xl"
            style={{ 
              backgroundColor: '#6B8784',
              fontFamily: "'Montserrat', sans-serif",
              color: '#ffffff',
              fontWeight: '500',
              letterSpacing: '0.05em'
            }}
          >
            <Phone className="group-hover:rotate-12 transition-transform" size={22} />
            <span>CALL NOW</span>
          </a>

          <a
            href="https://wa.me/94717295608"
            target="_blank"
            rel="noopener noreferrer"
            className="group py-5 px-8 rounded-lg flex items-center justify-center gap-3 transition-all duration-500 hover:shadow-2xl"
            style={{ 
              backgroundColor: '#93A4AB',
              fontFamily: "'Montserrat', sans-serif",
              color: '#ffffff',
              fontWeight: '500',
              letterSpacing: '0.05em'
            }}
          >
            <MessageCircle className="group-hover:scale-110 transition-transform" size={22} />
            <span>WHATSAPP</span>
          </a>
        </div>

        {/* Footer */}
        <div className="text-center space-y-6">
          <div className="flex items-center justify-center gap-2">
            <MapPin size={18} style={{ color: '#93A4AB' }} />
            <span 
              className="text-sm tracking-wider"
              style={{ fontFamily: "'Montserrat', sans-serif", color: '#93A4AB', fontWeight: '300' }}
            >
              Sri Lanka 🇱🇰
            </span>
          </div>
          <p 
            className="text-sm tracking-wide"
            style={{ fontFamily: "'Montserrat', sans-serif", color: '#706F6B', fontWeight: '300' }}
          >
            I typically respond within 24 hours
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;