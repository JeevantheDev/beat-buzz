import React from 'react';
import { Playlist, PlaylistLoading, Slider } from '../../../../components';
import { ImmutableArray } from '@hookstate/core';
import { useHistory } from 'react-router';
import { getPlaylistSongHeader } from '../../../../utils';

interface IProps {
  loading?: boolean;
  playlists: ImmutableArray<Playlists>;
}

export const MixedPlaylists: React.FC<IProps> = ({ loading, playlists }) => {
  const history = useHistory();

  return (
    <React.Fragment>
      <Slider>
        {(loading ? Array.from(new Array(3)) : playlists).map(
          (playlist, idx) => (
            <React.Fragment key={idx}>
              {playlist ? (
                <Playlist
                  minWidth={'150px'}
                  height={'auto'}
                  onClickPlaylist={(playlistId) => {
                    history.push({
                      pathname: `/songs/${playlistId}`,
                      state: getPlaylistSongHeader(playlist),
                    });
                  }}
                  {...playlist}
                  showRightBtn={false}
                />
              ) : (
                <PlaylistLoading />
              )}
            </React.Fragment>
          )
        )}
      </Slider>
    </React.Fragment>
  );
};
