import {
  IonTabs,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
} from "@ionic/react";
import {
  home,
  homeOutline,
  radio,
  radioOutline,
  layers,
  layersOutline,
} from "ionicons/icons";
import React, { useState } from "react";
import { Route, Redirect } from "react-router";
import { Home } from "../home/Home";
import { Library } from "../library/Library";
import { Music } from "../music/Music";

const BottomTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("home");
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route exact path="/home">
          <Home />
        </Route>
        <Route exact path="/library">
          <Library />
        </Route>
        <Route path="/music">
          <Music />
        </Route>
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
      </IonRouterOutlet>
      <IonTabBar
        onIonTabsDidChange={(event) => setActiveTab(event.detail.tab)}
        slot="bottom"
      >
        <IonTabButton
          style={{
            "--color-selected": "var(--ion-color-light)",
            "--color": "var(--ion-color-light-shade)",
          }}
          tab="home"
          href="/home"
        >
          <IonIcon
            aria-hidden="true"
            icon={"home" === activeTab ? home : homeOutline}
          />
          <IonLabel>Home</IonLabel>
        </IonTabButton>
        <IonTabButton
          style={{
            "--color-selected": "var(--ion-color-light)",
            "--color": "var(--ion-color-light-shade)",
          }}
          tab="music"
          href="/music"
        >
          <IonIcon
            aria-hidden="true"
            icon={"music" === activeTab ? radio : radioOutline}
          />
          <IonLabel>Music</IonLabel>
        </IonTabButton>
        <IonTabButton
          style={{
            "--color-selected": "var(--ion-color-light)",
            "--color": "var(--ion-color-light-shade)",
          }}
          tab="library"
          href="/library"
        >
          <IonIcon
            aria-hidden="true"
            icon={"library" === activeTab ? layers : layersOutline}
          />
          <IonLabel>Library</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};
export default BottomTabs;
