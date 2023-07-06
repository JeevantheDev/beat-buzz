import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonBackButton,
  IonIcon,
} from "@ionic/react";
import { chevronBack, closeOutline, search } from "ionicons/icons";
import React from "react";

interface IProps {
  title?: string | React.ReactNode;
  titleAlign?: "right" | "center" | "left";
  mode?: "ios" | "md";
  right?: React.ReactNode;
  showBack?: boolean;
  type?: "cancel" | "back";
  defaultHref?: "/tab/home" | "/splash";
  onClickCancel?: () => void;
}

export const Header: React.FC<IProps> = ({
  title,
  titleAlign = "left",
  mode = "md",
  right,
  showBack = false,
  defaultHref = "/tab/home",
  type = "back",
  onClickCancel,
}) => {
  return (
    <IonHeader mode={mode}>
      <IonToolbar>
        {showBack && (
          <IonButtons onClick={onClickCancel} slot="start">
            {type === "cancel" ? (
              <IonIcon color="light" slot="icon-only" icon={closeOutline} />
            ) : (
              <IonBackButton
                color="light"
                defaultHref={defaultHref}
                icon={chevronBack}
              ></IonBackButton>
            )}
          </IonButtons>
        )}
        <IonTitle
          style={{ textAlign: titleAlign }}
          color="light"
          class="ellipse"
        >
          {title}
        </IonTitle>
        {right && (
          <IonButtons color="secondary" slot="end">
            {right}
          </IonButtons>
        )}
      </IonToolbar>
    </IonHeader>
  );
};

export * from "./HeaderRight";
