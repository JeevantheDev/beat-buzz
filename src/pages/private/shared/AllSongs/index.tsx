import React from "react";
import { Song, SongLoading } from "../../../../components";
import { ImmutableArray } from "@hookstate/core";

import "./allsongs.css";
import { IonButton, IonIcon } from "@ionic/react";
import { addSharp } from "ionicons/icons";

interface IProps {
  loading?: boolean;
  songs: ImmutableArray<Songs>;
  showAddsong?: true | false;
  onClickAdd?: () => void;
}

export const AllSongs: React.FC<IProps> = ({
  loading,
  songs,
  showAddsong = false,
  onClickAdd,
}) => {
  const handleClickAdd = (event: React.SyntheticEvent) => {
    event.stopPropagation();
    onClickAdd && onClickAdd();
  };

  return (
    <div className="all-songs-container">
      <div className="all-songs-container-item">
        {showAddsong && (
          <div className="add-song" onClick={handleClickAdd}>
            <IonButton
              onClick={handleClickAdd}
              className="add-song-btn"
              size="small"
              color="primary"
            >
              <IonIcon size="large" slot="icon-only" icon={addSharp} />
            </IonButton>
            <div className="add-song-text">
              <label className="ellipse">Add a song</label>
            </div>
          </div>
        )}
      </div>
      {(loading ? Array.from(new Array(3)) : songs).map((song, idx) => (
        <React.Fragment key={idx}>
          <div className="all-songs-container-item">
            {song ? <Song {...song} /> : <SongLoading />}
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};
