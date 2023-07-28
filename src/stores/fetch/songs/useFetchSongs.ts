import { State, hookstate, useHookstate } from '@hookstate/core';
import { devtools } from '@hookstate/devtools';
import { Fetch, PerformRequest, SongService } from '../../../api';
import { AxiosError } from 'axios';

type SongServiceDataType = Pick<
  SongDataResponse,
  {
    [K in keyof SongDataResponse &
      keyof Songs]: SongDataResponse[K] extends Songs[K]
      ? Songs[K] extends SongDataResponse[K]
        ? K
        : never
      : never;
  }[keyof SongDataResponse & keyof Songs]
>;

interface SongsState {
  isSongLoading: boolean;
  songs: Songs[];
  songsByUser: Songs[];
  songsById: Songs[];
  songsByPlayer: Songs[];
  songsBySearch: Songs[];
  song: Songs | null;
  currentSong: CurrentSong | null;
  songError: string | null;
}

const initState = hookstate(
  {
    isSongLoading: false,
    songs: [],
    songsById: [],
    songsByUser: [],
    songsByPlayer: [],
    songsBySearch: [],
    song: null,
    currentSong: null,
    songError: null,
  },
  devtools({ key: 'my-state-label' })
) as State<SongsState, {}>;

export const useFetchSongs = () => {
  const state = useHookstate(initState);

  const songFormAction = async (
    data: SongFormState,
    type: 'add' | 'edit' = 'add',
    historyCallback?: () => void
  ) => {
    state.isSongLoading.set(true);
    state.songError.set('');
    try {
      const request =
        type === 'add'
          ? SongService.createSong(data)
          : SongService.updateSong(data);

      const responseCallback = PerformRequest(request);
      const response = await responseCallback();
      if (!response?.data || !response?.data?.success) {
        state.songError.set(
          response?.data?.message || 'Something went wrong!!!'
        );
      } else {
        const { data } = response.data as SongServiceResponse;
        const finalData: SongServiceDataType = data;

        let [...prevSongs] = state.songsByUser.get({ noproxy: true });
        const foundIdx = prevSongs.findIndex(
          (song) => song.id === finalData.id
        );
        if (foundIdx !== -1) {
          prevSongs[foundIdx] = finalData;
        } else {
          prevSongs.push(finalData);
        }

        state.songsByUser.set(() => prevSongs);
        historyCallback && historyCallback();
      }
      state.isSongLoading.set(false);
    } catch (error) {
      state.isSongLoading.set(false);
      state.songError.set(
        error instanceof AxiosError
          ? error?.response?.data?.message
          : 'Something went wrong!!!'
      );
    }
  };

  const deleteSongs = async (songIds: string[]) => {
    state.isSongLoading.set(true);
    try {
      const request = SongService.deleteSong(songIds);
      const responseCallback = PerformRequest(request);
      const response = await responseCallback();

      if (!response?.data || !response?.data?.success) {
        state.songError.set(
          response?.data?.message || 'Something went wrong!!!'
        );
      } else {
        const { data } = response?.data as SongDeleteResponse;

        if (data === 1) {
          let [...prevSongs] = state.songsByUser.get({ noproxy: true });

          prevSongs = prevSongs.filter((song) => !songIds.includes(song.id));
          state.songsByUser.set(() => prevSongs);
        }
      }
      state.isSongLoading.set(false);
    } catch (error) {
      state.isSongLoading.set(false);
      state.songError.set(
        error instanceof AxiosError
          ? error?.response?.data?.message
          : 'Something went wrong!!!'
      );
    }
  };

  const fetchSongs = async () => {
    state.isSongLoading.set(true);
    state.songs.set([]);
    try {
      const request = Fetch.fetchSongs();
      const responseCallback = PerformRequest(request);
      const response = await responseCallback();

      if (!response.data || response?.data?.errors) {
        const error =
          response?.data?.errors[0]?.message || 'Something went wrong!!!';
        state.songError.set(error);
      } else {
        const { data } = response.data as SongsResponse;

        state.songs.set(data?.allSongs || []);
      }
      state.isSongLoading.set(false);
    } catch (error) {
      state.isSongLoading.set(false);
      state.songError.set(
        error instanceof Error ? error.message : 'Something went wrong!!!'
      );
    }
  };

  const fetchSongsByUser = async () => {
    state.isSongLoading.set(true);
    state.songsByUser.set([]);
    try {
      const request = Fetch.fetchSongsByUser();
      const responseCallback = PerformRequest(request);
      const response = await responseCallback();

      if (!response.data || response?.data?.errors) {
        const error =
          response?.data?.errors[0]?.message || 'Something went wrong!!!';
        state.songError.set(error);
      } else {
        const { data } = response.data as SongsByUserResponse;

        state.songsByUser.set(data?.getSongByUser || []);
      }
      state.isSongLoading.set(false);
    } catch (error) {
      state.isSongLoading.set(false);
      state.songError.set(
        error instanceof Error ? error.message : 'Something went wrong!!!'
      );
    }
  };
  const fetchSongsBySearch = async (searchQuery: string) => {
    state.isSongLoading.set(true);
    state.songsBySearch.set([]);
    try {
      const request = Fetch.fetchSongsBySearch(searchQuery);
      const responseCallback = PerformRequest(request);
      const response = await responseCallback();

      if (!response.data || response?.data?.errors) {
        const error =
          response?.data?.errors[0]?.message || 'Something went wrong!!!';
        state.songError.set(error);
      } else {
        const { data } = response.data as SongsBySearchResponse;

        state.songsBySearch.set(data?.searchSongs || []);
      }
      state.isSongLoading.set(false);
    } catch (error) {
      state.isSongLoading.set(false);
      state.songError.set(
        error instanceof Error ? error.message : 'Something went wrong!!!'
      );
    }
  };

  const fetchSongsByID = async (
    id: string | number,
    idFor: 'channel' | 'playlist' = 'channel'
  ) => {
    state.isSongLoading.set(true);
    state.songsById.set([]);
    try {
      const request =
        idFor === 'channel' && typeof id === 'string'
          ? Fetch.fetchSongsByChannel(id)
          : Fetch.fetchSongsByPlaylist(id);
      const responseCallback = PerformRequest(request);
      const response = await responseCallback();

      if (!response.data || response?.data?.errors) {
        const error =
          response?.data?.errors[0]?.message || 'Something went wrong!!!';
        state.songError.set(error);
      } else {
        if (idFor === 'channel') {
          const { data } = response.data as SongsByChannelResponse;
          state.songsById.set(data?.getSongByChannel || []);
        } else {
          const { data } = response.data as SongsByPlaylistResponse;
          state.songsById.set(data?.getSongByPlaylist || []);
        }
      }
      state.isSongLoading.set(false);
    } catch (error) {
      state.isSongLoading.set(false);
      state.songError.set(
        error instanceof Error ? error.message : 'Something went wrong!!!'
      );
    }
  };

  const removeSongsById = (setCallback?: (songs: Songs[]) => void) => {
    setCallback &&
      setCallback(state.songsById.get({ noproxy: true }) as Songs[]);
  };

  const setSongsById = (songs: Songs[]) => {
    state.songsById.set(songs);
  };

  const setSongsByPlayer = (songs: Songs[]) => {
    state.songsByPlayer.set(songs);
  };
  const setSongsBySearch = (songs: Songs[]) => {
    state.songsBySearch.set(songs);
  };

  const setCurrentSong = (song: CurrentSong) => {
    state.currentSong.set(song);
  };

  const getter = {
    get getSongLoading() {
      return state.isSongLoading.get();
    },

    get getSongs() {
      return state.songs.get();
    },
    get getSongsByUser() {
      return state.songsByUser.get();
    },
    get getSongsBySearch() {
      return state.songsBySearch.get();
    },
    get getSongsByID() {
      return state.songsById.get();
    },

    get getSongsByPlayer() {
      return state.songsByPlayer.get();
    },

    get getSong() {
      return state.song.get();
    },

    get getCurrentSong() {
      return state.currentSong.get({ noproxy: true });
    },

    get getSongError() {
      return state.songError.get();
    },
  };

  const setter = {
    setSongsById,
    setSongsByPlayer,
    setCurrentSong,
    setSongsBySearch,
  };

  return {
    ...getter,
    ...setter,
    songFormAction,
    deleteSongs,
    fetchSongs,
    fetchSongsByUser,
    fetchSongsBySearch,
    fetchSongsByID,
    removeSongsById,
  };
};
