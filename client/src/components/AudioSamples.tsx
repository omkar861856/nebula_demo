import React from 'react';
import { motion } from 'framer-motion';
import AudioPlayer from '@/components/ui/audio-player';

interface AudioSample {
  id: number;
  title: string;
  artist: string;
  album: string;
  imageUrl: string;
  audioUrl: string;
}

const AudioSamples: React.FC = () => {
  // These are sample audio URLs that would normally point to real audio files
  // In a real app, these would be provided by an API or file system
  const audioSamples: AudioSample[] = [
    {
      id: 1,
      title: "DIGITAL RESONANCE",
      artist: "META SYNTHWAVE",
      album: "DIGITAL DREAMS",
      imageUrl: "https://images.unsplash.com/photo-1541832676-9b763f718ff6",
      audioUrl: "https://cdn.pixabay.com/audio/2022/05/27/audio_1808fbf07a.mp3" // Placeholder audio URL
    },
    {
      id: 2,
      title: "NEURAL PATHWAYS",
      artist: "ECHO COLLECTIVE",
      album: "QUANTUM FIELDS",
      imageUrl: "https://images.unsplash.com/photo-1526327760257-75f515c74156",
      audioUrl: "https://cdn.pixabay.com/audio/2022/03/15/audio_c8a7fb63db.mp3" // Placeholder audio URL
    },
    {
      id: 3,
      title: "BINARY SUNSET",
      artist: "ARCHITECT",
      album: "SYSTEM REBOOT",
      imageUrl: "https://images.unsplash.com/photo-1584679109594-56fffe50d527",
      audioUrl: "https://cdn.pixabay.com/audio/2022/08/23/audio_d16703d4ee.mp3" // Placeholder audio URL
    },
    {
      id: 4,
      title: "SIMULATION THEORY",
      artist: "CYBER COLLECTIVE",
      album: "RED PILL",
      imageUrl: "https://images.unsplash.com/photo-1563089145-599997674d42",
      audioUrl: "https://cdn.pixabay.com/audio/2022/10/30/audio_8eb7cea2d4.mp3" // Placeholder audio URL
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
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
    <section id="audio" className="py-20 bg-[#080808] relative">
      <div className="absolute inset-0 z-[-1] opacity-20">
        <img 
          src="https://images.unsplash.com/photo-1557672172-298e090bd0f1" 
          alt="Matrix code" 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-digital text-4xl font-bold text-[#00FF41] mb-4 animate-flicker tracking-wider">AUDIO SAMPLES</h2>
          <p className="font-matrix text-[#4AFF83] max-w-2xl mx-auto">FREE YOUR MIND. EXPERIENCE THE SOUNDS THAT WILL TRANSPORT YOU TO ANOTHER REALITY.</p>
        </div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {audioSamples.map((sample) => (
            <motion.div key={sample.id} variants={itemVariants}>
              <AudioPlayer
                title={sample.title}
                artist={sample.artist}
                album={sample.album}
                imageUrl={sample.imageUrl}
                audioUrl={sample.audioUrl}
              />
            </motion.div>
          ))}
        </motion.div>
        
        <div className="text-center mt-12">
          <a 
            href="#" 
            className="matrix-button inline-block font-matrix bg-transparent border border-[#00FF41] text-[#00FF41] px-8 py-3 rounded tracking-wide hover:bg-[#004D40] hover:bg-opacity-30 text-lg neon-border"
          >
            EXPLORE FULL CATALOG
          </a>
        </div>
      </div>
    </section>
  );
};

export default AudioSamples;
