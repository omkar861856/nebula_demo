import React, { useState } from 'react';
import { Link } from 'wouter';

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black bg-opacity-90 border-b border-[#00FF41]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link href="/" className="font-digital font-bold text-2xl tracking-wider text-[#00FF41] hover-glitch">
                NEBULA<span className="text-white">RECORDS</span>
              </Link>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-6">
              <a href="#featured" className="font-matrix text-[#4AFF83] hover:text-[#00FF41] transition-colors duration-300 hover-glitch tracking-wide">
                CATALOG
              </a>
              <a href="#about" className="font-matrix text-[#4AFF83] hover:text-[#00FF41] transition-colors duration-300 hover-glitch tracking-wide">
                ABOUT
              </a>
              <a href="#audio" className="font-matrix text-[#4AFF83] hover:text-[#00FF41] transition-colors duration-300 hover-glitch tracking-wide">
                LISTEN
              </a>
              <a href="#contact" className="font-matrix text-[#4AFF83] hover:text-[#00FF41] transition-colors duration-300 hover-glitch tracking-wide">
                CONTACT
              </a>
            </div>
          </div>
          <div className="md:hidden">
            <button 
              onClick={toggleMobileMenu}
              className="matrix-button bg-[#004D40] px-3 py-1 rounded text-[#00FF41] hover:bg-opacity-80"
            >
              <span className="font-matrix">MENU</span>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu, toggle with button above */}
      <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:hidden bg-black bg-opacity-95 border-b border-[#00FF41]`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <a 
            href="#featured" 
            className="block px-3 py-2 font-matrix text-[#4AFF83] hover:text-[#00FF41] transition-colors duration-300"
            onClick={closeMobileMenu}
          >
            CATALOG
          </a>
          <a 
            href="#about" 
            className="block px-3 py-2 font-matrix text-[#4AFF83] hover:text-[#00FF41] transition-colors duration-300"
            onClick={closeMobileMenu}
          >
            ABOUT
          </a>
          <a 
            href="#audio" 
            className="block px-3 py-2 font-matrix text-[#4AFF83] hover:text-[#00FF41] transition-colors duration-300"
            onClick={closeMobileMenu}
          >
            LISTEN
          </a>
          <a 
            href="#contact" 
            className="block px-3 py-2 font-matrix text-[#4AFF83] hover:text-[#00FF41] transition-colors duration-300"
            onClick={closeMobileMenu}
          >
            CONTACT
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
