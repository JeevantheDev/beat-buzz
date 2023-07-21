import { hookstate, useHookstate } from '@hookstate/core';
import { Youtube } from '../../../api/youtube';
import { PerformRequest } from '../../../api';
import { AxiosError } from 'axios';

interface YoutubeServiceState {
  isLoading: true | false;
  songInfo: SongInfo | null;
  songInfoError: string | null;
}

const initState: YoutubeServiceState = hookstate({
  isLoading: false,
  songInfo: null,
  songInfoError: null,
});

export const useYoutubeServices = () => {
  const state = useHookstate(initState);

  const fetchSongInfo = async (songId: string) => {
    state.isLoading.set(true);
    state.songInfoError.set('');
    try {
      const request = Youtube.fetchSongInfo(songId);
      const resposeCallback = PerformRequest(request);
      const response = await resposeCallback();

      if (!response?.data || !response?.data?.success) {
        state.songInfoError.set(
          response?.data?.message || 'Something went wrong!!!'
        );
      } else {
        const { data } = response.data as SongInfoResponse;
        state.songInfo.set(data);
      }
      state.isLoading.set(false);
    } catch (error) {
      state.isLoading.set(false);
      state.songInfoError.set(
        error instanceof AxiosError
          ? error?.response?.data?.message
          : 'Something went wrong!!!'
      );
    }
  };

  const setter = {
    setSongInfo(value: SongInfo | null) {
      state.songInfo.set(value);
    },
  };

  const getter = {
    get getIsLoading() {
      return state.isLoading.get();
    },
    get getSongInfo() {
      return state.songInfo.get();
    },
    get getError() {
      return state.songInfoError.get();
    },
  };

  return {
    ...getter,
    ...setter,
    fetchSongInfo,
  };
};
