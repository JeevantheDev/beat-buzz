import { hookstate, useHookstate } from "@hookstate/core";
import { Fetch, PerformRequest } from "../../../api";

const tempSongs = Array.from({ length: 16 }).map(() => ({
  user_id: 1,
  id: 125,
  audio: "audio3.com",
  videoTitle: "Lilabati odia song",
  thumbnail:
    "https://i.ytimg.com/vi/jYDhitRYGU0/hqdefault.jpg?sqp=-oaymwEXCOADEI4CSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLC2paCmtXemadCx-zEbaOtdIGP5IA",
}));

interface SongsState {
  isSongLoading: true | false;
  songs: Songs[];
  songsByUser: Songs[];
  songsById: Songs[];
  song: Songs | null;
  songError: string | null;
}

const initState: SongsState = hookstate({
  isSongLoading: false,
  songs: [],
  // songs: tempSongs,
  // songsById: tempSongs,
  songsById: [],
  // songsByUser: tempSongs,
  songsByUser: [],
  song: null,
  songError: null,
});

export const useFetchSongs = () => {
  const state = useHookstate(initState);

  const fetchSongs = async () => {
    state.isSongLoading.set(true);
    try {
      const request = Fetch.fetchSongs();
      const resposeCallback = PerformRequest(request);
      const response = await resposeCallback();

      if (!response.data || response?.data?.errors) {
        const error =
          response?.data?.errors[0]?.message || "Something went wrong!!!";
        state.songError.set(error);
      } else {
        const { data } = response.data as SongsResponse;

        state.songs.set(data?.allSongs || []);
      }
      state.isSongLoading.set(false);
    } catch (error) {
      state.isSongLoading.set(false);
      state.songError.set(
        error instanceof Error ? error.message : "Something went wrong!!!"
      );
    }
  };

  const fetchSongsByUser = async () => {
    state.isSongLoading.set(true);
    try {
      const request = Fetch.fetchSongsByUser();
      const resposeCallback = PerformRequest(request);
      const response = await resposeCallback();

      if (!response.data || response?.data?.errors) {
        const error =
          response?.data?.errors[0]?.message || "Something went wrong!!!";
        state.songError.set(error);
      } else {
        const { data } = response.data as SongsByUserResponse;

        state.songsByUser.set(data?.getSongByUser || []);
      }
      state.isSongLoading.set(false);
    } catch (error) {
      state.isSongLoading.set(false);
      state.songError.set(
        error instanceof Error ? error.message : "Something went wrong!!!"
      );
    }
  };

  const fetchSongsByID = async (
    id: string | number,
    idFor: "channel" | "playlist" = "channel"
  ) => {
    state.isSongLoading.set(true);
    try {
      const request =
        idFor === "channel" && typeof id === "string"
          ? Fetch.fetchSongsByChannel(id)
          : Fetch.fetchSongsByPlaylist(Number(id));
      const resposeCallback = PerformRequest(request);
      const response = await resposeCallback();

      if (!response.data || response?.data?.errors) {
        const error =
          response?.data?.errors[0]?.message || "Something went wrong!!!";
        state.songError.set(error);
      } else {
        if (idFor === "channel") {
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
        error instanceof Error ? error.message : "Something went wrong!!!"
      );
    }
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
    get getSongsByID() {
      return state.songsById.get();
    },

    get getSong() {
      return state.song.get();
    },

    get getSongError() {
      return state.songError.get();
    },
  };

  return {
    ...getter,
    fetchSongs,
    fetchSongsByUser,
    fetchSongsByID,
  };
};
