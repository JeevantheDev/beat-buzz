import React, { useEffect, useReducer } from "react";

import { YoutubeVideoPlayer } from "@awesome-cordova-plugins/youtube-video-player";

import {
  IonPage,
  IonContent,
  IonIcon,
  IonInput,
  IonButton,
  IonThumbnail,
} from "@ionic/react";
import { Form, FormItem, Header } from "../../../components";
import { useLocation } from "react-router";
import { image, logoYoutube } from "ionicons/icons";
import { useSongServices } from "../../../stores";

import "./songForm.css";

export const SongForm: React.FC = () => {
  const songServiceState = useSongServices();

  const { fetchSongInfo } = songServiceState;

  const { getSongInfo } = songServiceState;

  const location = useLocation();

  const { state } = location as { state: { type?: "add" | "edit" } };

  const [event, updateEvent] = useReducer(
    (prev: SongFormState, next: Partial<SongFormState>) => {
      return { ...prev, ...next };
    },
    {
      id: "yw09YH8W0MM",
      audio: getSongInfo?.audio?.url || "",
      keywords: Array.from(getSongInfo?.keywords || []),
      category: getSongInfo?.category || "",
      videoTitle: getSongInfo?.videoTitle || "",
      videoURL: getSongInfo?.videoURL || "",
      thumbnail: getSongInfo?.thumbnail?.url || "",
      videoChannelId: getSongInfo?.videoChannelId || "",
      videoChannel: getSongInfo?.videoChannel || "",
      videoChannelThumbnail: getSongInfo?.videoChannelThumbnail?.url || "",
    }
  );

  useEffect(() => {
    if (event.id) {
      fetchSongInfo(event.id);
    }
  }, [event.id]);

  const handleClick = (event: React.SyntheticEvent) => {
    event.stopPropagation();
    updateEvent({
      audio: getSongInfo?.audio?.url || "",
      keywords: Array.from(getSongInfo?.keywords || []),
      category: getSongInfo?.category || "",
      videoTitle: getSongInfo?.videoTitle || "",
      videoURL: getSongInfo?.videoURL || "",
      thumbnail: getSongInfo?.thumbnail?.url || "",
      videoChannelId: getSongInfo?.videoChannelId || "",
      videoChannel: getSongInfo?.videoChannel || "",
      videoChannelThumbnail: getSongInfo?.videoChannelThumbnail?.url || "",
    });
  };

  console.log("event::", event);

  const playVideo = (videoId: string) => {
    YoutubeVideoPlayer.openVideo(videoId);
  };

  const renderDefaultIcon = (renderIcon: string) => (
    <IonIcon icon={renderIcon} size="large" color="light" />
  );

  const renderThumbnail = (src: string, alt?: string) => (
    <IonThumbnail>
      <img src={src} alt={alt || "logo"} />
    </IonThumbnail>
  );

  return (
    <IonPage>
      <Header
        title={state?.type === "add" ? "Add Song" : "Edit Song"}
        showBack
      />
      <IonContent fullscreen className="ion-padding">
        <Form className="song-form">
          <FormItem className="song-form-item">
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
              onIonInput={(event) =>
                updateEvent({ id: event.target.value?.toString() })
              }
              labelPlacement="floating"
              color="light"
              mode="md"
              className="input-song"
              helperText="https://www.youtube.com/watch?v=<videoId>"
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
                getSongInfo?.category?.toLowerCase() !== "music"
                  ? "ion-invalid"
                  : "ion-valid"
              }`}
              helperText={
                getSongInfo?.category &&
                getSongInfo?.category?.toLowerCase() !== "music"
                  ? `${getSongInfo?.category} category is not allowed`
                  : ""
              }
              disabled={songServiceState?.getIsLoading}
            />
          </FormItem>
          <FormItem>
            <IonInput
              label="Video Title"
              fill="outline"
              value={getSongInfo?.videoTitle}
              labelPlacement="floating"
              color="light"
              mode="md"
              className="input-song"
              disabled={songServiceState?.getIsLoading}
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
              disabled={songServiceState?.getIsLoading}
            />
          </FormItem>
          <FormItem>
            <IonButton
              disabled={
                songServiceState?.getIsLoading ||
                !!songServiceState?.getError ||
                getSongInfo?.category?.toLowerCase() !== "music"
              }
              color="primary"
              expand="block"
              mode="ios"
              onClick={handleClick}
            >
              {state?.type === "add" ? "Add Song" : "Edit Song"}
            </IonButton>
          </FormItem>
        </Form>
      </IonContent>
    </IonPage>
  );
};
