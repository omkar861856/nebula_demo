import React from 'react';
import { Link } from 'wouter';

const Footer: React.FC = () => {
  return (
    <footer className="py-10 bg-black border-t border-[#00FF41]">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <Link href="/" className="font-digital font-bold text-2xl tracking-wider text-[#00FF41] hover-glitch">
              NEBULA<span className="text-white">RECORDS</span>
            </Link>
            <p className="font-matrix text-[#4AFF83] text-sm mt-2">BREAK FREE FROM THE SYSTEM. EXPERIENCE REAL MUSIC.</p>
          </div>
          
          <div className="text-center md:text-right">
            <p className="font-matrix text-[#4AFF83] text-sm">&copy; {new Date().getFullYear()} NEBULA RECORDS. ALL RIGHTS RESERVED.</p>
            <p className="font-matrix text-[#4AFF83] text-xs mt-1">THE MATRIX HAS YOU...</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
