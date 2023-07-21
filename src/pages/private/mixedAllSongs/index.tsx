import { IonPage, IonContent } from '@ionic/react';
import React, { useEffect } from 'react';
import { Header, SubHeader } from '../../../components';
import { useFetchSongs } from '../../../stores';
import { AllSongs } from '../shared';
import { useHistory } from 'react-router';

const MixedAllSongs: React.FC = () => {
  const history = useHistory();
  const songState = useFetchSongs();

  const { fetchSongs } = songState;

  useEffect(() => {
    fetchSongs();
  }, []);

  return (
    <IonPage>
      <Header title="Mixed Songs" showBack />
      <IonContent fullscreen className="ion-padding">
        <div className="mixed-channels">
          <SubHeader text="Mixed" subText="Songs" />
          <AllSongs
            loading={songState.getSongLoading}
            songs={songState.getSongs}
            showRightBtn={false}
            onClickPlay={(...args: SongsState[]) => {
              songState.setSongsByPlayer(Array.from(songState.getSongs));
              history.push('/playSong', {
                ...args[0],
              });
            }}
          />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default MixedAllSongs;
