import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonBackButton,
} from "@ionic/react";
import React from "react";

interface IProps {
  title?: string | React.ReactNode;
  mode?: "ios" | "md";
  right?: React.ReactNode;
  showBack?: boolean;
}

export const Header: React.FC<IProps> = ({
  title,
  mode = "md",
  right,
  showBack = false,
}) => {
  return (
    <IonHeader>
      <IonToolbar>
        {showBack && (
          <IonButtons slot="start">
            <IonBackButton text="Back"></IonBackButton>
          </IonButtons>
        )}
        <IonTitle color={"light"}>{title}</IonTitle>
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
