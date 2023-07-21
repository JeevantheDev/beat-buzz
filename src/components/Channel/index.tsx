import { IonLabel, IonThumbnail } from '@ionic/react';
import React from 'react';

import './channel.css';

interface IProps extends Channels {
  onClickThumbnail?: (id?: string) => void;
}

export const Channel: React.FC<IProps> = ({
  onClickThumbnail,
  videoChannel,
  videoChannelId,
  videoChannelThumbnail,
}) => {
  return (
    <div
      className="channel-thumbnail"
      onClick={() => onClickThumbnail && onClickThumbnail(videoChannelId)}
    >
      <IonThumbnail style={{ '--size': '100%', '--border-radius': '50%' }}>
        <img src={videoChannelThumbnail} alt={videoChannel} />
      </IonThumbnail>
      <div className="channel-thumbnail-overlay">
        <label className="ellipse">{videoChannel}</label>
      </div>
    </div>
  );
};

export * from './Loading';
