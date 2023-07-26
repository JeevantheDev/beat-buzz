import { getAPIUrl } from '../../utils/getAPIUrl';

const BASE_URL = `${getAPIUrl('song')}`;

export const PlaylistService = {
  createPlaylist: (playlist: PlaylistFormState): APIRequest => ({
    url: `${BASE_URL}/create/playlist`,
    method: 'POST',
    payload: { ...playlist },
  }),
  updatePlaylist: (playlist: PlaylistFormState): APIRequest => ({
    url: `${BASE_URL}/update/playlist`,
    method: 'PUT',
    payload: { ...playlist },
  }),
  deletePlaylist: (playlistIds: number[]): APIRequest => ({
    url: `${BASE_URL}/delete/playlist/${playlistIds.join(',')}`,
    method: 'DELETE',
  }),
};
