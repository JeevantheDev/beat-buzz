import { IonPage, IonContent } from '@ionic/react';
import React, { useEffect } from 'react';
import { Header, SubHeader } from '../../../components';
import { useFetchChannels } from '../../../stores';
import { MixedChannels } from '../home/MIxedChannels';

const MixedAllChannels: React.FC = () => {
  const channelState = useFetchChannels();

  const { fetchAllChannels } = channelState;

  useEffect(() => {
    fetchAllChannels();
  }, []);

  return (
    <IonPage>
      <Header title="Mixed Channels" showBack />
      <IonContent fullscreen className="ion-padding">
        <div className="all-library">
          <SubHeader text="Mixed" subText="Channels" />
          <div className="all-library-lists">
            <MixedChannels
              xScroll={false}
              loading={channelState?.getChannelLoading}
              channels={channelState?.getChannels}
            />
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default MixedAllChannels;
