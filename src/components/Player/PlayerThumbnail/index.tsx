import { IonLabel, IonThumbnail } from '@ionic/react';
import React from 'react';

interface IProps {
  audioThumbnail?: string;
  audioTitle?: string;
}

export const PlayerThumbnail: React.FC<IProps> = ({
  audioThumbnail,
  audioTitle,
}) => {
  return (
    <div className="player-thumbnail">
      <IonThumbnail style={{ '--size': '100%', '--border-radius': '10%' }}>
        <img src={audioThumbnail} alt={audioTitle} />
      </IonThumbnail>
      <div className="player-title">
        <IonLabel>
          <h2 className="ellipse">{audioTitle}</h2>
        </IonLabel>
      </div>
    </div>
  );
};
