import { getAPIUrl } from './getAPIUrl';

export const getDuration = (src: string, cb: Function) => {
  var audio = new Audio();
  document
    .querySelector('audio')
    ?.addEventListener('loadedmetadata', function () {
      cb(audio.duration);
    });
  audio.src = src;
};

export const getAudioSrc = (songId: string) => {
  const AUDIO_BASE_URL = `${getAPIUrl('youtube')}`;
  return `${AUDIO_BASE_URL}/stream/${songId}`;
};

export const playAudio = async (
  audioRef: React.MutableRefObject<HTMLAudioElement | null>,
  isAudioPlaying?: boolean,
  playCallback: Function = () => {}
) => {
  try {
    if (isAudioPlaying) {
      audioRef?.current?.pause();
    } else {
      await audioRef?.current?.play();
    }
    playCallback();
  } catch (error) {
    console.log(error as Error);
  }
};
