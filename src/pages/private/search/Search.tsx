import { IonPage, IonContent, IonSearchbar } from "@ionic/react";
import React from "react";
import { Header } from "../../../components";
import ExploreContainer from "../../../components/ExploreContainer";

import "./search.css";

const Search: React.FC = () => {
  return (
    <IonPage>
      <Header
        title={
          <IonSearchbar
            color="secondary"
            mode="ios"
            animated
            type="search"
            placeholder="search songs, channels..."
          />
        }
        showBack
      />
      <IonContent fullscreen>
        <ExploreContainer name="Search page" />
      </IonContent>
    </IonPage>
  );
};

export default Search;
