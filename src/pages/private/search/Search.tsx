import { IonPage, IonContent, IonSearchbar } from '@ionic/react';
import React, { useEffect } from 'react';
import { Header } from '../../../components';
import { useFetchPlaylists, useFetchSongs } from '../../../stores';
import { AllSongs } from '../shared';
import { useHistory } from 'react-router';

import './search.css';

const Search: React.FC = () => {
  const history = useHistory();
  const songState = useFetchSongs();
  const playlistState = useFetchPlaylists();

  const { fetchSongsBySearch, setSongsBySearch } = songState;
  const { fetchPlaylistsByUser, playlistFormAction } = playlistState;

  useEffect(() => {
    fetchPlaylistsByUser();

    return () => {
      setSongsBySearch([]);
    };
  }, []);

  const handleSearch = (value: string) => {
    fetchSongsBySearch(value);
  };

  return (
    <IonPage>
      <Header
        title={
          <IonSearchbar
            color="secondary"
            mode="ios"
            animated
            type="search"
            placeholder="search songs, channels..."
            onIonChange={(event) => handleSearch(event?.target?.value || '')}
          />
        }
        showBack
      />
      <IonContent fullscreen className="ion-padding">
        <div className="all-songs">
          <AllSongs
            showAddsong={false}
            onAddToPlaylist={(
              state: PlaylistFormState,
              type: 'add' | 'edit',
              callback: Function
            ) => playlistFormAction(state, type, callback)}
            onClickPlay={(...args: SongsState[]) => {
              songState.setSongsByPlayer(
                Array.from(songState.getSongsByUser) as Songs[]
              );
              history.push('/playSong', {
                ...args[0],
              });
            }}
            loading={songState.getSongLoading}
            songs={songState.getSongsBySearch}
            playlists={playlistState.getPlaylists}
          />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Search;
