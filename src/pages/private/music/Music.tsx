import { IonContent, IonPage } from "@ionic/react";
import ExploreContainer from "../../../components/ExploreContainer";
import { Header, HeaderRight, SubHeader } from "../../../components";
import { useFetchSongs } from "../../../stores";
import { useEffect } from "react";

import "./music.css";
import { AllSongs } from "../shared";
import { useHistory } from "react-router";

export const Music: React.FC = () => {
  const songState = useFetchSongs();
  const history = useHistory();

  const { fetchSongsByUser } = songState;

  useEffect(() => {
    fetchSongsByUser();
  }, []);

  return (
    <IonPage id="music-page">
      <Header title="Music" right={<HeaderRight />} />
      <IonContent fullscreen className="ion-padding">
        <div className="all-songs">
          <SubHeader text="My" subText="Songs" />
          <AllSongs
            showAddsong
            onClickAdd={() => history.push("/songForm", { type: "add" })}
            loading={songState.getSongLoading}
            songs={songState.getSongsByUser}
          />
        </div>
      </IonContent>
    </IonPage>
  );
};
