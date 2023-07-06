interface SongsState {
  songHeader?: {
    type?: "channel" | "playlist";
    title: string;
    thumbnail: string;
  };
}
