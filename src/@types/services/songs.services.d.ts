interface SongFormState {
  id: string;
  audio: string;
  keywords: string[];
  category: string;
  videoTitle: string;
  videoURL: string;
  thumbnail: string;
  videoChannelId: string;
  videoChannel: string;
  videoChannelThumbnail: string;
}

interface SongDataResponse extends SongFormState {
  user_id: number;
  createdAt: Date;
  updatedAt: Date;
}

interface SongServiceResponse {
  success: boolean;
  data: SongDataResponse;
  message: string | null;
}

interface SongDeleteResponse {
  success: boolean;
  data: 0 | 1 | null;
  message: string;
}
