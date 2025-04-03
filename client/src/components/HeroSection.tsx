import React from 'react';
import { motion } from 'framer-motion';

const HeroSection: React.FC = () => {
  return (
    <header className="relative h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 z-[-1]">
        <div className="absolute inset-0 bg-[#080808] bg-opacity-70"></div>
        <img 
          src="https://images.unsplash.com/photo-1626892498484-13e9c18ace06" 
          alt="Matrix code background" 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center">
          <motion.h1 
            className="font-digital text-5xl md:text-7xl font-extrabold text-[#00FF41] mb-5 tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            ENTER THE <span className="text-white">MATRIX</span>
          </motion.h1>
          <motion.p 
            className="font-matrix text-xl md:text-2xl mb-8 max-w-3xl mx-auto tracking-wide text-[#4AFF83]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            DISCOVER A REALITY WHERE MUSIC TRANSCENDS THE DIGITAL CODE OF THE UNIVERSE
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 mt-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <a 
              href="#featured" 
              className="matrix-button bg-[#00FF41] text-black font-matrix px-8 py-3 rounded tracking-wide hover:bg-opacity-90 text-lg font-bold neon-border"
            >
              EXPLORE CATALOG
            </a>
            <a 
              href="#audio" 
              className="matrix-button bg-transparent border border-[#00FF41] text-[#00FF41] font-matrix px-8 py-3 rounded tracking-wide hover:bg-[#004D40] hover:bg-opacity-30 text-lg neon-border"
            >
              LISTEN NOW
            </a>
          </motion.div>
        </div>
        
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-center">
          <div className="animate-scroll-down">
            <svg className="w-6 h-6 mx-auto text-[#00FF41]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
            <span className="font-matrix text-sm text-[#4AFF83]">SCROLL DOWN</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeroSection;
