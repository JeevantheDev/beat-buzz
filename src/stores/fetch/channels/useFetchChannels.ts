import { hookstate, useHookstate } from '@hookstate/core';
import { Fetch, PerformRequest } from '../../../api';

interface ChannelState {
  isChannelLoading: true | false;
  channels: Channels[];
  channel: Channels | null;
  channelError: string | null;
}

const initState: ChannelState = hookstate({
  isChannelLoading: false,
  channels: [],
  channel: null,
  channelError: null,
});

export const useFetchChannels = () => {
  const state = useHookstate(initState);

  const fetchAllChannels = async () => {
    state.isChannelLoading.set(true);
    try {
      const request = Fetch.fetchChannels();
      const resposeCallback = PerformRequest(request);
      const response = await resposeCallback();

      if (!response.data || response?.data?.errors) {
        const error =
          response?.data?.errors[0]?.message || 'Something went wrong!!!';
        state.channelError.set(error);
      } else {
        const { data } = response.data as FetchChannelResponse;

        state.channels.set(data?.allChannels || []);
      }
      state.isChannelLoading.set(false);
    } catch (error) {
      state.isChannelLoading.set(false);
      state.channelError.set(
        error instanceof Error ? error.message : 'Something went wrong!!!'
      );
    }
  };

  const getter = {
    get getChannelLoading() {
      return state.isChannelLoading.get();
    },

    get getChannels() {
      return state.channels.get();
    },

    get getChannel() {
      return state.channel.get();
    },

    get getChannelError() {
      return state.channelError.get();
    },
  };

  const setter = {
    setChannelError(value: string | null) {
      state.channelError.set(value);
    },
  };

  return {
    ...getter,
    ...setter,
    fetchAllChannels,
  };
};
