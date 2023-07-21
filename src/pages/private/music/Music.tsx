import { IonContent, IonPage } from '@ionic/react';
import { Header, HeaderRight, SubHeader } from '../../../components';
import { useFetchPlaylists, useFetchSongs } from '../../../stores';
import { useEffect } from 'react';

import './music.css';
import { AllSongs } from '../shared';
import { useHistory } from 'react-router';

export const Music: React.FC = () => {
  const songState = useFetchSongs();
  const playlistState = useFetchPlaylists();
  const history = useHistory();

  const { fetchSongsByUser, deleteSongs } = songState;
  const { fetchPlaylistsByUser, playlistFormAction } = playlistState;

  useEffect(() => {
    fetchSongsByUser();
    fetchPlaylistsByUser();
  }, []);

  return (
    <IonPage id="music-page">
      <Header title="Music" right={<HeaderRight />} />
      <IonContent fullscreen className="ion-padding">
        <div className="all-songs">
          <SubHeader text="My" subText="Songs" />
          <AllSongs
            showAddsong
            onClickAdd={() => history.push('/songForm', { type: 'add' })}
            onAddToPlaylist={(
              state: PlaylistFormState,
              type: 'add' | 'edit',
              callback: Function
            ) => playlistFormAction(state, type, callback)}
            onClickDelete={deleteSongs}
            onClickPlay={(...args: SongsState[]) => {
              songState.setSongsByPlayer(
                Array.from(songState.getSongsByUser) as Songs[]
              );
              history.push('/playSong', {
                ...args[0],
              });
            }}
            loading={songState.getSongLoading}
            songs={songState.getSongsByUser}
            playlists={playlistState.getPlaylists}
          />
        </div>
      </IonContent>
    </IonPage>
  );
};
