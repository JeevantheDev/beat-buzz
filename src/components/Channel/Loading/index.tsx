import { IonLabel, IonSkeletonText, IonThumbnail } from '@ionic/react';
import React from 'react';

import '../channel.css';

export const ChannelLoading: React.FC = () => {
  return (
    <div
      style={{ height: '150px', minWidth: '150px' }}
      className="channel-thumbnail"
    >
      <IonThumbnail style={{ '--size': '100%', '--border-radius': '50%' }}>
        <IonSkeletonText animated />
      </IonThumbnail>
    </div>
  );
};
