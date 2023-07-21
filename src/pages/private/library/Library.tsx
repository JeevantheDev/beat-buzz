import { IonButton, IonContent, IonIcon, IonPage } from '@ionic/react';
import React, { useEffect, useState } from 'react';

import {
  Header,
  HeaderRight,
  Playlist,
  PlaylistForm,
  PlaylistLoading,
  SubHeader,
} from '../../../components';
import { useAuth, useFetchPlaylists } from '../../../stores';
import { useHistory } from 'react-router';
import { getPlaylistSongHeader } from '../../../utils';
import { addSharp } from 'ionicons/icons';

import './library.css';

export const Library: React.FC = () => {
  const authState = useAuth();
  const playlistState = useFetchPlaylists();
  const history = useHistory();

  const [playlistFormState, setPlaylistFormState] = useState<PlaylistState>({
    type: 'add',
    id: null,
    title: '',
    thumbnail: '',
    songs: [],
  });
  const [showModal, setShowModal] = useState(false);

  const toggleModal: Function = (flag: boolean) => {
    setShowModal(flag);
  };

  const { fetchPlaylistsByUser, playlistFormAction, deletePlaylists } =
    playlistState;

  useEffect(() => {
    fetchPlaylistsByUser();
  }, []);

  const onClickUpdate = ({
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
    playlistFormAction(formState, type, toggleModal(false));
  };

  return (
    <IonPage id="library-page">
      <Header title="Library" right={<HeaderRight />} />
      <IonContent fullscreen className="ion-padding">
        <div className="all-library">
          <SubHeader text="My" subText="Library" />
          <div className="all-library-lists">
            <div className="add-song column playlist">
              <IonButton
                onClick={() => toggleModal(true)}
                className="add-song-btn"
                size="small"
                color="primary"
              >
                <IonIcon size="large" slot="icon-only" icon={addSharp} />
              </IonButton>
              <PlaylistForm
                state={playlistFormState}
                isOpen={showModal}
                toggleModal={toggleModal}
                onClickAdd={onSubmitPlaylist}
              />
              <div className="add-playlist-text playlist-text">
                <label className="ellipse">Playlist</label>
              </div>
            </div>
            {(playlistState.getPlaylistLoading
              ? Array.from(new Array(10))
              : playlistState.getPlaylists
            ).map((playlist, idx) => (
              <React.Fragment key={idx}>
                {playlist ? (
                  <Playlist
                    minWidth={0}
                    onClickPlaylist={(playlistId) => {
                      history.push({
                        pathname: `/songs/${playlistId}`,
                        state: getPlaylistSongHeader(playlist),
                      });
                    }}
                    onUpdateItem={onClickUpdate}
                    validUser={authState?.getCurrUserDetails?.user_id}
                    deletePlaylist={deletePlaylists}
                    {...playlist}
                  />
                ) : (
                  <PlaylistLoading />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};
