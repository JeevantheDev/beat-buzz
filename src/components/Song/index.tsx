import { IonButton, IonIcon, IonThumbnail } from "@ionic/react";
import React from "react";
import { play, playCircle } from "ionicons/icons";

import "./song.css";

interface IProps extends Songs {
  onClickSong?: (songId: string) => void;
}

export const Song: React.FC<IProps> = ({
  id,
  thumbnail,
  videoTitle,
  onClickSong,
}) => {
  return (
    <div className="song">
      <IonThumbnail
        style={{
          "--border-radius": "5px",
          "--size": "100%",
        }}
        className="song-thumbnail"
      >
        <img src={thumbnail} alt={videoTitle} />
      </IonThumbnail>
      <div className="song-text">
        <label className="ellipse">{videoTitle}</label>
        <span>5:34</span>
      </div>
      <IonButton
        onClick={() => onClickSong && onClickSong(id)}
        className="song-icon"
        size="small"
        fill="clear"
        color="light"
      >
        <IonIcon size="large" slot="icon-only" icon={playCircle} />
      </IonButton>
    </div>
  );
};

export * from "./Loading";
