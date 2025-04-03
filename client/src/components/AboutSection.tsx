import React from 'react';
import { motion } from 'framer-motion';

const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 relative">
      <div className="absolute inset-0 z-[-1]">
        <div className="absolute inset-0 bg-[#080808] bg-opacity-90"></div>
        <img 
          src="https://images.unsplash.com/photo-1470225620780-dba8ba36b8b1" 
          alt="Music equipment background" 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="container mx-auto px-6">
        <motion.div 
          className="max-w-5xl mx-auto bg-black bg-opacity-70 p-8 md:p-12 rounded neon-border"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-10">
            <h2 className="font-digital text-4xl font-bold text-[#00FF41] mb-4 animate-flicker tracking-wider">ABOUT NEBULA RECORDS</h2>
            <div className="w-20 h-1 bg-[#00FF41] mx-auto"></div>
          </div>
          
          <div className="md:flex items-center space-y-8 md:space-y-0 md:space-x-10">
            <div className="md:w-1/2">
              <p className="font-matrix text-[#4AFF83] mb-6 leading-relaxed">
                NEBULA RECORDS was founded in 2010 by a collective of audio engineers and music enthusiasts who believed in preserving the authenticity of music in an increasingly digital world.
              </p>
              <p className="font-matrix text-[#4AFF83] mb-6 leading-relaxed">
                We specialize in rare vinyl pressings, limited edition releases, and high-end audio equipment that transcends the ordinary listening experience.
              </p>
              <p className="font-matrix text-[#4AFF83] leading-relaxed">
                Our mission is to bridge the gap between the analog past and digital future, creating a unique space where music lovers can discover sounds that break free from the constraints of the mainstream matrix.
              </p>
              
              <div className="mt-8">
                <h3 className="font-digital text-xl text-[#00FF41] mb-4">THE FOUNDER</h3>
                <div className="flex items-center">
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden neon-border">
                      <img 
                        src="https://images.unsplash.com/photo-1534308143481-c55f00be8bd7" 
                        alt="Founder" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-digital text-white text-lg">THOMAS ANDERSON</h4>
                    <p className="font-matrix text-[#4AFF83] text-sm">SOUND ARCHITECT & COLLECTOR</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="md:w-1/2">
              <div className="relative overflow-hidden rounded neon-border h-80">
                <img 
                  src="https://images.unsplash.com/photo-1526394931762-8a4116f6e8d2" 
                  alt="Store interior" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 text-center">
                  <span className="font-digital text-[#00FF41] text-xl">OUR FLAGSHIP STORE</span>
                </div>
              </div>
              
              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <svg className="w-6 h-6 text-[#00FF41]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <span className="font-matrix text-[#4AFF83]">5000+ VINYL RECORDS</span>
                </div>
                <div className="flex items-center space-x-2">
                  <svg className="w-6 h-6 text-[#00FF41]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <span className="font-matrix text-[#4AFF83]">PREMIUM EQUIPMENT</span>
                </div>
                <div className="flex items-center space-x-2">
                  <svg className="w-6 h-6 text-[#00FF41]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <span className="font-matrix text-[#4AFF83]">WORLDWIDE SHIPPING</span>
                </div>
                <div className="flex items-center space-x-2">
                  <svg className="w-6 h-6 text-[#00FF41]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <span className="font-matrix text-[#4AFF83]">EXPERT CURATION</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
