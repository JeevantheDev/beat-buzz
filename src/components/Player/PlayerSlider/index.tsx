import { IonLabel, IonRange } from '@ionic/react';
import React from 'react';

interface IProps {
  audioRef?: React.MutableRefObject<HTMLAudioElement | null>;
  sliderInfo?: PlayerSliderInfo;
  updateSliderInfo?: (slider: Object) => void;
}

export const PlayerSlider: React.FC<IProps> = ({
  audioRef,
  sliderInfo,
  updateSliderInfo,
}) => {
  const getTime = (time: number) => {
    return (
      Math.floor(time / 60) + ':' + ('0' + Math.floor(time % 60)).slice(-2)
    );
  };

  const dragHandler = (value: number) => {
    if (audioRef?.current) {
      audioRef.current.currentTime = value;
      updateSliderInfo && updateSliderInfo({ currentTime: value });
    }
  };

  return (
    <div className="player-slider">
      <IonLabel color="light">
        <label>
          {sliderInfo?.currentTime ? getTime(sliderInfo?.currentTime) : '0:00'}
        </label>
      </IonLabel>
      <IonRange
        value={sliderInfo?.currentTime}
        min={0}
        max={sliderInfo?.duration}
        onIonChange={({ detail }) => dragHandler(detail.value as number)}
      />
      <IonLabel color="light">
        <label>
          {sliderInfo?.duration ? getTime(sliderInfo?.duration) : '0:00'}
        </label>
      </IonLabel>
    </div>
  );
};
