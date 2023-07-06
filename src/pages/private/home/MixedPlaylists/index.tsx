import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Playlist, PlaylistLoading } from "../../../../components";
import { ImmutableArray } from "@hookstate/core";
import { useHistory } from "react-router";
import { getPlaylistSongHeader } from "../../../../utils";

interface IProps {
  loading?: boolean;
  playlists: ImmutableArray<Playlists>;
}

export const MixedPlaylists: React.FC<IProps> = ({ loading, playlists }) => {
  const history = useHistory();

  return (
    <React.Fragment>
      <Swiper spaceBetween={180} slidesPerView={2.7} freeMode loop>
        {(loading ? Array.from(new Array(3)) : playlists).map(
          (playlist, idx) => (
            <SwiperSlide key={idx}>
              {playlist ? (
                <Playlist
                  onClickPlaylist={(playlistId) => {
                    history.push({
                      pathname: `/songs/${playlistId}`,
                      state: getPlaylistSongHeader(playlist),
                    });
                  }}
                  {...playlist}
                />
              ) : (
                <PlaylistLoading />
              )}
            </SwiperSlide>
          )
        )}
      </Swiper>
    </React.Fragment>
  );
};
