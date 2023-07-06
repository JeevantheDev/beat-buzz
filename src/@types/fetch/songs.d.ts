interface Songs {
  id: string;
  audio: string;
  videoTitle: string;
  thumbnail: string;
}

interface SongsResponse {
  data: {
    allSongs: Songs[];
  };
}

interface SongsByChannelResponse {
  data: {
    getSongByChannel: Songs[];
  };
}

interface SongsByPlaylistResponse {
  data: {
    getSongByPlaylist: Songs[];
  };
}

interface SongsByUserResponse {
  data: {
    getSongByUser: Songs[];
  };
}
