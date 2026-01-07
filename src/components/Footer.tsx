import { Link } from "react-router-dom"
import { FiFacebook, FiInstagram, FiTwitter, FiMail } from "react-icons/fi"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Company Info */}
          <div>
            <h3 className="text-white text-xl font-bold mb-4">Clothing Store</h3>
            <p className="text-sm leading-relaxed">
              Your destination for quality fashion. Discover the latest trends and timeless classics.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-white transition">Home</Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-white transition">Products</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition">About Us</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-white font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/shipping" className="hover:text-white transition">Shipping Info</Link>
              </li>
              <li>
                <Link to="/returns" className="hover:text-white transition">Returns</Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-white transition">FAQ</Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-white transition">Privacy Policy</Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white font-semibold mb-4">Stay Connected</h4>
            <p className="text-sm mb-4">Subscribe to get special offers and updates.</p>
            <div className="flex mb-4">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-3 py-2 text-sm text-gray-900 rounded-l focus:outline-none"
              />
              <button className="bg-white text-gray-900 px-4 py-2 rounded-r hover:bg-gray-100 transition">
                <FiMail />
              </button>
            </div>
            
            {/* Social Media */}
            <div className="flex space-x-4 text-xl">
              <a href="#" className="hover:text-white transition">
                <FiFacebook />
              </a>
              <a href="#" className="hover:text-white transition">
                <FiInstagram />
              </a>
              <a href="#" className="hover:text-white transition">
                <FiTwitter />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-6 text-sm text-center">
          <p>&copy; {new Date().getFullYear()} Clothing Store. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}