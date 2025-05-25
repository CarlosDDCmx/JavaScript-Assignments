import { useCallback, useEffect, useRef } from 'react';

// Import MP3 files directly
import flipSound from '../assets/audio/mobile-flip-close.mp3';
import matchSound from '../assets/audio/07-campana_1.mp3';
import winSound from '../assets/audio/fanfare.mp3';
import wrongSound from '../assets/audio/wrong-choice.mp3';

const useSound = () => {
  const audioContextRef = useRef(null);
  const soundsRef = useRef({});

  useEffect(() => {
    audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();

    // Load sounds using Webpack file loader
    const loadSound = async (url, name) => {
      try {
        const response = await fetch(url);
        const arrayBuffer = await response.arrayBuffer();
        const audioBuffer = await audioContextRef.current.decodeAudioData(arrayBuffer);
        soundsRef.current[name] = audioBuffer;
      } catch (error) {
        console.error(`Error loading sound ${name}:`, error);
      }
    };

    // Load imported MP3 files
    loadSound(flipSound, 'flip');
    loadSound(matchSound, 'match');
    loadSound(winSound, 'win');
    loadSound(wrongSound, 'wrong');

    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  const playSound = useCallback((name) => {
    if (!soundsRef.current[name] || !audioContextRef.current) return;
    
    try {
      const source = audioContextRef.current.createBufferSource();
      source.buffer = soundsRef.current[name];
      source.connect(audioContextRef.current.destination);
      source.start(0);
    } catch (error) {
      console.error(`Error playing sound ${name}:`, error);
    }
  }, []);

  return { playSound };
};

export default useSound;