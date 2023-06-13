import { IonButton, IonIcon, IonNavLink } from "@ionic/react";
import { personCircle, search } from "ionicons/icons";
import react from "react";
import Search from "../../../../pages/private/search/Search";

export const HeaderRight: React.FC = () => {
  return (
    <>
      <IonButton routerLink="/search" color="light">
        <IonNavLink routerDirection="forward" component={() => <Search />}>
          <IonIcon slot="icon-only" icon={search}></IonIcon>
        </IonNavLink>
      </IonButton>
      <IonButton color="light">
        <IonIcon slot="icon-only" icon={personCircle}></IonIcon>
      </IonButton>
    </>
  );
};
