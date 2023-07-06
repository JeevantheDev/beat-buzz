import React, { useEffect } from "react";
import { Channel, Header, Playlist, SubHeader } from "../../../components";
import { useLocation, useParams } from "react-router";
import { IonButton, IonContent, IonIcon, IonPage } from "@ionic/react";
import { useFetchSongs } from "../../../stores";
import { AllSongs } from "../shared";

import "./songs.css";
import { arrowRedo, duplicate, pencil, playCircle } from "ionicons/icons";

const Songs: React.FC = () => {
  const params = useParams<{ id: string }>();
  const location = useLocation();

  const songState = useFetchSongs();

  const { fetchSongsByID } = songState;

  const { state } = location as { state?: SongsState };

  useEffect(() => {
    fetchSongsByID(Number(params.id), state?.songHeader?.type);
  }, []);

  const showThubmnail = (state?: SongsState) => {
    if (state?.songHeader?.type === "channel") {
      return (
        <Channel
          videoChannel={state?.songHeader?.title || ""}
          videoChannelId={0}
          videoChannelThumbnail={state?.songHeader?.thumbnail || ""}
        />
      );
    } else {
      return (
        <Playlist
          onlyThumbnail
          thumbnail={state?.songHeader?.thumbnail || ""}
          id={0}
        />
      );
    }
  };

  return (
    <IonPage>
      <Header title={state?.songHeader?.title} showBack />
      <IonContent fullscreen className="ion-padding">
        <div className="songs-container">
          <div className="songs-header">
            {showThubmnail(state)}
            <h3 className="songs-header-title">
              {state?.songHeader?.title || ""}
            </h3>
            <div className="songs-header-btns">
              <IonButton className="left-btn" size="small" fill="clear">
                <IonIcon
                  icon={
                    state?.songHeader?.type === "channel" ? duplicate : pencil
                  }
                  color="light"
                  slot="icon-only"
                  size="small"
                />
              </IonButton>
              <IonButton className="play-btn" size="large" fill="clear">
                <IonIcon
                  icon={playCircle}
                  color="light"
                  slot="icon-only"
                  size="large"
                />
              </IonButton>
              <IonButton className="right-btn" size="small" fill="clear">
                <IonIcon
                  icon={arrowRedo}
                  color="light"
                  slot="icon-only"
                  size="small"
                />
              </IonButton>
            </div>
          </div>
          <div className="songs-content">
            <SubHeader
              text={state?.songHeader?.type === "channel" ? "Top" : "Playlist"}
              subText="Songs"
            />
            <AllSongs
              loading={songState.getSongLoading}
              songs={songState.getSongsByID}
            />
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Songs;
