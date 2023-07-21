import React, { useEffect, useReducer, useState } from 'react';

// import { YoutubeVideoPlayer } from "@awesome-cordova-plugins/youtube-video-player";

import {
  IonPage,
  IonContent,
  IonIcon,
  IonInput,
  IonButton,
  IonThumbnail,
} from '@ionic/react';
import { Form, FormItem, Header } from '../../../components';
import { useHistory, useLocation } from 'react-router';
import { image, logoYoutube } from 'ionicons/icons';
import { useFetchSongs, useYoutubeServices } from '../../../stores';

import './songForm.css';

export const SongForm: React.FC = () => {
  const history = useHistory();
  const songServiceState = useFetchSongs();
  const youtubeServiceState = useYoutubeServices();

  const { songFormAction } = songServiceState;
  const { fetchSongInfo, setSongInfo } = youtubeServiceState;

  const { getSongInfo } = youtubeServiceState;

  const location = useLocation();

  const { state } = location as {
    state: { type?: 'add' | 'edit'; id?: string; title?: string };
  };

  const [isFormError, setIsFormError] = useState<boolean>(false);
  const [event, updateEvent] = useReducer(
    (prev: SongFormState, next: Partial<SongFormState>) => {
      return { ...prev, ...next };
    },
    {
      id: state?.id || '',
      audio: '',
      keywords: [],
      category: '',
      videoTitle: state?.title || '',
      videoURL: '',
      thumbnail: '',
      videoChannelId: '',
      videoChannel: '',
      videoChannelThumbnail: '',
    }
  );

  useEffect(() => {
    if (event.id) {
      fetchSongInfo(event.id);
    }

    return () => {
      setSongInfo(null);
    };
  }, [event.id]);

  const handleClick = (e: React.SyntheticEvent) => {
    e.stopPropagation();

    if (isFormError) {
      return;
    }

    const payloadObj = {
      id: event.id,
      audio: getSongInfo?.audio?.url || '',
      keywords: Array.from(getSongInfo?.keywords || []),
      category: getSongInfo?.category || '',
      videoTitle: event?.videoTitle || getSongInfo?.videoTitle || '',
      videoURL: getSongInfo?.videoURL || '',
      thumbnail: getSongInfo?.thumbnail?.url || '',
      videoChannelId: getSongInfo?.videoChannelId || '',
      videoChannel: getSongInfo?.videoChannel || '',
      videoChannelThumbnail: getSongInfo?.videoChannelThumbnail?.url || '',
    };

    songFormAction(payloadObj, state?.type, () => {
      history.goBack();
      setSongInfo(null);
    });
  };

  const formError = () => {
    if (
      youtubeServiceState?.getIsLoading ||
      !!youtubeServiceState?.getError ||
      getSongInfo?.category?.toLowerCase() !== 'music'
    ) {
      return true;
    }

    if (songServiceState?.getSongLoading || songServiceState?.getSongError) {
      return true;
    }

    return false;
  };

  useEffect(() => {
    if (formError()) {
      setIsFormError(true);
    } else {
      setIsFormError(false);
    }
  }, [formError()]);

  const playVideo = (videoId: string) => {
    // YoutubeVideoPlayer.openVideo(videoId);
  };

  const renderDefaultIcon = (renderIcon: string) => (
    <IonIcon icon={renderIcon} size="large" color="light" />
  );

  const renderThumbnail = (src: string, alt?: string) => (
    <IonThumbnail>
      <img src={src} alt={alt || 'logo'} />
    </IonThumbnail>
  );

  return (
    <IonPage>
      <Header
        title={state?.type === 'add' ? 'Add Song' : 'Edit Song'}
        showBack
      />
      <IonContent fullscreen className="ion-padding">
        <Form className="song-form">
          <FormItem className="song-form-item song-youtube">
            {!getSongInfo?.videoURL ? (
              renderDefaultIcon(logoYoutube)
            ) : (
              <React.Fragment>
                {renderThumbnail(
                  getSongInfo?.thumbnail?.url,
                  getSongInfo?.videoTitle
                )}
                <IonButton
                  onClick={() => playVideo(event.id)}
                  slot="icon-only"
                  fill="clear"
                >
                  {renderDefaultIcon(logoYoutube)}
                </IonButton>
              </React.Fragment>
            )}
          </FormItem>
          <FormItem className="song-form-thumbnail">
            <FormItem className="song-form-item">
              {!getSongInfo?.thumbnail?.url ? (
                renderDefaultIcon(image)
              ) : (
                <React.Fragment>
                  {renderThumbnail(
                    getSongInfo?.thumbnail?.url,
                    getSongInfo?.videoTitle
                  )}
                  {renderDefaultIcon(image)}
                </React.Fragment>
              )}
            </FormItem>
            <FormItem className="song-form-item">
              {!getSongInfo?.videoChannelThumbnail?.url ? (
                renderDefaultIcon(image)
              ) : (
                <React.Fragment>
                  {renderThumbnail(
                    getSongInfo?.videoChannelThumbnail?.url,
                    getSongInfo?.videoChannel
                  )}
                  {renderDefaultIcon(image)}
                </React.Fragment>
              )}
            </FormItem>
          </FormItem>
          <FormItem>
            <IonInput
              label="Video Id"
              fill="outline"
              value={event.id}
              onIonInput={(event) => {
                updateEvent({ id: event.target.value?.toString() });
                setIsFormError(false);
              }}
              labelPlacement="floating"
              color="light"
              mode="md"
              className="input-song"
              helperText={
                youtubeServiceState?.getError ||
                songServiceState?.getSongError ||
                'https://www.youtube.com/watch?v=<videoId>'
              }
            />
          </FormItem>
          <FormItem>
            <IonInput
              label="Video Category"
              fill="outline"
              value={getSongInfo?.category}
              labelPlacement="floating"
              color="light"
              mode="md"
              className={`input-song ${
                getSongInfo?.category?.toLowerCase() !== 'music'
                  ? 'ion-invalid'
                  : 'ion-valid'
              }`}
              helperText={
                getSongInfo?.category &&
                getSongInfo?.category?.toLowerCase() !== 'music'
                  ? `${getSongInfo?.category} category is not allowed`
                  : ''
              }
              disabled={youtubeServiceState?.getIsLoading}
            />
          </FormItem>
          <FormItem>
            <IonInput
              label="Video Title"
              fill="outline"
              value={event?.videoTitle || getSongInfo?.videoTitle || ''}
              onIonInput={(event) =>
                updateEvent({ videoTitle: event.target.value?.toString() })
              }
              labelPlacement="floating"
              color="light"
              mode="md"
              className="input-song"
              disabled={youtubeServiceState?.getIsLoading}
            />
          </FormItem>
          <FormItem>
            <IonInput
              label="Video Channel"
              fill="outline"
              value={getSongInfo?.videoChannel}
              labelPlacement="floating"
              color="light"
              mode="md"
              className="input-song"
              disabled={youtubeServiceState?.getIsLoading}
            />
          </FormItem>
          <FormItem>
            <IonButton
              disabled={isFormError}
              color="primary"
              expand="block"
              mode="ios"
              onClick={handleClick}
            >
              {state?.type === 'add' ? 'Add Song' : 'Edit Song'}
            </IonButton>
          </FormItem>
        </Form>
      </IonContent>
    </IonPage>
  );
};
