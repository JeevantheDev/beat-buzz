import { IonContent, IonPage } from "@ionic/react";
import ExploreContainer from "../../../components/ExploreContainer";
import "./library.css";
import { Header, HeaderRight } from "../../../components";

export const Library: React.FC = () => {
  return (
    <IonPage>
      <Header title="Library" right={<HeaderRight />} />
      <IonContent fullscreen>
        <ExploreContainer name="Library page" />
      </IonContent>
    </IonPage>
  );
};
