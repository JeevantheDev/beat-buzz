import React from "react";
import { Redirect, Route } from "react-router";
import Splash from "./Splash/Splash";
import Login from "./Login/Login";
import Signup from "./Signup/Signup";
import { IonReactRouter } from "@ionic/react-router";
import { IonPage, IonRouterOutlet } from "@ionic/react";

const PublicPage: React.FC = () => {
  return (
    <IonPage>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route path="/splash" exact>
            <Splash />
          </Route>
          <Route path="/login" exact>
            <Login />
          </Route>
          <Route path="/signup" exact>
            <Signup />
          </Route>
          <Route path="/" exact>
            <Redirect to="/splash" />
          </Route>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonPage>
  );
};

export default PublicPage;
