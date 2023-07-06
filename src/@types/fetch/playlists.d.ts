interface PlaylistsByUserResponse {
  data: {
    allPlaylistsByUser: Playlists[];
  };
}

interface Playlists {
  id: number;
  title?: string;
  songs?: string[];
  thumbnail: string;
}
