interface Songs {
  id: string;
  user_id: number;
  audio: string;
  videoTitle: string;
  thumbnail: string;
  keywords: string[];
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
interface SongsBySearchResponse {
  data: {
    searchSongs: Songs[];
  };
}
