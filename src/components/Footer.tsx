import { FiFacebook, FiTwitter, FiMail, FiInstagram, FiYoutube } from "react-icons/fi"
import { useState, useEffect } from "react"

export default function Footer() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  
  const roles = [
    "Fullstack Developer",
    "Software Engineer",
    "UI UX Developer"
  ];

  useEffect(() => {
    const currentRole = roles[roleIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        // Typing
        if (displayText.length < currentRole.length) {
          setDisplayText(currentRole.substring(0, displayText.length + 1));
        } else {
          // Pause before deleting
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        // Deleting
        if (displayText.length > 0) {
          setDisplayText(currentRole.substring(0, displayText.length - 1));
        } else {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, roleIndex]);

  return (
    <footer className="relative bg-neutral-900 text-white mt-auto overflow-hidden">
      {/* Diagonal background */}
      <div className="absolute inset-0 bg-gradient-to-br from-neutral-800 to-neutral-900">
        <div className="absolute top-0 right-0 w-full h-full bg-neutral-800 transform origin-top-left -skew-y-6"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          
          {/* Left Side - Contact Info */}
          <div>
            <h2 className="text-5xl font-bold mb-4 tracking-tight">CONTACT US</h2>
            <p className="text-gray-300 mb-12 text-lg">We are looking forward to hearing from you soon</p>
            
            <div className="mb-8">
              <div className="flex items-start mb-4">
                <FiMail className="text-2xl mt-1 mr-4" />
                <div>
                  <h4 className="font-semibold mb-2">ADDRESS</h4>
                  <p className="text-gray-300 text-sm">Company "InTouch"</p>
                  <p className="text-gray-300 text-sm">275 7th Ave</p>
                  <p className="text-gray-300 text-sm">7th Floor</p>
                  <p className="text-gray-300 text-sm">New York</p>
                  <p className="text-gray-300 text-sm">NY USA</p>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="flex space-x-6 text-2xl">
              <a href="#" className="hover:text-gray-400 transition">
                <FiFacebook />
              </a>
              <a href="#" className="hover:text-gray-400 transition">
                <FiTwitter />
              </a>
              <a href="#" className="hover:text-gray-400 transition">
                <FiInstagram />
              </a>
              <a href="#" className="hover:text-gray-400 transition">
                <FiYoutube />
              </a>
              <a href="#" className="hover:text-gray-400 transition">
                <FiMail />
              </a>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                placeholder="NAME"
                className="bg-neutral-700 border border-neutral-600 px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
              />
              <input
                type="email"
                placeholder="EMAIL"
                className="bg-neutral-700 border border-neutral-600 px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <input
                type="tel"
                placeholder="PHONE"
                className="bg-neutral-700 border border-neutral-600 px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
              />
              <input
                type="text"
                placeholder="ADDRESS"
                className="bg-neutral-700 border border-neutral-600 px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
              />
            </div>
            
            <textarea
              placeholder="MESSAGE"
              rows={6}
              className="w-full bg-neutral-700 border border-neutral-600 px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 mb-4 resize-none"
            ></textarea>
            
            <div className="flex justify-end">
              <button className="bg-neutral-700 border border-neutral-600 hover:bg-neutral-600 px-12 py-3 text-white font-semibold transition">
                DONE
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
          <div className="text-center md:text-left">
            <p className="flex items-center justify-center md:justify-start flex-wrap gap-1">
              <span>&copy; DEVELOP BY</span>
              <span className="text-purple-400 font-semibold">👩‍💻 "MR KALANA"</span>
              <span>.</span>
              <span className="text-cyan-400 font-bold text-base tracking-wide">{displayText}</span>
              <span className="text-cyan-400 animate-pulse font-bold">|</span>
            </p>
            <p className="mt-2">
              <span className="text-yellow-400 font-medium">All rights reserved</span>
              <span className="mx-1">🔭.</span>
              <span className="text-green-400 font-semibold">2026</span>
              <span className="ml-1">📅</span>
            </p>
          </div>
          <button className="hover:text-white transition flex items-center gap-2 font-semibold">
            BACK TO TOP
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          </button>
        </div>
      </div>
    </footer>
  )
}