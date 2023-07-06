import { IonContent, IonPage } from "@ionic/react";
import React, { useEffect } from "react";

import {
  Header,
  HeaderRight,
  Playlist,
  PlaylistLoading,
  SubHeader,
} from "../../../components";
import { useFetchPlaylists } from "../../../stores";
import { useHistory } from "react-router";
import { getPlaylistSongHeader } from "../../../utils";

import "./library.css";

export const Library: React.FC = () => {
  const playlistState = useFetchPlaylists();
  const history = useHistory();

  const { fetchPlaylistsByUser } = playlistState;

  useEffect(() => {
    fetchPlaylistsByUser();
  }, []);

  return (
    <IonPage id="library-page">
      <Header title="Library" right={<HeaderRight />} />
      <IonContent fullscreen className="ion-padding">
        <div className="all-library">
          <SubHeader text="My" subText="Library" />
          <div className="all-library-lists">
            {(playlistState.getPlaylistLoading
              ? Array.from(new Array(10))
              : playlistState.getPlaylists
            ).map((playlist, idx) => (
              <React.Fragment key={idx}>
                {playlist ? (
                  <Playlist
                    width="auto"
                    height="180px"
                    onClickPlaylist={(playlistId) => {
                      history.push({
                        pathname: `/songs/${playlistId}`,
                        state: getPlaylistSongHeader(playlist),
                      });
                    }}
                    {...playlist}
                  />
                ) : (
                  <PlaylistLoading />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};
