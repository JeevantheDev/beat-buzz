import React from "react";
import { play } from "ionicons/icons";
import { IonButton, IonIcon, IonThumbnail } from "@ionic/react";

import "./playlist.css";

interface IProps extends Playlists {
  onlyThumbnail?: false | true;
  onClickPlaylist?: (playlistId: number) => void;
  onPlayPlaylist?: (songId: string | null) => void;
  width?: "auto" | string | number;
  height?: "auto" | string | number;
}
export const Playlist: React.FC<IProps> = ({
  id,
  thumbnail,
  title,
  songs,
  onClickPlaylist,
  onPlayPlaylist,
  onlyThumbnail = false,
  width = "180px",
  height = "180px",
}) => {
  return (
    <div
      className="playlist"
      style={{ width, height }}
      onClick={() => onClickPlaylist && onClickPlaylist(id)}
    >
      <IonThumbnail
        style={{
          "--border-radius": "5px",
          "--size": "100%",
        }}
      >
        <img src={thumbnail} alt={title} />
      </IonThumbnail>
      {!onlyThumbnail && (
        <div className="playlist-text-container">
          <div className="playlist-text">
            <label className="ellipse">{title}</label>
            <span>{songs?.length ? `${songs?.length} + ` : "No "} Songs</span>
          </div>
          <IonButton
            onClick={(event: React.SyntheticEvent) => {
              event.stopPropagation();
              onPlayPlaylist && onPlayPlaylist(songs ? songs[0] : null);
            }}
            className="song-icon"
            size="small"
            fill="clear"
            color="light"
          >
            <IonIcon size="large" slot="icon-only" icon={play} />
          </IonButton>
        </div>
      )}
    </div>
  );
};

export * from "./Loading";
