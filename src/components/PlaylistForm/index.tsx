import React, { useEffect, useRef, useState } from 'react';
import { IonButton, IonInput, IonLabel, IonModal } from '@ionic/react';
import { Form, FormItem } from '../shared';
import { DEFAULT_IMAGE } from '../../utils';

import './playlist-form.css';

interface IProps {
  isOpen?: boolean;
  toggleModal: Function;
  onClickAdd?: Function;
  state?: PlaylistState;
}

export const PlaylistForm: React.FC<IProps> = ({
  isOpen,
  toggleModal,
  onClickAdd,
  state,
}) => {
  const modal = useRef<HTMLIonModalElement>(null);

  const [playlistTitle, setPlaylistTitle] = useState(state?.title || '');
  const [thumbnail, setThumbnail] = useState(state?.thumbnail || DEFAULT_IMAGE);
  const [songs, setSongs] = useState(state?.songs || []);

  useEffect(() => {
    setPlaylistTitle(state?.title || '');
    setThumbnail(state?.thumbnail || DEFAULT_IMAGE);
    setSongs(state?.songs || []);
  }, [state]);

  const handleClick = (event: React.SyntheticEvent) => {
    event.stopPropagation();
    if (!playlistTitle) return;

    onClickAdd &&
      onClickAdd(
        {
          id: state?.id,
          title: playlistTitle,
          thumbnail,
          songs,
        },
        state?.type
      );
  };

  return (
    <IonModal
      isOpen={isOpen}
      id="playlist-modal"
      ref={modal}
      onIonModalWillDismiss={() => {
        modal.current?.dismiss();
        toggleModal(false);
      }}
    >
      <div className="playlist-form-container ion-padding">
        <IonLabel color="light">
          <h2>{state?.type === 'edit' ? 'Edit' : 'New'} Playlist</h2>
        </IonLabel>
        <Form>
          <FormItem>
            <IonInput
              label="Title"
              fill="outline"
              value={playlistTitle}
              onIonInput={(event) => {
                setPlaylistTitle(event.target.value?.toString() || '');
              }}
              className="input-song"
              labelPlacement="floating"
              color="light"
              mode="md"
            />
          </FormItem>
          <FormItem>
            <IonButton expand="block" onClick={handleClick}>
              {state?.type === 'edit' ? 'Update' : 'Create'}
            </IonButton>
          </FormItem>
        </Form>
      </div>
    </IonModal>
  );
};
