interface SongsState {
  songHeader?: {
    id?: string;
    type?: 'channel' | 'playlist';
    title: string;
    thumbnail: string;
  };
}

interface PlaylistState {
  type?: 'add' | 'edit';
  id: number | null;
  title?: string;
  thumbnail?: string;
  songs?: string[] | string;
}

interface PlayerSliderInfo {
  currentTime: number;
  duration: number;
  animationPercentage: number;
  volume: number;
}

interface CurrentSong {
  thumbnail: string;
  title: string;
  id: string;
  playing?: boolean;
}
