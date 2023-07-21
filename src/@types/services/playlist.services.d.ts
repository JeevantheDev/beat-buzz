interface PlaylistFormState {
  id?: number | null;
  title: string;
  thumbnail: string;
  songs: string[];
}

interface PlaylistFormDataResponse {
  id: number;
  user_id: number;
  title: string;
  thumbnail: string;
  songs: string[];
  createdAt: Date;
  updatedAt: Date;
}

interface PlaylistFormResponse {
  success: boolean;
  data: PlaylistFormDataResponse;
  message: string | null;
}

interface PlaylistDeleteResponse {
  success: boolean;
  data: 0 | 1 | null;
  message: string;
}
