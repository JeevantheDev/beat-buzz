import { useState, useEffect } from 'react';

export const useAudio = (url: string) => {
  const [audio, setAudio] = useState<HTMLAudioElement | null>(new Audio(url));
  const [playing, setPlaying] = useState(false);

  const toggle = () => setPlaying(!playing);

  useEffect(() => {
    if (url) {
      setAudio(new Audio(url));
    }
  }, [url]);

  useEffect(() => {
    playing ? audio?.play() : audio?.pause();
  }, [playing]);

  useEffect(() => {
    audio?.addEventListener('ended', () => setPlaying(false));
    return () => {
      console.log('here::');

      audio?.pause();
      audio?.removeEventListener('ended', () => setPlaying(false));
      setAudio(null);
    };
  }, []);

  return { playing, toggle };
};
