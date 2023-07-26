import React from 'react';
import { IonSkeletonText, IonThumbnail } from '@ionic/react';

import '../playlist.css';

export const PlaylistLoading: React.FC = () => {
  return (
    <div style={{ minWidth: '150px', height: '150px' }} className="playlist">
      <IonThumbnail
        style={{
          '--border-radius': '5px',
          '--size': '100%',
        }}
      >
        <IonSkeletonText animated />
      </IonThumbnail>
      <div className="playlist-text">
        <IonSkeletonText animated />
        <IonSkeletonText animated />
      </div>
    </div>
  );
};
