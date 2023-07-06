import { hookstate, useHookstate } from "@hookstate/core";
import { Fetch, PerformRequest } from "../../../api";

interface PlaylistState {
  isPlaylistLoading: true | false;
  playlists: Playlists[];
  playlist: Playlists | null;
  playlistError: string | null;
}

const initState: PlaylistState = hookstate({
  isPlaylistLoading: false,
  playlists: [],
  // playlists: Array.from({ length: 8 }).map((_, idx) => ({
  //   id: idx,
  //   title: `Odia New ${idx + 1}`,
  //   songs: [125],
  //   thumbnail:
  //     "https://i.ytimg.com/vi/jYDhitRYGU0/hqdefault.jpg?sqp=-oaymwEXCOADEI4CSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLC2paCmtXemadCx-zEbaOtdIGP5IA",
  // })),
  playlist: null,
  playlistError: null,
});

export const useFetchPlaylists = () => {
  const state = useHookstate(initState);

  const fetchPlaylistsByUser = async () => {
    state.isPlaylistLoading.set(true);
    try {
      const request = Fetch.fetchPlaylistsByUser();
      const resposeCallback = PerformRequest(request);
      const response = await resposeCallback();

      if (!response.data || response?.data?.errors) {
        const error =
          response?.data?.errors[0]?.message || "Something went wrong!!!";
        state.playlistError.set(error);
      } else {
        const { data } = response.data as PlaylistsByUserResponse;

        state.playlists.set(data?.allPlaylistsByUser || []);
      }
      state.isPlaylistLoading.set(false);
    } catch (error) {
      state.isPlaylistLoading.set(false);
      state.playlistError.set(
        error instanceof Error ? error.message : "Something went wrong!!!"
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
  };
};
