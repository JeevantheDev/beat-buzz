import { hookstate, useHookstate } from '@hookstate/core';
import { Fetch, PerformRequest, PlaylistService } from '../../../api';
import { AxiosError } from 'axios';

type PlaylistServiceDataType = Pick<
  PlaylistFormDataResponse,
  {
    [K in keyof PlaylistFormDataResponse &
      keyof Playlists]: PlaylistFormDataResponse[K] extends Playlists[K]
      ? Playlists[K] extends PlaylistFormDataResponse[K]
        ? K
        : never
      : never;
  }[keyof PlaylistFormDataResponse & keyof Playlists]
>;

interface PlaylistState {
  isPlaylistLoading: true | false;
  playlists: Playlists[];
  playlist: Playlists | null;
  playlistError: string | null;
}

const initState: PlaylistState = hookstate({
  isPlaylistLoading: false,
  playlists: [],
  playlist: null,
  playlistError: null,
});

export const useFetchPlaylists = () => {
  const state = useHookstate(initState);

  const playlistFormAction = async (
    data: PlaylistFormState,
    type: 'add' | 'edit' = 'add',
    historyCallback?: Function
  ) => {
    state.isPlaylistLoading.set(true);
    state.playlistError.set('');

    try {
      const request =
        type === 'add'
          ? PlaylistService.createPlaylist(data)
          : PlaylistService.updatePlaylist(data);

      const responseCallback = PerformRequest(request);
      const response = await responseCallback();

      if (!response?.data || !response?.data?.success) {
        state.playlistError.set(
          response?.data?.message || 'Something went wrong!!!'
        );
      } else {
        const { data } = response.data as PlaylistFormResponse;
        const finalData: PlaylistServiceDataType = data;

        let [...prevPlaylists] = state.playlists.get({ noproxy: true });
        const foundIdx = prevPlaylists.findIndex(
          (playlist) => playlist.id === finalData.id
        );

        if (foundIdx !== -1) {
          prevPlaylists[foundIdx] = finalData;
        } else {
          prevPlaylists.push(finalData);
        }

        state.playlists.set(() => prevPlaylists);
        historyCallback && historyCallback();
      }
      state.isPlaylistLoading.set(false);
    } catch (error) {
      state.isPlaylistLoading.set(false);
      state.playlistError.set(
        error instanceof AxiosError
          ? error?.response?.data?.message
          : 'Something went wrong!!!'
      );
    }
  };

  const deletePlaylists = async (playlistIds: number[]) => {
    state.isPlaylistLoading.set(true);
    try {
      const request = PlaylistService.deletePlaylist(playlistIds);
      const responseCallback = PerformRequest(request);
      const response = await responseCallback();

      if (!response?.data || !response?.data?.success) {
        state.playlistError.set(
          response?.data?.message || 'Something went wrong!!!'
        );
      } else {
        const { data } = response?.data as PlaylistDeleteResponse;

        if (data === 1) {
          let [...prevPlaylists] = state.playlists.get({ noproxy: true });

          prevPlaylists = prevPlaylists.filter(
            (playlist) => !playlistIds.includes(playlist.id)
          );
          state.playlists.set(() => prevPlaylists);
        }
      }
      state.isPlaylistLoading.set(false);
    } catch (error) {
      state.isPlaylistLoading.set(false);
      state.playlistError.set(
        error instanceof AxiosError
          ? error?.response?.data?.message
          : 'Something went wrong!!!'
      );
    }
  };

  const fetchPlaylistsByUser = async () => {
    state.isPlaylistLoading.set(true);
    state.playlists.set([]);
    try {
      const request = Fetch.fetchPlaylistsByUser();
      const resposeCallback = PerformRequest(request);
      const response = await resposeCallback();

      if (!response.data || response?.data?.errors) {
        const error =
          response?.data?.errors[0]?.message || 'Something went wrong!!!';
        state.playlistError.set(error);
      } else {
        const { data } = response.data as PlaylistsByUserResponse;

        state.playlists.set(data?.allPlaylistsByUser || []);
      }
      state.isPlaylistLoading.set(false);
    } catch (error) {
      state.isPlaylistLoading.set(false);
      state.playlistError.set(
        error instanceof Error ? error.message : 'Something went wrong!!!'
      );
    }
  };

  const getter = {
    get getPlaylistLoading() {
      return state.isPlaylistLoading.get();
    },

    get getPlaylists() {
      return state.playlists.get();
    },

    get getPlaylist() {
      return state.playlist.get();
    },

    get getPlaylistError() {
      return state.playlistError.get();
    },
  };

  return {
    ...getter,
    fetchPlaylistsByUser,
    playlistFormAction,
    deletePlaylists,
  };
};
