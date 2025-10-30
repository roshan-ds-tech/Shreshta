import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import React from 'react';

export function Footer() {
  return (
    <footer className="bg-[#2C1810] text-[#F5E6D3] border-t border-[#C5A572]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
              <span className="flex items-center">
              <img src="/logo_final.png" alt="logo" style={{height: '150px'}} />

            </span>
            <p className="text-sm text-[#C5A572]" style={{}}>
              Premium organic jaggery crafted with tradition. Pure, natural sweetness from farm to table.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-[#D4AF37] mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-sm hover:text-[#D4AF37] transition-colors">Home</Link></li>
              <li><Link to="/products" className="text-sm hover:text-[#D4AF37] transition-colors">Products</Link></li>
              <li><Link to="/about" className="text-sm hover:text-[#D4AF37] transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-sm hover:text-[#D4AF37] transition-colors">Contact</Link></li>
              <li><Link to="/cart" className="text-sm hover:text-[#D4AF37] transition-colors">Cart</Link></li>
              <li><Link to="/login" className="text-sm hover:text-[#D4AF37] transition-colors">Login</Link></li>
              <li><Link to="/signup" className="text-sm hover:text-[#D4AF37] transition-colors">Sign Up</Link></li>
            </ul>
          </div>

          {/* Customer Support */}
          <div>
            <h3 className="text-[#D4AF37] mb-4">Customer Support</h3>
            <ul className="space-y-2">
              <li><Link to="/faq" className="text-sm hover:text-[#D4AF37] transition-colors">FAQ</Link></li>
              <li><Link to="/privacy" className="text-sm hover:text-[#D4AF37] transition-colors">Privacy Policy</Link></li>
              <li><Link to="/privacy" className="text-sm hover:text-[#D4AF37] transition-colors">Terms & Conditions</Link></li>
              <li><a href="#" className="text-sm hover:text-[#D4AF37] transition-colors">Shipping Policy</a></li>
              <li><a href="#" className="text-sm hover:text-[#D4AF37] transition-colors">Return Policy</a></li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-[#D4AF37] mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full border-2 border-[#D4AF37] flex items-center justify-center hover:bg-[#D4AF37] hover:text-[#2C1810] transition-all"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full border-2 border-[#D4AF37] flex items-center justify-center hover:bg-[#D4AF37] hover:text-[#2C1810] transition-all"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full border-2 border-[#D4AF37] flex items-center justify-center hover:bg-[#D4AF37] hover:text-[#2C1810] transition-all"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full border-2 border-[#D4AF37] flex items-center justify-center hover:bg-[#D4AF37] hover:text-[#2C1810] transition-all"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
            <div className="mt-6 space-y-2">
              <p className="text-sm">Email: info@puregur.com</p>
              <p className="text-sm">Phone: +91 98765 43210</p>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-[#C5A572]/20 text-center">
          <p className="text-sm text-[#C5A572]">
            © 2025 Shreshta. All rights reserved. Crafted with tradition and love.
          </p>
        </div>
      </div>
    </footer>
  );
}
