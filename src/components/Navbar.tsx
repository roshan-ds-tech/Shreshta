import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, User, Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import { motion, AnimatePresence } from 'motion/react';
import { useCart } from '../contexts/CartContext';
import React from 'react';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { cartCount } = useCart();
  
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Products', path: '/products' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-[#2C1810]/95 backdrop-blur-md border-b border-[#C5A572]/20" >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="flex items-center">
              <img src="/logo_final.png" alt="logo" className='h-24' style={{height: '110px'}}/>

            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative transition-colors ${
                  isActive(link.path)
                    ? 'text-[#D4AF37]'
                    : 'text-[#F5E6D3] hover:text-[#D4AF37]'
                }`}
              >
                {link.name}
                {isActive(link.path) && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute -bottom-[26px] left-0 right-0 h-0.5 bg-[#D4AF37]"
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/cart" className="relative text-[#F5E6D3] hover:text-[#D4AF37] transition-colors">
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute -top-2 -right-2 bg-[#D4AF37] text-[#2C1810] rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {String(cartCount)}
              </span>
            </Link>
            <Link to="/login">
              <Button
                variant="ghost"
                className="text-[#F5E6D3] hover:text-[#D4AF37] hover:bg-[#D4AF37]/10"
                style={{cursor: "pointer", color: "#F5E6D3"}}
              >
                <User className="w-4 h-4 mr-2" />
                Login
              </Button>
            </Link>
            <Link to="/signup">
              <Button className="bg-[#D4AF37] text-[#2C1810] hover:bg-[#C5A572]" style={{cursor: "pointer"}}>
                Sign Up
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-[#F5E6D3] hover:text-[#D4AF37]"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#3E2723] border-t border-[#C5A572]/20"
          >
            <div className="px-4 py-4 space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`block py-2 transition-colors ${
                    isActive(link.path)
                      ? 'text-[#D4AF37]'
                      : 'text-[#F5E6D3] hover:text-[#D4AF37]'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 space-y-2 border-t border-[#C5A572]/20">
                <Link to="/cart" className="flex items-center justify-between py-2 text-[#F5E6D3]">
                  <span>Cart</span>
                  <ShoppingCart className="w-5 h-5" />
                </Link>
                <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="outline" className="w-full border-[#C5A572] text-[white] hover:bg-[#D4AF37]/10"
                  style={{cursor: "pointer", color: "white"}}
                  >
                    Login
                  </Button>
                </Link>
                <Link to="/signup" onClick={() => setIsMenuOpen(false)}>
                  <Button className="w-full bg-[#D4AF37] text-[#2C1810] hover:bg-[#C5A572]">
                    Sign Up
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
