import React from 'react';
import { motion } from 'framer-motion';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  badge?: {
    text: string;
    color: string;
  };
}

const FeaturedProducts: React.FC = () => {
  const products: Product[] = [
    {
      id: 1,
      name: "SYNTH WAVE COLLECTION",
      description: "Limited edition vinyl collection featuring rare synthesizer tracks from the digital underground.",
      price: 199.99,
      imageUrl: "https://images.unsplash.com/photo-1590212151175-e58edd96185b",
      badge: {
        text: "NEW ARRIVAL",
        color: "#00FF41"
      }
    },
    {
      id: 2,
      name: "NEXUS PRO HEADPHONES",
      description: "Experience audio like never before. These headphones bring you deeper into the Matrix.",
      price: 349.99,
      imageUrl: "https://images.unsplash.com/photo-1545454675-3531b543be5d",
      badge: {
        text: "BEST SELLER",
        color: "#FF0000"
      }
    },
    {
      id: 3,
      name: "DIGITAL ORACLE TURNTABLE",
      description: "The perfect balance of analog warmth and digital precision. A revolution in sound technology.",
      price: 599.99,
      imageUrl: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04"
    },
    {
      id: 4,
      name: "CLASSIC VINYL BUNDLE",
      description: "A carefully curated collection of classic albums that defined generations of music history.",
      price: 129.99,
      imageUrl: "https://images.unsplash.com/photo-1614149162883-504ce4d13909"
    },
    {
      id: 5,
      name: "ZION MIXER CONSOLE",
      description: "Professional-grade mixing console for those who need to bend the rules of audio reality.",
      price: 799.99,
      imageUrl: "https://images.unsplash.com/photo-1598295893369-1918ffaf89a2"
    },
    {
      id: 6,
      name: "MORPHEUS SPECIAL EDITION",
      description: "Ultra-rare pressing with exclusive tracks that take you deeper into the rabbit hole.",
      price: 249.99,
      imageUrl: "https://images.unsplash.com/photo-1594623930572-300a3011d9ae",
      badge: {
        text: "LIMITED",
        color: "#00FF41"
      }
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section id="featured" className="py-20 bg-gradient-to-b from-[#080808] to-black">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-digital text-4xl font-bold text-[#00FF41] mb-4 animate-flicker tracking-wider">FEATURED CATALOG</h2>
          <p className="font-matrix text-[#4AFF83] max-w-2xl mx-auto">SELECT YOUR REALITY. BROWSE OUR COLLECTION OF RARE VINYL RECORDS AND HIGH-END EQUIPMENT.</p>
        </div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {products.map((product) => (
            <motion.div 
              key={product.id}
              className="neon-border bg-black bg-opacity-80 rounded overflow-hidden transition-all duration-300 hover:scale-105 cursor-pointer"
              variants={itemVariants}
            >
              <div className="relative">
                <img src={product.imageUrl} alt={product.name} className="w-full h-64 object-cover" />
                {product.badge && (
                  <div 
                    className="absolute top-0 right-0 px-2 py-1 m-2 font-matrix text-sm"
                    style={{ backgroundColor: product.badge.color, color: 'black' }}
                  >
                    {product.badge.text}
                  </div>
                )}
              </div>
              <div className="p-6">
                <h3 className="font-digital text-xl text-[#00FF41] mb-2">{product.name}</h3>
                <p className="font-matrix text-sm text-[#4AFF83] mb-4">{product.description}</p>
                <div className="flex justify-between items-center">
                  <span className="font-digital text-xl text-white">${product.price.toFixed(2)}</span>
                  <button className="matrix-button bg-[#004D40] text-[#00FF41] px-4 py-2 rounded font-matrix text-sm hover:bg-opacity-70 neon-border">
                    ADD TO CART
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <div className="text-center mt-12">
          <a 
            href="#" 
            className="matrix-button inline-block font-matrix bg-transparent border border-[#00FF41] text-[#00FF41] px-8 py-3 rounded tracking-wide hover:bg-[#004D40] hover:bg-opacity-30 text-lg neon-border"
          >
            VIEW COMPLETE CATALOG
          </a>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
