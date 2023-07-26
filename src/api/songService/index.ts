import { getAPIUrl } from '../../utils/getAPIUrl';

const BASE_URL = `${getAPIUrl('song')}`;

export const SongService = {
  createSong: (songData: SongFormState): APIRequest => ({
    url: `${BASE_URL}/create/song`,
    method: 'POST',
    payload: { ...songData },
  }),
  updateSong: (songData: SongFormState): APIRequest => ({
    url: `${BASE_URL}/update/song`,
    method: 'PUT',
    payload: { ...songData },
  }),
  deleteSong: (songsIds: string[]): APIRequest => ({
    url: `${BASE_URL}/delete/song/${songsIds.join(',')}`,
    method: 'DELETE',
  }),
};
