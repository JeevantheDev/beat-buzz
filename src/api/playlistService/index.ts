import { getAPIUrl } from '../../utils/getAPIUrl';

const BASE_URL = `${getAPIUrl('song')}`;

export const PlaylistService = {
  createPlaylist: (playlist: PlaylistFormState): APIRequest => ({
    url: `${BASE_URL}/api/v1/beatbuzz/create/playlist`,
    method: 'POST',
    payload: { ...playlist },
  }),
  updatePlaylist: (playlist: PlaylistFormState): APIRequest => ({
    url: `${BASE_URL}/api/v1/beatbuzz/update/playlist`,
    method: 'PUT',
    payload: { ...playlist },
  }),
  deletePlaylist: (playlistIds: number[]): APIRequest => ({
    url: `${BASE_URL}/api/v1/beatbuzz/delete/playlist/${playlistIds.join(',')}`,
    method: 'DELETE',
  }),
};
