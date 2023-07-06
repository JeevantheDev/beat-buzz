import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Channel, ChannelLoading } from "../../../../components";
import { ImmutableArray } from "@hookstate/core";
import { useHistory } from "react-router";
import { getChannelSongHeader } from "../../../../utils";

interface IProps {
  loading?: boolean;
  channels: ImmutableArray<Channels>;
}

export const MixedChannels: React.FC<IProps> = ({ loading, channels }) => {
  const history = useHistory();

  return (
    <React.Fragment>
      <Swiper spaceBetween={20} slidesPerView={2.8} freeMode loop>
        {(loading ? Array.from(new Array(3)) : channels).map((channel, idx) => (
          <SwiperSlide key={idx}>
            {channel ? (
              <Channel
                {...channel}
                onClickThumbnail={(channelID) =>
                  history.push({
                    pathname: `/songs/${channelID}`,
                    state: getChannelSongHeader(channel),
                  })
                }
              />
            ) : (
              <ChannelLoading />
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </React.Fragment>
  );
};
