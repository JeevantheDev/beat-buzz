import React, { useEffect, useState } from 'react';
import {
  Channel,
  Header,
  Playlist,
  PlaylistForm,
  SubHeader,
} from '../../../components';
import { useHistory, useLocation, useParams } from 'react-router';
import { IonButton, IonContent, IonIcon, IonPage } from '@ionic/react';
import { useFetchPlaylists, useFetchSongs } from '../../../stores';
import { AllSongs } from '../shared';
import {
  arrowRedo,
  duplicate,
  pauseCircle,
  pencil,
  playCircle,
} from 'ionicons/icons';

import './songs.css';

const Songs: React.FC = () => {
  const params = useParams<{ id: string }>();
  const location = useLocation();
  const history = useHistory();

  const songState = useFetchSongs();
  const playlistState = useFetchPlaylists();

  const { fetchSongsByID } = songState;
  const { playlistFormAction } = playlistState;

  const { state } = location as { state?: SongsState & PlaylistState };

  const [playlistFormState, setPlaylistFormState] = useState<PlaylistState>({
    type: 'add',
    id: null,
    title: state?.songHeader?.title || '',
    thumbnail: state?.songHeader?.thumbnail || '',
    songs: [],
  });
  const [showModal, setShowModal] = useState(false);

  const toggleModal: Function = (flag: boolean) => {
    setShowModal(flag);
  };

  const onClickPlaylistAction = ({
    type,
    title,
    thumbnail,
    songs,
    id,
  }: PlaylistState) => {
    toggleModal(true);
    setPlaylistFormState(() => ({ type, title, thumbnail, songs, id }));
  };

  const onSubmitPlaylist = (
    formState: PlaylistFormState,
    type: 'add' | 'edit'
  ) => {
    setPlaylistFormState((prev) => ({
      ...prev,
      title: formState.title,
      thumbnail: formState.thumbnail,
    }));
    playlistFormAction(formState, type, () => {
      toggleModal(false);
    });
  };

  useEffect(() => {
    fetchSongsByID(params.id, state?.songHeader?.type);
  }, []);

  const showThumbnail = (state?: SongsState) => {
    if (state?.songHeader?.type === 'channel') {
      return (
        <Channel
          videoChannel={state?.songHeader?.title || ''}
          videoChannelId={''}
          videoChannelThumbnail={state?.songHeader?.thumbnail || ''}
        />
      );
    } else {
      return (
        <Playlist
          onlyThumbnail
          thumbnail={playlistFormState?.thumbnail || ''}
          id={0}
        />
      );
    }
  };

  const getFormSongs = (): string[] => {
    if (state?.songHeader?.type === 'channel') {
      return (songState.getSongsByID as Songs[]).map((song: Songs) => song.id);
    } else {
      return JSON.parse(state?.songs as string) || [];
    }
  };

  const getFormThumbnail = (): string => {
    if (state?.songHeader?.type === 'playlist') {
      return playlistFormState?.thumbnail || '';
    } else {
      return state?.songHeader?.thumbnail || '';
    }
  };
  const getFormTitle = (): string | undefined => {
    if (state?.songHeader?.type === 'playlist') {
      return playlistFormState?.title || '';
    } else {
      return state?.songHeader?.title;
    }
  };

  return (
    <IonPage>
      <Header title={getFormTitle()} showBack />
      <IonContent fullscreen className="ion-padding">
        <div className="songs-container">
          <div className="songs-header">
            {showThumbnail(state)}
            <h3 className="songs-header-title">{getFormTitle()}</h3>
            <div className="songs-header-btns">
              <IonButton
                onClick={() =>
                  onClickPlaylistAction({
                    type:
                      state?.songHeader?.type === 'channel' ? 'add' : 'edit',
                    id: state?.id || null,
                    thumbnail: getFormThumbnail(),
                    songs: getFormSongs(),
                    title: getFormTitle(),
                  })
                }
                className="left-btn"
                size="small"
                fill="clear"
              >
                <IonIcon
                  icon={
                    state?.songHeader?.type === 'channel' ? duplicate : pencil
                  }
                  color="light"
                  slot="icon-only"
                  size="small"
                />
              </IonButton>
              <PlaylistForm
                state={playlistFormState}
                isOpen={showModal}
                toggleModal={toggleModal}
                onClickAdd={onSubmitPlaylist}
              />
              <IonButton
                disabled={!songState.getSongsByID.length}
                className="play-btn"
                size="large"
                fill="clear"
                onClick={(event) => {
                  event.stopPropagation();
                  songState.setSongsByPlayer(
                    Array.from(songState.getSongsByID) as Songs[]
                  );
                  history.push('/playSong', {
                    songHeader: {
                      id: songState.getSongsByID[0].id || '',
                      thumbnail: songState.getSongsByID[0].thumbnail || '',
                      title: songState.getSongsByID[0].videoTitle || '',
                    },
                  });
                }}
              >
                <IonIcon
                  icon={
                    songState?.getCurrentSong?.playing
                      ? pauseCircle
                      : playCircle
                  }
                  color="light"
                  slot="icon-only"
                  size="large"
                />
              </IonButton>
              <IonButton className="right-btn" size="small" fill="clear">
                <IonIcon
                  icon={arrowRedo}
                  color="light"
                  slot="icon-only"
                  size="small"
                />
              </IonButton>
            </div>
          </div>
          <div className="songs-content">
            <SubHeader
              text={state?.songHeader?.type === 'channel' ? 'Top' : 'Playlist'}
              subText="Songs"
            />
            <AllSongs
              showAddsong={state?.songHeader?.type !== 'channel'}
              onClickAdd={() => history.push('/search')}
              loading={songState.getSongLoading}
              songs={songState.getSongsByID}
              userModalAction={false}
              playlistAction="delete"
              showRightBtn={state?.songHeader?.type !== 'channel'}
              onClickPlay={(...args: SongsState[]) => {
                songState.setSongsByPlayer(
                  Array.from(songState.getSongsByID) as Songs[]
                );
                history.push('/playSong', {
                  ...args[0],
                });
              }}
              playlist={{
                id: state?.id || 0,
                title: state?.title,
                songs: state?.songs as string[],
                thumbnail: state?.thumbnail || '',
              }}
              onAddToPlaylist={(
                state: PlaylistFormState,
                type: 'add' | 'edit',
                callback: Function
              ) => playlistFormAction(state, type, callback)}
            />
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Songs;
