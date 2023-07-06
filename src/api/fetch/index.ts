import { getAPIUrl } from "../../utils/getAPIUrl";

const BASE_URL = `${getAPIUrl("fetch")}`;

export const Fetch = {
  fetchChannels: (): APIRequest => ({
    url: BASE_URL,
    method: "POST",
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
    method: "POST",
    payload: {
      query: `query GetSongs {
        allSongs {
          id,
          audio,
          videoTitle,
          thumbnail
        }
      }`,
    },
  }),
  fetchSongsByUser: (): APIRequest => ({
    url: BASE_URL,
    method: "POST",
    payload: {
      query: `query GetSongByUser {
        getSongByUser {
          id,
          audio,
          videoTitle,
          thumbnail
        }
      }`,
    },
  }),
  fetchSongsByChannel: (channelId: string): APIRequest => ({
    url: BASE_URL,
    method: "POST",
    payload: {
      query: `query GetSongByChannel($channelId: Int!) {
        getSongByChannel(channelId: $channelId) {
          id,
          audio,
          videoTitle,
          thumbnail
        }
      }`,
      variables: { channelId },
    },
  }),
  fetchSongsByPlaylist: (playlistId: number): APIRequest => ({
    url: BASE_URL,
    method: "POST",
    payload: {
      query: `query GetSongByPlaylist($playlistId: Int!) {
        getSongByPlaylist(playlistId: $playlistId) {
          id,
          audio,
          videoTitle,
          thumbnail
        }
      }`,
      variables: { playlistId },
    },
  }),
  fetchPlaylistsByUser: (): APIRequest => ({
    url: BASE_URL,
    method: "POST",
    payload: {
      query: `query AllPlaylistsByUser {
        allPlaylistsByUser {
          title,
          songs,
          thumbnail
        }
      }`,
    },
  }),
};
