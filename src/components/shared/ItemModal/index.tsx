import {
  IonModal,
  IonContent,
  IonList,
  IonItem,
  IonIcon,
  IonLabel,
} from '@ionic/react';
import { playCircle, pencil, trash, duplicate } from 'ionicons/icons';
import React, { useRef } from 'react';
import { useHistory } from 'react-router';

interface IProps {
  id: string | number;
  title: string;
  modalFor: 'song' | 'playlist';
  playlistAction?: 'add' | 'delete';
  showModal: boolean;
  toggleModal: (val: boolean) => void;
  onClickItem?: (
    id: string | number,
    redirectCallback?: Function,
    type?: string
  ) => void;
  validUser?: boolean;
  itemObj?: Playlists | Songs;
  disablePlay?: boolean;
}

export const ItemModal: React.FC<IProps> = ({
  id,
  title,
  modalFor,
  showModal,
  toggleModal,
  onClickItem,
  validUser,
  itemObj,
  playlistAction = 'add',
  disablePlay = false,
}) => {
  const history = useHistory();
  const modal = useRef<HTMLIonModalElement>(null);

  const getItemText = () => (modalFor === 'song' ? 'Song' : 'Playlist');

  const handleClickPlaylistItem = () => {
    onClickItem &&
      onClickItem(
        id,
        (playlistFn: Function) => playlistFn(itemObj?.thumbnail),
        playlistAction === 'add' ? 'add-playlist' : 'remove-playlist'
      );
  };

  const handleClickEditItem = () => {
    onClickItem &&
      onClickItem(
        id,
        (editSongFn?: Function) => {
          if (editSongFn) editSongFn({ type: 'edit', ...itemObj });
          else history.push('/songForm', { type: 'edit', id, title });
        },
        'edit'
      );
  };

  const handleClickDeleteItem = () => {
    onClickItem &&
      onClickItem(id, (deleteSong: Function) => deleteSong(), 'delete');
  };

  return (
    <IonModal
      ref={modal}
      isOpen={showModal}
      style={{ '--background': 'var(--ion-color-primary' }}
      initialBreakpoint={0.3}
      breakpoints={[0, 0.25, 0.5, 1]}
      onIonModalWillDismiss={() => {
        modal.current?.dismiss();
        toggleModal(false);
      }}
    >
      <IonContent color="primary" className="ion-padding">
        <IonList mode="ios" lines="none">
          {modalFor === 'song' ? (
            <React.Fragment>
              <IonItem
                onClick={(event: React.SyntheticEvent) => {
                  event.stopPropagation();
                  onClickItem &&
                    onClickItem(id, (playItem: Function) => {
                      playItem();
                    });
                }}
                color="primary"
                button
                lines="none"
                detail={false}
                disabled={disablePlay}
              >
                <IonIcon color="light" slot="start" icon={playCircle} />
                <IonLabel>
                  <p>Play {getItemText()}</p>
                </IonLabel>
              </IonItem>
              <IonItem
                onClick={(event: React.SyntheticEvent) => {
                  event.stopPropagation();
                  handleClickPlaylistItem();
                }}
                lines="none"
                color="primary"
                button
                detail={false}
              >
                <IonIcon
                  color="light"
                  slot="start"
                  icon={playlistAction === 'add' ? duplicate : trash}
                />
                <IonLabel>
                  <p>
                    {playlistAction === 'add' ? 'Add to' : 'Remove from'}{' '}
                    playlist
                  </p>
                </IonLabel>
              </IonItem>
            </React.Fragment>
          ) : null}
          {validUser ? (
            <React.Fragment>
              <IonItem
                onClick={(event: React.SyntheticEvent) => {
                  event.stopPropagation();
                  handleClickEditItem();
                }}
                lines="none"
                color="primary"
                button
                detail={false}
              >
                <IonIcon color="light" slot="start" icon={pencil} />
                <IonLabel>
                  <p>Edit {getItemText()}</p>
                </IonLabel>
              </IonItem>
              <IonItem
                onClick={(event: React.SyntheticEvent) => {
                  event.stopPropagation();
                  handleClickDeleteItem();
                }}
                lines="none"
                color="primary"
                button
                detail={false}
              >
                <IonIcon color="light" slot="start" icon={trash} />
                <IonLabel>
                  <p>Delete {getItemText()}</p>
                </IonLabel>
              </IonItem>
            </React.Fragment>
          ) : null}
        </IonList>
      </IonContent>
    </IonModal>
  );
};
