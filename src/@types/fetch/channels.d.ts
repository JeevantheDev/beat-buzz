interface FetchChannelResponse {
  data: {
    allChannels: Channels[];
  };
}

interface Channels {
  videoChannel: string;
  videoChannelId: string;
  videoChannelThumbnail: string;
}
