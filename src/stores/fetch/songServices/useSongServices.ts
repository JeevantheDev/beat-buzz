import { hookstate, useHookstate } from "@hookstate/core";
import { Youtube } from "../../../api/youtube";
import { PerformRequest } from "../../../api";

interface SongServiceState {
  isLoading: true | false;
  songInfo: SongInfo | null;
  songInfoError: string | null;
}

const initState: SongServiceState = hookstate({
  isLoading: false,
  songInfo: null,
  songInfoError: null,
});

export const useSongServices = () => {
  const state = useHookstate(initState);

  const fetchSongInfo = async (songId: string) => {
    state.isLoading.set(true);
    try {
      const request = Youtube.fetchSongInfo(songId);
      const resposeCallback = PerformRequest(request);
      const response = await resposeCallback();

      if (!response?.data || !response?.data?.success) {
        state.songInfoError.set(
          response?.data?.message || "Something went wrong!!!"
        );
      } else {
        const { data } = response.data as SongInfoResponse;
        state.songInfo.set(data);
      }
      state.isLoading.set(false);
    } catch (error) {
      state.isLoading.set(false);
      state.songInfoError.set(
        error instanceof Error ? error.message : "Something went wrong!!!"
      );
    }
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
    fetchSongInfo,
  };
};
