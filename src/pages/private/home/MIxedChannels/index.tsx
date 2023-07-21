import React from 'react';
import { Channel, ChannelLoading, Slider } from '../../../../components';
import { ImmutableArray } from '@hookstate/core';
import { useHistory } from 'react-router';
import { getChannelSongHeader } from '../../../../utils';

interface IProps {
  loading?: boolean;
  channels: ImmutableArray<Channels>;
  xScroll?: boolean;
}

export const MixedChannels: React.FC<IProps> = ({
  loading,
  channels,
  xScroll = true,
}) => {
  const history = useHistory();

  const renderChannels = (): JSX.Element => (
    <React.Fragment>
      {(loading ? Array.from(new Array(3)) : channels).map((channel, idx) => (
        <React.Fragment key={idx}>
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
        </React.Fragment>
      ))}
    </React.Fragment>
  );

  return (
    <React.Fragment>
      {xScroll ? <Slider>{renderChannels()}</Slider> : renderChannels()}
    </React.Fragment>
  );
};
