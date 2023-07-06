import { IonContent, IonIcon, IonItem, IonLabel, IonModal } from "@ionic/react";
import React, { useRef } from "react";
import { Header } from "../../../components";
import {
  logOutOutline,
  personCircle,
  personRemoveOutline,
} from "ionicons/icons";
import { useAuth } from "../../../stores";

import "./account.css";

interface IProps {
  isOpen?: boolean;
  onDismiss: () => void;
}

const Account: React.FC<IProps> = ({ isOpen, onDismiss }) => {
  const authState = useAuth();

  const { logoutAction, removeAction } = authState;

  const modal = useRef<HTMLIonModalElement>(null);

  const dismiss = () => {
    modal.current?.dismiss();
    onDismiss();
  };

  return (
    <IonModal isOpen={isOpen} ref={modal}>
      <Header showBack type="cancel" onClickCancel={dismiss} title="Account" />
      <IonContent fullscreen className="ion-padding">
        <IonItem>
          <IonIcon
            id="person-icon"
            color="light"
            size="large"
            slot="start"
            icon={personCircle}
          />
          <IonLabel>
            <h2>{authState.getCurrUserDetails?.email}</h2>
            <p>{authState.getCurrUserDetails?.username}</p>
          </IonLabel>
        </IonItem>
        <div className="ion-padding-top">
          <IonItem lines="none" button detail={false} onClick={removeAction}>
            <IonIcon
              size="small"
              color="light"
              slot="start"
              icon={personRemoveOutline}
            />
            <IonLabel>
              <p>Delete Account </p>
            </IonLabel>
          </IonItem>
          <IonItem lines="none" button detail={false} onClick={logoutAction}>
            <IonIcon
              size="small"
              color="light"
              slot="start"
              icon={logOutOutline}
            />
            <IonLabel>
              <p>Logout</p>
            </IonLabel>
          </IonItem>
        </div>
      </IonContent>
      <div className="ion-padding-horizontal" style={{ textAlign: "center" }}>
        <p style={{ color: "#d7d8da" }}>Version: 0.0.1</p>
      </div>
    </IonModal>
  );
};

export default Account;
