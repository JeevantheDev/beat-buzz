import React from 'react';
import { PlayerThumbnail } from './PlayerThumbnail';
import { PlayerButton } from './PlayerButton';
import { PlayerSlider } from './PlayerSlider';

import './player.css';

interface IProps {
  audioPlaying?: boolean;
  audioRef?: React.MutableRefObject<HTMLAudioElement | null>;
  audioSrc: string;
  audioTitle: string;
  audioThumbnail: string;
  sliderInfo?: PlayerSliderInfo;
  updateSliderInfo?: (slider: Object) => void;
  onClickBack?: () => void;
  onClickPlay?: () => void;
  onClickNext?: () => void;
}

export const Player: React.FC<IProps> = ({
  audioRef,
  audioThumbnail,
  audioTitle,
  audioPlaying,
  sliderInfo,
  updateSliderInfo,
  onClickBack,
  onClickNext,
  onClickPlay,
}) => {
  return (
    <div className="player">
      <PlayerThumbnail {...{ audioThumbnail, audioTitle }} />
      <PlayerButton
        {...{ onClickBack, onClickNext, onClickPlay, audioPlaying }}
      />
      <PlayerSlider {...{ sliderInfo, updateSliderInfo, audioRef }} />
    </div>
  );
};
