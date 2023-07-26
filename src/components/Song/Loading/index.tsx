import { IonSkeletonText, IonThumbnail } from '@ionic/react';
import React from 'react';

import '../song.css';

export const SongLoading: React.FC = () => {
  return (
    <div className="song">
      <IonThumbnail
        style={{
          '--border-radius': '5px',
          '--size': '100%',
        }}
        className="song-thumbnail"
      >
        <IonSkeletonText style={{ width: '100%' }} animated />
      </IonThumbnail>
      <div className="song-text">
        <IonSkeletonText animated />
        <IonSkeletonText animated />
      </div>
    </div>
  );
};
