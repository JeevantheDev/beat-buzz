import { IonLabel, IonSkeletonText, IonThumbnail } from "@ionic/react";
import React from "react";

import "../channel.css";

export const ChannelLoading: React.FC = () => {
  return (
    <div className="channel-thumbnail">
      <IonThumbnail style={{ "--size": "100%", "--border-radius": "50%" }}>
        <IonSkeletonText animated />
      </IonThumbnail>
    </div>
  );
};
