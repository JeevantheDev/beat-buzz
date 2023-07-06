import { IonButton, IonIcon } from "@ionic/react";
import { personCircle, search } from "ionicons/icons";
import Account from "../../../../pages/private/account/Account";
import { useState } from "react";

export const HeaderRight: React.FC = () => {
  const [isAccountOpen, setIsAccountOpen] = useState<boolean>(false);
  return (
    <>
      <IonButton routerLink="/search" color="light">
        <IonIcon slot="icon-only" icon={search}></IonIcon>
      </IonButton>
      <IonButton
        id="account-modal"
        onClick={() => setIsAccountOpen(true)}
        color="light"
      >
        <IonIcon slot="icon-only" icon={personCircle}></IonIcon>
      </IonButton>

      <Account
        isOpen={isAccountOpen}
        onDismiss={() => setIsAccountOpen(false)}
      />
    </>
  );
};
