import { IonContent, IonPage } from "@ionic/react";
import ExploreContainer from "../../../components/ExploreContainer";
import "./music.css";
import { Header, HeaderRight } from "../../../components";

export const Music: React.FC = () => {
  return (
    <IonPage>
      <Header title="Music" right={<HeaderRight />} />
      <IonContent fullscreen>
        <ExploreContainer name="Music page" />
      </IonContent>
    </IonPage>
  );
};
