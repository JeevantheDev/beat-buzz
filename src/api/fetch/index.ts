import { getAPIUrl } from '../../utils/getAPIUrl';

const BASE_URL = `${getAPIUrl('fetch')}`;

export const Fetch = {
  fetchChannels: (): APIRequest => ({
    url: BASE_URL,
    method: 'POST',
    payload: {
      query: `query AllChannels {
        allChannels {
          videoChannel,
          videoChannelId,
          videoChannelThumbnail
        }
      }`,
    },
  }),
  fetchSongs: (): APIRequest => ({
    url: BASE_URL,
    method: 'POST',
    payload: {
      query: `query GetSongs {
        allSongs {
          id,
          user_id,
          keywords,
          audio,
          videoTitle,
          thumbnail
        }
      }`,
    },
  }),
  fetchSongsByUser: (): APIRequest => ({
    url: BASE_URL,
    method: 'POST',
    payload: {
      query: `query GetSongByUser {
        getSongByUser {
          id,
          user_id,
          keywords,
          audio,
          videoTitle,
          thumbnail
        }
      }`,
    },
  }),
  fetchSongsByChannel: (channelId: string): APIRequest => ({
    url: BASE_URL,
    method: 'POST',
    payload: {
      query: `query GetSongByChannel($channelId: String!) {
        getSongByChannel(channelId: $channelId) {
          id,
          user_id,
          audio,
          videoTitle,
          keywords,
          thumbnail
        }
      }`,
      variables: { channelId },
    },
  }),
  fetchSongsByPlaylist: (playlistId: unknown): APIRequest => ({
    url: BASE_URL,
    method: 'POST',
    payload: {
      query: `query GetSongByPlaylist($playlistId: ID!) {
        getSongByPlaylist(playlistId: $playlistId) {
          id,
          user_id,
          audio,
          videoTitle,
          keywords,
          thumbnail
        }
      }`,
      variables: { playlistId },
    },
  }),
  fetchPlaylistsByUser: (): APIRequest => ({
    url: BASE_URL,
    method: 'POST',
    payload: {
      query: `query AllPlaylistsByUser {
        allPlaylistsByUser {
          id,
          title,
          songs,
          thumbnail
        }
      }`,
    },
  }),
};
