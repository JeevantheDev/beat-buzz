import { IonButton, IonIcon } from '@ionic/react';
import {
  pauseCircle,
  playCircle,
  playSkipBack,
  playSkipForward,
} from 'ionicons/icons';
import React from 'react';

interface IProps {
  audioPlaying?: boolean;
  onClickBack?: () => void;
  onClickPlay?: () => void;
  onClickNext?: () => void;
}

export const PlayerButton: React.FC<IProps> = ({
  audioPlaying,
  onClickBack,
  onClickNext,
  onClickPlay,
}) => {
  return (
    <div className="player-button">
      <IonButton
        onClick={(event: React.SyntheticEvent) => {
          event.stopPropagation();
          onClickBack && onClickBack();
        }}
        size="small"
        fill="clear"
        color="light"
      >
        <IonIcon size="large" slot="icon-only" icon={playSkipBack} />
      </IonButton>
      <IonButton
        onClick={(event: React.SyntheticEvent) => {
          event.stopPropagation();
          onClickPlay && onClickPlay();
        }}
        size="large"
        fill="clear"
        color="light"
        className="play-btn"
      >
        <IonIcon
          size="large"
          slot="icon-only"
          icon={audioPlaying ? pauseCircle : playCircle}
        />
      </IonButton>
      <IonButton
        onClick={(event: React.SyntheticEvent) => {
          event.stopPropagation();
          onClickNext && onClickNext();
        }}
        size="small"
        fill="clear"
        color="light"
      >
        <IonIcon size="large" slot="icon-only" icon={playSkipForward} />
      </IonButton>
    </div>
  );
};
