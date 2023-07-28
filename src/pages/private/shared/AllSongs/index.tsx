import React from 'react';
import { Song, SongLoading } from '../../../../components';
import { ImmutableArray } from '@hookstate/core';

import './allsongs.css';
import { IonButton, IonIcon } from '@ionic/react';
import { addSharp } from 'ionicons/icons';
import { useAuth } from '../../../../stores';

interface IProps extends SongProps {
  loading?: boolean;
  songs: ImmutableArray<Songs>;
  showAddsong?: true | false;
  currentSong?: CurrentSong | null;
  onClickAdd?: () => void;
  onClickPlay?: (...args: SongsState[]) => void;
  userModalAction?: boolean;
}

export const AllSongs: React.FC<IProps> = ({
  loading,
  songs,
  showAddsong = false,
  showRightBtn = true,
  currentSong = null,
  onClickAdd,
  onClickPlay,
  onClickDelete,
  onAddToPlaylist,
  playlist = {},
  playlists = [],
  userModalAction = true,
  playlistAction = 'add',
}) => {
  const authState = useAuth();

  const handleClickAdd = (event: React.SyntheticEvent) => {
    event.stopPropagation();
    onClickAdd && onClickAdd();
  };

  return (
    <div className="all-songs-container">
      <div className="all-songs-container-item">
        {showAddsong && (
          <div className="add-song" onClick={handleClickAdd}>
            <IonButton
              onClick={handleClickAdd}
              className="add-song-btn"
              size="small"
              color="primary"
            >
              <IonIcon size="large" slot="icon-only" icon={addSharp} />
            </IonButton>
            <div className="add-song-text">
              <label className="ellipse">Add a song</label>
            </div>
          </div>
        )}
      </div>
      {(loading ? Array.from(new Array(6)) : songs).map((song, idx) => (
        <React.Fragment key={idx}>
          <div className="all-songs-container-item">
            {song ? (
              <Song
                validUser={
                  userModalAction
                    ? authState?.getCurrUserDetails?.user_id === song?.user_id
                    : false
                }
                onClickDelete={onClickDelete}
                showRightBtn={showRightBtn}
                playlist={playlist}
                playlists={playlists}
                onAddToPlaylist={onAddToPlaylist}
                playlistAction={playlistAction}
                onClickPlay={onClickPlay}
                isPlaying={currentSong?.id === song.id && currentSong?.playing}
                {...song}
              />
            ) : (
              <SongLoading />
            )}
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};
