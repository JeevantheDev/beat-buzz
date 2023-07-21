import { IonButton, IonIcon, IonThumbnail } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { ellipsisVertical, pauseCircle, playCircle } from 'ionicons/icons';
import { ItemModal, PlaylistItemModal } from '../shared';
import { DEFAULT_IMAGE } from '../../utils';
import { useFetchSongs } from '../../stores';

import './song.css';

interface IProps extends Songs, SongProps {
  validUser?: boolean;
  onClickPlay?: (...args: SongsState[]) => void;
}

export const Song: React.FC<IProps> = ({
  id,
  validUser,
  thumbnail,
  keywords,
  videoTitle,
  onClickDelete,
  onAddToPlaylist,
  onClickPlay,
  isPlaying = false,
  showRightBtn = true,
  playlist,
  playlists = [],
  playlistAction = 'add',
}) => {
  const { removeSongsById, setSongsById } = useFetchSongs();
  const [showSongModal, setShowSongModal] = useState(false);
  const [showPlaylistModal, setShowPlaylistModal] = useState(false);
  const [deletedSongId, setDeletedSongId] = useState('');

  const [playlistFormAction, setPlaylistFormAction] = useState(false);

  const [addPlaylistState, setAddPlaylistState] = useState<PlaylistFormState>({
    id: playlist?.id || null,
    title: playlist?.title || '',
    thumbnail: playlist?.thumbnail || DEFAULT_IMAGE,
    songs:
      playlist?.songs && typeof playlist?.songs === 'string'
        ? JSON.parse(playlist?.songs || '')
        : [],
  });

  const removeSongFromPlaylist = () => {
    removeSongsById((songs: Songs[]) => {
      let [...prevSongs] = songs;

      prevSongs = prevSongs.filter((song) => song.id !== deletedSongId);

      setSongsById(prevSongs);
    });
    setDeletedSongId('');
  };

  useEffect(() => {
    if (playlistFormAction) {
      onAddToPlaylist &&
        onAddToPlaylist(addPlaylistState, 'edit', () => {
          toggleModal(false, 'playlist');
          setPlaylistFormAction(false);
          !showPlaylistModal && removeSongFromPlaylist();
        });
    }

    return () => {
      setPlaylistFormAction(false);
      setDeletedSongId('');
    };
  }, [playlistFormAction]);

  const toggleModal = (
    flag: boolean,
    toggleFor: 'song' | 'playlist' = 'song'
  ) => {
    toggleFor === 'song' ? setShowSongModal(flag) : setShowPlaylistModal(flag);
  };

  const onClickSong = (
    songId: string | number,
    redirectCallback: Function = () => {},
    type?: string
  ) => {
    if (type === 'delete') {
      redirectCallback(() => onClickDelete && onClickDelete([songId]));
    } else if (type === 'edit') {
      redirectCallback();
    } else if (type === 'add-playlist') {
      redirectCallback((songThumbnail: string) => {
        setAddPlaylistState((prev) => ({
          ...prev,
          songs: [songId.toString()],
          thumbnail: songThumbnail || '',
        }));
        toggleModal(true, 'playlist');
      });
    } else if (type === 'remove-playlist') {
      redirectCallback((songThumbnail: string) => {
        setDeletedSongId(songId as string);
        setAddPlaylistState((prev) => {
          let [...prevSongs] = prev.songs;

          prevSongs = prevSongs.filter((song) => song !== songId);

          const updatedThumbnail =
            prevSongs.length === 1
              ? songThumbnail
              : prevSongs.length === 0
              ? DEFAULT_IMAGE
              : prev.thumbnail;
          return {
            ...prev,
            thumbnail: updatedThumbnail,
            songs: prevSongs,
          };
        });
        setPlaylistFormAction(true);
      });
    } else {
      redirectCallback(
        () =>
          onClickPlay &&
          onClickPlay({ songHeader: { id, title: videoTitle, thumbnail } })
      );
    }
    toggleModal(false);
  };

  const onSelectPlaylist = (playlist: Playlists) => {
    if (playlist?.id) {
      setAddPlaylistState((prev) => ({
        ...prev,
        songs: Array.from(new Set([...prev.songs, ...(playlist.songs || [])])),
        id: playlist.id,
        title: playlist.title || '',
        thumbnail:
          playlist.thumbnail === DEFAULT_IMAGE
            ? prev.thumbnail
            : playlist.thumbnail,
      }));
      setPlaylistFormAction(true);
    }
  };

  return (
    <div className="song">
      <IonThumbnail
        style={{
          '--border-radius': '5px',
          '--size': '100%',
        }}
        className="song-thumbnail"
      >
        <img src={thumbnail} alt={videoTitle} />
      </IonThumbnail>
      <div className="song-text">
        <label className="ellipse">{videoTitle}</label>
        <span className="ellipse">{keywords.join(', ')}</span>
      </div>
      {showRightBtn ? (
        <React.Fragment>
          <IonButton
            id="open-modal"
            className="song-icon"
            onClick={(event: React.SyntheticEvent) => {
              event.stopPropagation();
              toggleModal(true);
            }}
            size="small"
            fill="clear"
            color="light"
          >
            <IonIcon size="small" slot="icon-only" icon={ellipsisVertical} />
          </IonButton>
          <ItemModal
            id={id}
            title={videoTitle}
            modalFor="song"
            showModal={showSongModal}
            toggleModal={toggleModal}
            onClickItem={onClickSong}
            validUser={validUser}
            itemObj={{ thumbnail } as Songs}
            playlistAction={playlistAction}
          />
          <PlaylistItemModal
            items={playlists}
            showModal={showPlaylistModal}
            toggleModal={toggleModal}
            onClickPlaylist={onSelectPlaylist}
          />
        </React.Fragment>
      ) : (
        <IonButton
          className="song-icon"
          onClick={(event: React.SyntheticEvent) => {
            event.stopPropagation();
            onClickPlay &&
              onClickPlay({
                songHeader: { id, title: videoTitle, thumbnail },
              });
          }}
          size="small"
          fill="clear"
          color="light"
        >
          <IonIcon
            size="large"
            slot="icon-only"
            icon={isPlaying ? pauseCircle : playCircle}
          />
        </IonButton>
      )}
    </div>
  );
};

export * from './Loading';
