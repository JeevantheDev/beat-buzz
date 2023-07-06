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
  playCircle,
  playCircleOutline,
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
        <Redirect exact path="/tab" to="/tab/home" />
        <Route exact path="/tab/home">
          <Home />
        </Route>
        <Route exact path="/tab/library">
          <Library />
        </Route>
        <Route exact path="/tab/music">
          <Music />
        </Route>
      </IonRouterOutlet>
      <IonTabBar
        onIonTabsDidChange={(event) => setActiveTab(event.detail.tab)}
        slot="bottom"
      >
        <IonTabButton
          style={{
            "--color-selected": "var(--ion-color-light)",
            "--color": "var(--ion-color-medium)",
          }}
          tab="home"
          href="/tab/home"
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
            "--color": "var(--ion-color-medium)",
          }}
          tab="music"
          href="/tab/music"
        >
          <IonIcon
            aria-hidden="true"
            icon={"music" === activeTab ? playCircle : playCircleOutline}
          />
          <IonLabel>Music</IonLabel>
        </IonTabButton>
        <IonTabButton
          style={{
            "--color-selected": "var(--ion-color-light)",
            "--color": "var(--ion-color-medium)",
          }}
          tab="library"
          href="/tab/library"
        >
          <IonIcon
            aria-hidden="true"
            icon={"library" === activeTab ? radio : radioOutline}
          />
          <IonLabel>Library</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};
export default BottomTabs;
