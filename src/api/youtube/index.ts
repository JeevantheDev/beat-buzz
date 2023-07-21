import { getAPIUrl } from '../../utils/getAPIUrl';

const BASE_URL = `${getAPIUrl('youtube')}`;

export const Youtube = {
  fetchSongInfo: (videoId: string): APIRequest => ({
    url: `${BASE_URL}/getVideoInfo/${videoId}`,
    method: 'GET',
  }),
};
