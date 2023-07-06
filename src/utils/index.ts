export const getPlaylistSongHeader = (playlist?: Playlists) => {
  const state: SongsState = {
    songHeader: {
      title: playlist?.title || "",
      type: "playlist",
      thumbnail: playlist?.thumbnail || "",
    },
  };

  return state;
};

export const getChannelSongHeader = (channel?: Channels) => {
  const state: SongsState = {
    songHeader: {
      title: channel?.videoChannel || "",
      type: "channel",
      thumbnail: channel?.videoChannelThumbnail || "",
    },
  };

  return state;
};
