interface SongInfoResponse {
  success: boolean;
  data: SongInfo;
  message: string;
}

interface SongInfo {
  audio: {
    url: string;
  };
  videoTitle: string;
  videoURL: string;
  keywords: string[];
  thumbnail: {
    url: string;
    width: number;
    height: number;
  };
  category: string;
  videoChannelId: string;
  videoChannel: string;
  videoChannelThumbnail: {
    url: string;
    width: number;
    height: number;
  };
}
