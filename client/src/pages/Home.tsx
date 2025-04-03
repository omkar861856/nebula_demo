import React, { useEffect, useRef } from 'react';
import MatrixRain from '@/lib/matrixRain';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import FeaturedProducts from '@/components/FeaturedProducts';
import AboutSection from '@/components/AboutSection';
import AudioSamples from '@/components/AudioSamples';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

const Home: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const matrixRainRef = useRef<MatrixRain | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      matrixRainRef.current = new MatrixRain(canvasRef.current);
      matrixRainRef.current.start();
    }

    return () => {
      if (matrixRainRef.current) {
        matrixRainRef.current.stop();
      }
    };
  }, []);

  return (
    <>
      {/* Matrix Rain Background */}
      <div className="matrix-rain-container">
        <canvas ref={canvasRef} className="matrix-rain"></canvas>
      </div>
      
      <div className="relative z-10 overflow-x-hidden">
        <Navbar />
        
        <main>
          <HeroSection />
          <FeaturedProducts />
          <AboutSection />
          <AudioSamples />
          <ContactSection />
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default Home;
