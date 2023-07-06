import React from "react";
import { IonPage, IonContent, IonImg, IonButton } from "@ionic/react";

import splashSVG from "../../../../resources/splash-svg.svg";
import "./splash.css";

const Splash: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <IonImg src={splashSVG} alt="splash-screen" />
        <div className="ion-padding">
          <div className="spalsh-text">
            <h1 className="spalsh-text-header">
              <span>Welcome to, </span>Beat<span>Buzz</span>
            </h1>
            <p className="spalsh-text-subheader">
              Unlock the rhythm, feel the energy, and let the music guide your
              soul. Immerse yourself in the ultimate music experience with
              BeatBuzz.
            </p>
          </div>
        </div>
      </IonContent>
      <div className="ion-padding-horizontal ion-padding-bottom">
        <IonButton
          routerLink="/login"
          color="primary"
          expand="block"
          mode="ios"
        >
          Get Started
        </IonButton>
      </div>
    </IonPage>
  );
};

export default Splash;
