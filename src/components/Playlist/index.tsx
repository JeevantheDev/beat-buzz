import React, { useState } from 'react';
import { ellipsisVertical, play } from 'ionicons/icons';
import { IonButton, IonIcon, IonThumbnail } from '@ionic/react';
import { DEFAULT_IMAGE } from '../../utils';

import './playlist.css';
import { ItemModal } from '../shared';

interface IProps extends Playlists {
  onlyThumbnail?: false | true;
  onUpdateItem?: Function;
  onClickPlaylist?: (playlistId: number) => void;
  minWidth?: 'auto' | string | number;
  height?: 'auto' | string | number;
  validUser?: boolean;
  deletePlaylist?: Function;
  showRightBtn?: boolean;
}
export const Playlist: React.FC<IProps> = ({
  id,
  thumbnail,
  title,
  songs,
  onClickPlaylist,
  onlyThumbnail = false,
  minWidth = 'auto',
  height = 'auto',
  validUser,
  deletePlaylist,
  onUpdateItem,
  showRightBtn = true,
}) => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = (flag: boolean) => {
    setShowModal(flag);
  };

  const onClickItem = (
    playlistId: string | number,
    redirectCallback?: Function,
    type?: string
  ) => {
    if (playlistId && redirectCallback) {
      type === 'delete'
        ? redirectCallback(() => deletePlaylist && deletePlaylist([playlistId]))
        : redirectCallback(onUpdateItem);
    }
    toggleModal(false);
  };

  return (
    <div
      className="playlist"
      style={{ minWidth, height }}
      onClick={() => onClickPlaylist && onClickPlaylist(id)}
    >
      <IonThumbnail
        style={{
          '--border-radius': '5px',
          '--size': '100%',
          height: '150px',
        }}
      >
        <img src={thumbnail || DEFAULT_IMAGE} alt={title} />
      </IonThumbnail>
      {!onlyThumbnail && (
        <div className="playlist-text-container">
          <div className="playlist-text">
            <label className="ellipse">{title}</label>
            <span>{songs?.length ? `${songs?.length} + ` : 'No '} Songs</span>
          </div>
          {showRightBtn ? (
            <React.Fragment>
              <IonButton
                id="open-modal"
                className="song-icon"
                onClick={(event: React.SyntheticEvent) => {
                  event.stopPropagation();
                  toggleModal(true);
                }}
                size="small"
                fill="clear"
                color="light"
              >
                <IonIcon
                  size="small"
                  slot="icon-only"
                  icon={ellipsisVertical}
                />
              </IonButton>
              <ItemModal
                id={id}
                disablePlay={!songs?.length}
                title={title || ''}
                modalFor="playlist"
                showModal={showModal}
                toggleModal={toggleModal}
                onClickItem={onClickItem}
                validUser={validUser}
                itemObj={{ thumbnail, title, songs, id }}
              />
            </React.Fragment>
          ) : (
            <IonButton
              onClick={(event: React.SyntheticEvent) => {
                event.stopPropagation();
                onClickPlaylist && onClickPlaylist(id);
              }}
              className="song-icon"
              size="small"
              fill="clear"
              color="light"
            >
              <IonIcon size="large" slot="icon-only" icon={play} />
            </IonButton>
          )}
        </div>
      )}
    </div>
  );
};

export * from './Loading';
