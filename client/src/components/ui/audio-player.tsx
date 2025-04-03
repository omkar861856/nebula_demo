import React, { useState, useEffect, useRef } from 'react';
import { Howl } from 'howler';
import { Play, Pause } from 'lucide-react';

interface AudioPlayerProps {
  title: string;
  artist: string;
  album: string;
  imageUrl: string;
  audioUrl: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({
  title,
  artist,
  album,
  imageUrl,
  audioUrl
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [progress, setProgress] = useState(0);
  const sound = useRef<Howl | null>(null);
  const requestRef = useRef<number | null>(null);

  useEffect(() => {
    sound.current = new Howl({
      src: [audioUrl],
      html5: true,
      onload: () => {
        if (sound.current) {
          setDuration(sound.current.duration());
        }
      },
      onplay: () => {
        setIsPlaying(true);
        animate();
      },
      onpause: () => {
        setIsPlaying(false);
        if (requestRef.current) {
          cancelAnimationFrame(requestRef.current);
          requestRef.current = null;
        }
      },
      onstop: () => {
        setIsPlaying(false);
        setCurrentTime(0);
        setProgress(0);
        if (requestRef.current) {
          cancelAnimationFrame(requestRef.current);
          requestRef.current = null;
        }
      },
      onend: () => {
        setIsPlaying(false);
        setCurrentTime(0);
        setProgress(0);
        if (requestRef.current) {
          cancelAnimationFrame(requestRef.current);
          requestRef.current = null;
        }
      }
    });

    return () => {
      if (sound.current) {
        sound.current.stop();
        sound.current = null;
      }
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
        requestRef.current = null;
      }
    };
  }, [audioUrl]);

  const animate = () => {
    if (sound.current) {
      const time = sound.current.seek();
      setCurrentTime(time);
      setProgress((time / duration) * 100);
    }
    requestRef.current = requestAnimationFrame(animate);
  };

  const togglePlayPause = () => {
    if (!sound.current) return;
    
    if (isPlaying) {
      sound.current.pause();
    } else {
      sound.current.play();
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="neon-border bg-black bg-opacity-80 p-6 rounded">
      <h3 className="font-digital text-xl text-[#00FF41] mb-3">{title}</h3>
      <p className="font-matrix text-sm text-[#4AFF83] mb-4">
        {artist}'s uniquely crafted sounds that transcend digital boundaries.
      </p>
      
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
          <img src={imageUrl} alt={`${album} album art`} className="w-full h-full object-cover" />
        </div>
        <div>
          <p className="font-matrix text-[#4AFF83]">{artist}</p>
          <p className="font-matrix text-xs text-gray-400">ALBUM: {album}</p>
        </div>
      </div>
      
      <div className="relative h-[30px] bg-[rgba(0,77,64,0.5)]">
        <div 
          className="absolute top-0 left-0 h-full bg-[rgba(0,255,65,0.3)]" 
          style={{ width: `${progress}%` }}
        ></div>
        <div className="flex items-center justify-between p-1 relative z-10">
          <button 
            className="text-[#00FF41] hover:text-[#4AFF83] transition-colors"
            onClick={togglePlayPause}
          >
            {isPlaying ? (
              <Pause className="w-6 h-6" />
            ) : (
              <Play className="w-6 h-6" />
            )}
          </button>
          <div className="text-[#00FF41] text-xs font-matrix">
            {formatTime(currentTime)} / {formatTime(duration)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
