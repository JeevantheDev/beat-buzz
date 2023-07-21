import { getAPIUrl } from '../../utils/getAPIUrl';

const BASE_URL = `${getAPIUrl('song')}`;

export const SongService = {
  createSong: (songData: SongFormState): APIRequest => ({
    url: `${BASE_URL}/api/v1/beatbuzz/create/song`,
    method: 'POST',
    payload: { ...songData },
  }),
  updateSong: (songData: SongFormState): APIRequest => ({
    url: `${BASE_URL}/api/v1/beatbuzz/update/song`,
    method: 'PUT',
    payload: { ...songData },
  }),
  deleteSong: (songsIds: string[]): APIRequest => ({
    url: `${BASE_URL}/api/v1/beatbuzz/delete/song/${songsIds.join(',')}`,
    method: 'DELETE',
  }),
};
