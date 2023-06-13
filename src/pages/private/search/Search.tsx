import { IonPage, IonContent } from "@ionic/react";
import React from "react";
import { Header } from "../../../components";
import ExploreContainer from "../../../components/ExploreContainer";

const Search: React.FC = () => {
  return (
    <IonPage>
      <Header title="Search" showBack />
      <IonContent fullscreen>
        <ExploreContainer name="Search page" />
      </IonContent>
    </IonPage>
  );
};

export default Search;
