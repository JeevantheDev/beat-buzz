import { IonReactRouter } from "@ionic/react-router";
import React from "react";
import BottomTabs from "./bottomTabs/BottomTabs";
import { Route } from "react-router";
import Search from "./search/Search";

const PrivatePage: React.FC = () => {
  return (
    <IonReactRouter>
      <Route path="/">
        <BottomTabs />
      </Route>
      <Route exact path="/search">
        <Search />
      </Route>
    </IonReactRouter>
  );
};
export default PrivatePage;
