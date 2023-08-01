import { useEffect } from 'react';
import { IonApp, setupIonicReact } from '@ionic/react';
import PrivatePage from './pages/private';
import PublicPage from './pages/public';

import {
  useAuth,
  useFetchChannels,
  useFetchPlaylists,
  useFetchSongs,
  useYoutubeServices,
} from './stores';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import './theme/utils.css';
import { Alert } from './components';

setupIonicReact();

const App: React.FC = () => {
  const authState = useAuth();
  const channelState = useFetchChannels();
  const playlistState = useFetchPlaylists();
  const songState = useFetchSongs();
  const youtubeState = useYoutubeServices();

  const { validUserAction } = authState;

  const resetError = () => {
    authState.setErrorMesage(null);
    channelState.setChannelError(null);
    playlistState.setPlaylistError(null);
    songState.setSongError(null);
    youtubeState.setSongInfoError(null);
  };

  useEffect(() => {
    if (authState.getUserToken) {
      validUserAction();
    } else {
      authState.setAuthLoading(false);
    }
  }, []);

  const errorMessage =
    authState.getError ||
    channelState.getChannelError ||
    playlistState.getPlaylistError ||
    songState.getSongError ||
    youtubeState.getError;

  return (
    <IonApp>
      <Alert
        message={(errorMessage || '') as unknown as string}
        dismissHandler={resetError}
      />
      {authState.getAuthLoading ? (
        <p>Authentication is in-progress...</p>
      ) : authState.getIsLoggedIn ? (
        <PrivatePage />
      ) : (
        <PublicPage />
      )}
    </IonApp>
  );
};

export default App;
