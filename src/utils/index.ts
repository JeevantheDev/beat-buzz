export const getPlaylistSongHeader = (playlist?: Playlists) => {
  const state: SongsState & PlaylistState = {
    songHeader: {
      title: playlist?.title || '',
      type: 'playlist',
      thumbnail: playlist?.thumbnail || '',
    },
    id: playlist?.id || null,
    title: playlist?.title,
    thumbnail: playlist?.thumbnail,
    songs: JSON.stringify(playlist?.songs),
  };

  return state;
};

export const getChannelSongHeader = (channel?: Channels) => {
  const state: SongsState = {
    songHeader: {
      title: channel?.videoChannel || '',
      type: 'channel',
      thumbnail: channel?.videoChannelThumbnail || '',
    },
  };

  return state;
};

export * from './constant';
export * from './audioUtils';
