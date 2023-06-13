import { IonContent, IonPage } from "@ionic/react";
import ExploreContainer from "../../../components/ExploreContainer";
import "./home.css";
import { Header, HeaderRight } from "../../../components";

export const Home: React.FC = () => {
  return (
    <IonPage>
      <Header title="BeatBuzz" right={<HeaderRight />} />
      <IonContent fullscreen>
        <ExploreContainer name="Home page" />
      </IonContent>
    </IonPage>
  );
};
