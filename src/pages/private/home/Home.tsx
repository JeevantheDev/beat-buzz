import { IonButton, IonContent, IonPage } from "@ionic/react";
import { Header, HeaderRight, SubHeader } from "../../../components";
import {
  useFetchChannels,
  useFetchPlaylists,
  useFetchSongs,
} from "../../../stores";

import { useEffect } from "react";

import { MixedChannels } from "./MIxedChannels";
import { MixedPlaylists } from "./MixedPlaylists";
import { AllSongs } from "../shared";

import "./home.css";
import "swiper/css";
import { useLocation } from "react-router";

export const Home: React.FC = () => {
  const location = useLocation();
  const channelState = useFetchChannels();
  const playlistState = useFetchPlaylists();
  const songState = useFetchSongs();

  const { fetchAllChannels } = channelState;
  const { fetchPlaylistsByUser } = playlistState;
  const { fetchSongs } = songState;

  useEffect(() => {
    fetchAllChannels();
    fetchSongs();
    fetchPlaylistsByUser();
  }, []);

  const moreButton = (
    redirectTo?: string,
    routerDirection: "forward" | "back" | "root" | "none" = "forward"
  ) => (
    <IonButton
      routerLink={redirectTo}
      routerDirection={routerDirection}
      fill="outline"
      mode="ios"
      color="light"
      className="more-btn"
    >
      MORE
    </IonButton>
  );

  return (
    <IonPage id="home-page">
      <Header title="BeatBuzz" right={<HeaderRight />} />
      <IonContent fullscreen className="ion-padding">
        <div className="all-channels">
          <SubHeader
            text="Mixed"
            subText="Channels"
            renderRight={() =>
              channelState?.getChannels?.length > 3
                ? moreButton(location.pathname)
                : null
            }
          />
          <MixedChannels
            loading={channelState?.getChannelLoading}
            channels={channelState?.getChannels}
          />
        </div>
        <div className="all-songs">
          <SubHeader
            text="Mixed"
            subText="Songs"
            renderRight={() =>
              songState.getSongs.length > 5
                ? moreButton(location.pathname)
                : null
            }
          />
          <AllSongs
            loading={songState.getSongLoading}
            songs={songState.getSongs.slice(0, 5)}
          />
        </div>
        <div className="all-playlists">
          <SubHeader
            text="Mixed"
            subText="Playlists"
            renderRight={() =>
              playlistState?.getPlaylists?.length > 3
                ? moreButton("/tab/library", "none")
                : null
            }
          />
          <MixedPlaylists
            loading={playlistState?.getPlaylistLoading}
            playlists={playlistState?.getPlaylists}
          />
        </div>
      </IonContent>
    </IonPage>
  );
};
