import {
  IonModal,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonThumbnail,
} from '@ionic/react';
import React, { useRef } from 'react';

import './playlist-item-modal.css';

interface IProps {
  items: Playlists[];
  showModal: boolean;
  toggleModal: (val: boolean, toggleFor: 'song' | 'playlist') => void;
  onClickPlaylist: (item: Playlists) => void;
}

export const PlaylistItemModal: React.FC<IProps> = ({
  items = [],
  showModal,
  toggleModal,
  onClickPlaylist,
}) => {
  const modal = useRef<HTMLIonModalElement>(null);

  return (
    <IonModal
      ref={modal}
      isOpen={showModal}
      style={{ '--background': 'var(--ion-color-primary' }}
      initialBreakpoint={0.3}
      breakpoints={[0, 0.25, 0.5, 1]}
      onIonModalWillDismiss={() => {
        modal.current?.dismiss();
        toggleModal(false, 'playlist');
      }}
    >
      <IonContent color="primary">
        <IonList mode="ios" lines="none" className="playlist-item-list">
          {!items.length && (
            <IonItem color="primary" button lines="none" detail={false}>
              <IonLabel>
                <p>No playlists found...</p>
              </IonLabel>
            </IonItem>
          )}
          {items.map((item: Playlists, idx: number) => (
            <IonItem
              key={idx}
              onClick={(event: React.SyntheticEvent) => {
                event.stopPropagation();
                onClickPlaylist(item);
              }}
              color="primary"
              button
              lines="none"
              detail={false}
            >
              <IonThumbnail>
                <img src={item.thumbnail} alt={item.title} />
              </IonThumbnail>
              <IonLabel style={{ marginLeft: '10px' }}>
                <p>{item.title}</p>
              </IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonModal>
  );
};
